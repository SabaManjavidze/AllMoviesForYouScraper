import axios from "axios";
import { Episode } from "./types";
import { episodeListParse } from "./utils/Episode/episodeListParse";
import { videoListParse } from "./utils/Video/videoListParse";

async function main() {
  const arr = await episodeListParse();
  if (!arr) return;
  console.log({ arr: JSON.stringify(arr, null, 2) });
  arr.forEach((season) => {
    season.forEach(async (episode: Episode) => {
      console.log({ ep: episode.url });
      const vid = await videoListParse(episode.url + "");
      if (!vid) {
        console.log("no vid", episode.epName);
        return;
      }

      console.log({ vid });
    });
  });
  // arr[0].forEach((item: Episode) => {
  //   const promise = videoListParse(item.url + "");
  //   promises.push(promise);
  // });
  // Promise.all(promises)
  //   .then((res) => {
  //     console.log({ res });
  //   })
  //   .catch((error) => {
  //     console.log(`error from promse.all ${error}`);
  //   });
}

main();
