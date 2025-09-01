from flask import Flask, jsonify
import requests

app = Flask(__name__)

@app.route("/jobs")
def jobs():
    boards = ["stripe", "github", "meta"]
    results = []
    for board in boards:
        url = f"https://boards-api.greenhouse.io/v1/boards/{board}/jobs"
        r = requests.get(url)
        if r.ok:
            for job in r.json().get("jobs", []):
                results.append({
                    "id": job["id"],
                    "title": job["title"],
                    "location": job["location"]["name"] if job.get("location") else "",
                    "url": job["absolute_url"],
                    "company": board
                })
    results.sort(key=lambda x: x["title"].lower())
    return jsonify(results)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
