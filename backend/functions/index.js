const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const { PythonShell } = require("python-shell");

admin.initializeApp();

exports.analyzeCV = functions
  .region("europe-central2")
  .https.onRequest(async (req, res) => {
    try {
      const { cvText } = req.body || {};
      if (!cvText) return res.status(400).send({ error: "CV text is required" });

      const hfKey = process.env.HF_API_KEY || (functions.config().huggingface && functions.config().huggingface.api_key);
      const hfResp = await axios.post(
        "https://api-inference.huggingface.co/models/distilbert-base-uncased",
        { inputs: cvText },
        { headers: { Authorization: `Bearer ${hfKey}` } }
      );

      const analysis = hfResp.data;

      await admin.firestore().collection("cvs").add({
        cvText,
        analysis,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

      const options = { scriptPath: __dirname, args: ["--url", "https://example.com/jobs"] };
      const scrapedJobs = await new Promise((resolve, reject) => {
        PythonShell.run("scrape_jobs.py", options, (err, results) => {
          if (err) return reject(err);
          resolve(results || []);
        });
      });

      const recommendations = `Aanbevolen jobs: ${scrapedJobs.join(", ")}`;
      res.status(200).send({ recommendations });
    } catch (e) {
      console.error(e);
      res.status(500).send({ error: "Internal error" });
    }
  });
