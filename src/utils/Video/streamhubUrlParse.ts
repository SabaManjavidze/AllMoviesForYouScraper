import axios from "axios";
import { load } from "cheerio";
import { getVidNRes } from "./getVidNRes";
import { masterExtractor } from "./masterExtractor";

async function doSumn(masterUrl: string) {
  try {
    const it = await axios.get(masterUrl);
    const $ = load(it.data);
    const masterTxt = $("body").html() + "";
    const query = "#EXT-X-STREAM-INF:";
    const idx = masterTxt.indexOf(query);
    const masterPlaylist = masterTxt.substring(
      idx + query.length,
      masterTxt.length - 1
    );
    const video = getVidNRes(masterPlaylist, query);
    return video;
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2));
  }
}

export async function streamhubUrlParse(url: string) {
  try {
    const res = await axios.get(url);
    let $ = load(res.data);
    let promise: any;
    $("script").each((_idx, elem) => {
      const txt = $(elem).text();
      if (txt.includes("m3u8")) {
        const masterUrl = masterExtractor(txt);
        if (!masterUrl) {
          console.log("video not found");
          return;
        }
        promise = doSumn(masterUrl);
      }
    });

    return promise;
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2));
  }
}
