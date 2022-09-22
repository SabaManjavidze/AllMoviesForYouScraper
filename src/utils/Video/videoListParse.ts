import axios from "axios";
import { load, CheerioAPI, Cheerio } from "cheerio";
import { base_url, episode_url } from "../../constants";
import { convertToBase64 } from "../General/Base64";
import { doodUrlParse } from "./doodUrlParse";
import { masterExtractor } from "./masterExtractor";

export async function videoListParse(episodeUrl: string) {
  const { data: vidSerResp } = await axios.get(`${episodeUrl}`);
  let $ = load(vidSerResp);
  const iframe = $("iframe[src*=/?trembed]").attr("src") + "";
  const { data: videoListReq } = await axios.get(iframe);
  $ = load(videoListReq);
  const videoList: any[] = [];
  const videos = $("iframe");
  // console.log($.html());
  videos.each((idx, it) => {
    const url = it.attribs.src;
    if (url.includes("https://dood")) {
      const video = doodUrlParse(url);
      videoList.push(video);
    } else if (url.includes("streamhub")) {
      axios.get(url).then((res) => {
        $ = load(res.data);
        $("script").each((idx, elem) => {
          const txt = $(elem).text();
          if (txt.includes("m3u8")) {
            const masterUrl = masterExtractor(txt);
            // axios.get(masterUrl).then((masterPlaylist) => {
            //   $ = load(masterPlaylist.data);
            //   console.log({ videoUrlTxt: $.text() });
            // });
          }
        });
      });
    }
  });
}
