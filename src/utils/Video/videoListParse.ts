import axios from "axios";
import { load } from "cheerio";
import { base_url } from "../../constants";
import { MovieType } from "../../types";
import { doodUrlParse } from "./doodUrlParse";
import { streamhubUrlParse } from "./streamhubUrlParse";

export async function videoListParse(movieType: MovieType, episodeId: string) {
  try {
    const url = `${base_url}/${movieType}/${episodeId}`;
    const { data: vidSerResp } = await axios.get(url);
    if (!vidSerResp) return null;
    let $ = load(vidSerResp);
    const iframe = $("iframe[src*=/?trembed]").attr("src") + "";
    const { data: videoListReq } = await axios.get(iframe);
    $ = load(videoListReq);
    var videoList: any;
    const videos = $("iframe");
    const arr = videos.toArray();
    for (let i = 0; i < arr.length; i++) {
      const it = arr[i];
      const url = it.attribs.src;
      if (url.includes("https://dood")) {
        const video = await doodUrlParse(url);
        return video;
      } else if (url.includes("streamhub")) {
        const video = await streamhubUrlParse(url);
        videoList = video;
        return video;
      }
    }
    return videoList;
  } catch (error) {
    return null;
  }
}
