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
    console.log("do sumn FAILED:", error.message);
    return;
  }
}

export async function streamhubUrlParse(url: string) {
  try {
    const res = await axios.get(url);
    let $ = load(res.data);
    let promise: any;
    const arr = $("script").toArray();
    for (let i = 0; i < arr.length - 1; i++) {
      const elem = arr[i];
      const txt = $(elem).text();
      if (txt.includes("m3u8")) {
        const masterUrl = masterExtractor(txt);
        if (!masterUrl) {
          console.log("video not found");
          return;
        }
        promise = await doSumn(masterUrl);
        return promise;
      }
    }

    return promise;
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2));
  }
}
