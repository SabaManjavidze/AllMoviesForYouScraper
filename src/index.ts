import express from "express";
import cors from "cors";
import axios from "axios";
import { AdjaraMovie, Movie } from "./types";
import { IMOVIE_BASE_URL } from "./constants";

const app = express();

app.use(cors());
app.get("/", async (req, res) => {
  res.send("esdfasdfakk");
});
app.get("/search/:query", async (req, res) => {
  const { query } = req.params;
  try {
    const movie_filters =
      "https://api.imovies.cc/api/v1/search-advanced?movie_filters%5B%23%2Fbrowse%2Fmovies%5D=&movie_filters%5Bwith_actors%5D=3&movie_filters%5Bwith_directors%5D=1&filters%5Btype%5D=movie&keywords=inside%20job&page=1&per_page=20";
    const { data: movies } = await axios.get(
      `${IMOVIE_BASE_URL}/search-advanced?${movie_filters}&keywords=${query}&page=1&per_page=20`
    );
    const parsedMovies = movies.data.map((item: AdjaraMovie) => {
      return {
        movieType: item.isTvShow ? "series" : "movies",
        slug: item?.id?.toString() ?? item?.adjaraId?.toString(),
        thumbnail_url: item.posters.data[400] ?? item.posters.data[240],
        title: item.secondaryName,
      } as Movie;
    });
    res.send(parsedMovies);
  } catch (error) {
    res.send({ message: "Something went wrong!" });
  }
});

app.get("/details/:movieId", async (req, res) => {
  const { movieId } = req.params;

  try {
    const { data: details } = await axios.get(
      `${IMOVIE_BASE_URL}/movies/${movieId}`
    );
    res.send(details);
  } catch (error) {
    res.send({ message: "Something went wrong" });
  }
});
app.get("/episodes/:movieId/:seasonNum", async (req, res) => {
  const { movieId, seasonNum } = req.params;

  try {
    const { data: details } = await axios.get(
      `${IMOVIE_BASE_URL}/movies/${movieId}/season-files/${seasonNum}`
    );
    res.send(details);
  } catch (error) {
    res.send({ message: "Something went wrong" });
  }
});
app.get("/video/:movieId/:episodeId", async (req, res) => {
  const { episodeId, movieId } = req.params;
  try {
    let locat = "";
    await axios.get(`${IMOVIE_BASE_URL}/movies/${movieId}/files/${episodeId}`, {
      beforeRedirect(options, responseDetails) {
        locat = responseDetails.headers.location;
        res.send(locat);
        return;
      },
    });
    res.send("hello");
  } catch (error) {
    res.send({ message: "Something went wrong", error });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
});
