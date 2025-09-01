import sys
import argparse
import requests
from bs4 import BeautifulSoup

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", required=True)
    args = parser.parse_args()

    html = requests.get(args.url, timeout=15).text
    soup = BeautifulSoup(html, "html.parser")
    jobs = [el.get_text(strip=True) for el in soup.select(".job-listing, .job-title, h2")]
    for j in jobs[:10]:
        print(j)

if __name__ == "__main__":
    main()
