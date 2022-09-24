import axios from "axios";
import { Episode } from "./types";
import { episodeListParse } from "./utils/Episode/episodeListParse";
import { videoListParse } from "./utils/Video/videoListParse";

async function main() {
  const arr = await episodeListParse();
  if (!arr) return;
  const episode = arr[0][0];
  const vid = await videoListParse(episode.url + "");
  if (!vid) return;
  console.log({ vid });
}

main();
