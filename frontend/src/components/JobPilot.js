import React, { useState } from "react";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./JobPilot.css";

// Vervang door jouw Firebase-config
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};
initializeApp(firebaseConfig);

export default function JobPilot() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cvText, setCvText] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const auth = getAuth();

  async function handleLogin() {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Ingelogd");
  }
  async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    alert("Google login ok");
  }
  async function handleAnalyzeCV() {
    const url = process.env.REACT_APP_BACKEND_URL || "https://YOUR_REGION-YOUR_PROJECT.cloudfunctions.net/analyzeCV";
    const res = await axios.post(url, { cvText });
    setRecommendations(res.data.recommendations || "");
  }

  return (
    <div className="jobpilot-container">
      <h1>JobPilot</h1>
      <div className="auth-section">
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Wachtwoord" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleGoogleLogin}>Login met Google</button>
      </div>
      <div className="cv-section">
        <h2>CV tekst</h2>
        <textarea placeholder="Plak je CV-tekst hier" value={cvText} onChange={e => setCvText(e.target.value)} />
        <button onClick={handleAnalyzeCV}>Analyseer CV</button>
      </div>
      {recommendations && (
        <div className="recommendations">
          <h2>Aanbevelingen</h2>
          <p>{recommendations}</p>
        </div>
      )}
    </div>
  );
}
