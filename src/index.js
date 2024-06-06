// A simple API to retrieve data from a JSON file and display it in a template.

const http = require("http");
const fs = require("fs");
const url = require("url");

const replaceTemplate = require("./module/replaceTemplates");
const port = 3000;

const jsonData = fs.readFileSync(`${__dirname}/data/monsters.json`, "utf-8");
const dataObj = JSON.parse(jsonData);

const overview = fs.readFileSync(
  `${__dirname}/template/overview.html`,
  "utf-8"
);
const detail = fs.readFileSync(`${__dirname}/template/detail.html`, "utf-8");
const card = fs.readFileSync(`${__dirname}/template/card.html`, "utf-8");

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === "/" || (pathname === "/overview" && req.method === "GET")) {
    res.writeHead(200, { "Content-Type": "text/html" });
    const cardsHtml = dataObj.map((el) => replaceTemplate(card, el)).join("");
    const output = overview.replace(/{%CARDS%}/g, cardsHtml);
    res.end(output);
  } else if (pathname === "/monster" && req.method === "GET") {
    const monster = dataObj[query.id];
    if (monster) {
      res.writeHead(200, { "Content-type": "text/html" });
      const output = replaceTemplate(detail, monster);
      res.end(output);
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("Not Found");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("Not Found");
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
