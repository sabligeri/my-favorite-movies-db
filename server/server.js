import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import MovieList from "./model/movieSchema.js";

dotenv.config();

const app = express();
app.use(express.json());

const movieUrl = process.env.MOVIE_DB;

app.post('/api/favmovies', (req, res) => {
  const poster = req.body.poster;
  const title = req.body.title;
  const year = req.body.year;
  const genre = req.body.genre;
  const seen = 'unseen';
  const comment = '';
  const movieList = new MovieList({
    poster,
    title,
    year,
    seen,
    comment,
    genre,
  });
  movieList.save()
      .then(movies => res.json(movies))
      .catch(err => res.status(400).json({ success: false }));
});

app.get('/api/favmovies', (req, res) => {
  MovieList.find()
        .then(movies => res.json(movies))
        .catch(err => res.status(400).json({ success: false, error: err }));
});

app.get('/api/favmovies/year/:order', (req, res) => {
  const order = req.params.order;
  MovieList.find().sort({ year: order })
  .then(movies => res.json(movies))
  .catch(err => res.status(400).json({ success: false, error: err }));
});

app.get('/api/favmovies/title/:order', (req, res) => {
  const order = req.params.order;
  MovieList.find().sort({ title: order })
  .then(movies => res.json(movies))
  .catch(err => res.status(400).json({ success: false, error: err }));
});

app.get('/api/favmovies/seen/:status', (req, res) => {
  const status = req.params.status;

  MovieList.find({ seen: status })
    .then(movies => res.json(movies))
    .catch(err => res.status(400).json({ success: false, error: err }));
});

app.patch('/api/favmovies/:id', (req, res) => {
  const todoId = req.params.id;
  const { seen, comment } = req.body;

  MovieList.findByIdAndUpdate(todoId, { seen, comment }, { new: true })
      .then(updateFavMovies => res.json(updateFavMovies))
      .catch(err => res.status(400).json({ success: false, error: err }));
});

app.delete('/api/favmovies/:id', (req, res) => {
  const id = req.params.id
  MovieList.findByIdAndDelete(id)
    .then(movies => res.json(movies))
    .catch(err => res.status(400).json({ success: false, error: err }))
})

mongoose.connect(movieUrl)
  .then(() =>
    app.listen(3000, () => console.log('Server started on port 3000'))
  )
