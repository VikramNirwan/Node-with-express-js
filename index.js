// 1.  Fundamentals of epress js and crud ops in express

// // import express package

const express = require("express");

const morgan = require("morgan");

const moviesRouter = require("./routes/moviesroutes");

let app = express();

// 2. Middleware basics

const logger = function (req, res, next) {
  console.log("Custom middleware called");
  next();
};

app.use(express.json()); // middleware
app.use(morgan("dev"));
app.use(express.static("./public"));
app.use(logger);
app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

// Route = HTTP method + URL

// app.get("/", (req, res) => {
//   //   res.status(200).send("<h2>Hello from the express server</h2>");
//   res.status(200).json({ message: "Hello,world", status: 200 });
// });

// method 1--

// // lecture -- Handling API GET request
// // GET / api/movies
// app.get("/api/v1/movies", getAllMovies);

// // Lecture -- Handling Route parameters
// app.get("/api/v1/movies/:id", getMovie);

// // lecture -- handling post request
// // POST- api/v1/movies
// app.post("/api/v1/movies", createMovie);

// // Lecture -- Patch request
// app.patch("/api/v1/movies/:id",updateMovie );

// // lecture -- delete request
// app.delete("/api/v1/movies/:id",deleteMovie );

// Method 2 ===
// Chaining handlers

// app.route("/api/v1/movies").get(getAllMovies).post(createMovie);

// app
//   .route("/api/v1/movies/:id")
//   .get(getMovie)
//   .patch(updateMovie)
//   .delete(deleteMovie);

// Using Routes

app.use("/api/v1/movies", moviesRouter);

module.exports = app;
