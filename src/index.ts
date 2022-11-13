import { episodeListParse } from "./utils/Episode/episodeListParse";
import { searchAnimeRequest } from "./utils/Search/searchAnimeRequest";
import { videoListParse } from "./utils/Video/videoListParse";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.get("/", async (req, res) => {
  res.send("esdfasdfakk");
});
app.get("/search/:query", async (req, res) => {
  const { query } = req.params;
  const movies = await searchAnimeRequest(1, query + "");
  res.send(movies);
});

app.get("/:movieType/:movieId/episodes", async (req, res) => {
  const { movieId, movieType } = req.params;
  if (movieType !== "movies" && movieType !== "series") return;
  const episodes = await episodeListParse(movieType, movieId + "");
  res.send(episodes);
});
app.get("/video/:movieType/episodeId/:episodeId", async (req, res) => {
  const { movieType, episodeId } = req.params;
  if (
    movieType !== "movies" &&
    movieType !== "series" &&
    movieType !== "episode"
  )
    return;

  const episode = await videoListParse(movieType, episodeId);
  res.send(episode);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
});
