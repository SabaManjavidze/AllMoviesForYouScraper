import axios, { AxiosError } from "axios";
import { load, CheerioAPI, Cheerio } from "cheerio";
import { base_url, episode_url } from "../../constants";
import { convertToBase64 } from "../General/Base64";
import { doodUrlParse } from "./doodUrlParse";
import { getVidNRes } from "./getVidNRes";
import { masterExtractor } from "./masterExtractor";
import { streamhubUrlParse } from "./streamhubUrlParse";

export async function videoListParse(episodeUrl: string) {
  const { data: vidSerResp } = await axios.get(`${episodeUrl}`);
  let $ = load(vidSerResp);
  const iframe = $("iframe[src*=/?trembed]").attr("src") + "";
  const { data: videoListReq } = await axios.get(iframe);
  $ = load(videoListReq);
  var videoList: any = [];
  const videos = $("iframe");
  videos.each((_idx, it) => {
    const url = it.attribs.src;
    if (url.includes("https://dood")) {
      const video = doodUrlParse(url);
      videoList.push(video);
    } else if (url.includes("streamhub")) {
      const video = streamhubUrlParse(url);
      videoList = video;
    }
  });
  return videoList;
}
