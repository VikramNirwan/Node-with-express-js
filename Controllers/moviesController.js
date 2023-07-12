const fs = require("fs");

let movies = JSON.parse(fs.readFileSync("./data/movies.json"));

exports.checkId = (req, res, next, value) => {
  console.log("Movie ID is " + value);

  let movie = movies.find((el) => el.id === value * 1);

  if (!movie) {
    res.status(404).json({
      status: "fail",
      message: "Movie with ID " + value + " is not found",
    });
  }

  next();
};

exports.validateBody = (req, res, next) => {
  if (!req.body.name || !req.body.releaseYear) {
    res.status(400).json({
      status: "Fail",
      message: "Not a valid movie data",
    });
  }
  next();
};

// Route handler functions

exports.getAllMovies = (req, res) => {
  // read the data for that require the fs module and also requird json file containing movies data and wrap that in json jsend formatting to as learned before
  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    count: movies.length,
    data: {
      movies: movies,
    },
  });
};

exports.getMovie = (req, res) => {
  // console.log(req.params);

  //Convert Id to Number type

  const id = req.params.id * 1;

  // Find MOVIES BASED ON ID PARAMETER

  let movie = movies.find((el) => el.id === id);

  // if (!movie) {
  //   res.status(404).json({
  //     status: "fail",
  //     message: "Movie with ID " + id + " is not defined",
  //   });
  // }
  // SEND MOVIE IN THE RESPONSE
  res.status(200).json({
    status: "success",
    data: {
      movie: movie,
    },
  });
};

exports.createMovie = (req, res) => {
  // console.log(req.body);
  const newId = movies[movies.length - 1].id + 1;

  // Object.assign methon is used to merge two object
  const newMovie = Object.assign({ id: newId }, req.body);
  // const newMovie = { newId, ...req.body };

  movies.push(newMovie);

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        movie: newMovie,
      },
    });
  });
};

exports.updateMovie = (req, res) => {
  let id = req.params.id * 1;
  let movieToUpdate = movies.find((el) => el.id === id);

  // if (!movieToUpdate) {
  //   res.status(404).json({
  //     status: "fail",
  //     message: "No Movie object with ID " + id + " is found",
  //   });
  // }

  const index = movies.indexOf(movieToUpdate); // eg -- id = 4, index = 3

  Object.assign(movieToUpdate, req.body);

  movies[index] = movieToUpdate;

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(200).json({
      status: "success",
      data: {
        movie: movieToUpdate,
      },
    });
  });
};

exports.deleteMovie = (req, res) => {
  let id = req.params.id * 1;
  let movieToDelete = movies.find((el) => el.id === id);

  // if (!movieToDelete) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: "No Movie object with ID " + id + " is found to delete",
  //   });
  // }

  const index = movies.indexOf(movieToDelete);

  movies.splice(index, 1);

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(204).json({
      status: "success",
      data: {
        movie: null,
      },
    });
  });
};
