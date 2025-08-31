import scrapy

class JobSpider(scrapy.Spider):
    name = "jobs"
    start_urls = ["https://wearejobpilot.com/sample-jobs"]

    def parse(self, response):
        for job in response.css("div.job"):
            yield {
                "title": job.css("h2::text").get(),
                "company": job.css(".company::text").get(),
                "location": job.css(".location::text").get(),
                "applyUrl": job.css("a::attr(href)").get(),
            }
