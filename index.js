const express = require("express");
const mongoose = require("mongoose");

const app = express();

const Article = require("./models/Article");

mongoose
  .connect(
    "mongodb+srv://<Username>:<Password>@clustername.id.mongodb.net/?appName=<name>",
  )
  .then(() => {
    console.log("connected succesfuly");
  })
  .catch((error) => {
    console.log("Error happend while connecting to the database :(", error);
  });

app.use(express.json());

app.get("/hello", (request, response) => {
  response.send("Hello");
});

app.get("/test", (request, response) => {
  response.send("This page is only for test purpose :) ffff");
});

app.post("/addComment", (request, response) => {
  response.send("Post request on add comment :)");
});

app.delete("/testingDelete", (request, response) => {
  response.send("Visiting Delete Request :)");
});

app.get("/findSummation/:number1/:number2", (req, res) => {
  const num1 = req.params.number1;
  const num2 = req.params.number2;
  const total = Number(num1) + Number(num2);
  res.send(`The Total Is: ${total}`);
});

app.get("/findSummation2", (req, res) => {
  const num1 = req.body.number1;
  const num2 = req.body.number2;
  const total = Number(num1) + Number(num2);
  res.send(`The Total Is: ${total}`);
});

app.get("/findSummation/query", (req, res) => {
  const num1 = req.query.number1;
  const num2 = req.query.number2;
  const total = Number(num1) + Number(num2);
  res.json({
    total: `The Total Is: ${total}`,
    desc: "this is json responsed file",
  });
  res.send(`The Total Is: ${total}`);
});

app.get("/numbers", (req, res) => {
  let numbers = "";
  for (let i = 0; i <= 100; i++) {
    numbers += i + " - ";
  }
  res.send(`<p1>${numbers}</p>`);
});

app.get("/numbers/fromfile", (req, res) => {
  let numbers = "";
  for (let i = 0; i <= 100; i++) {
    numbers += i + " - ";
  }
  // res.sendFile(__dirname + "/views/numbers.html");
  res.render("numbers.ejs", {
    numbers: numbers,
    name: "Ibrahim",
  });
});

// ================ ARTICLES ENDPOINTS ================
app.post("/articles", async (req, res) => {
  const newArticle = new Article();
  const articleTitle = req.body.articleTitle;
  const articleBody = req.body.articleBody;

  newArticle.title = articleTitle;
  newArticle.body = articleBody;
  newArticle.numberOfLikes = 3;
  await newArticle.save();
  res.send("The new article has been stored");
});

app.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

app.get("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  const article = await Article.findById(id);
  res.json(article);
});

app.delete("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  const article = await Article.findByIdAndDelete(id);
  res.json(article);
});

app.get("/showArticles", async (req, res) => {
  const articles = await Article.find();
  res.render("articles.ejs", {
    allArticles: articles,
  });
});

app.listen(3000, () => {
  console.log("I am listingin in port 3000");
});
