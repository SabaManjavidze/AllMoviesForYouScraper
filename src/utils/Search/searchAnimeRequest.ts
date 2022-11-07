import axios from "axios";
import { load } from "cheerio";
import { Element } from "cheerio";
import { Movie } from "src/types";
import { base_url } from "../../constants";
import { videoListParse } from "../Video/videoListParse";
const searchSelector = "ul.MovieList li";

export async function searchAnimeRequest(page: number, query: string) {
  if (query) {
    const req = await axios.get(`${base_url}/page/${page}?s=${query}`);
    const $ = load(req.data);
    const arr = $(".AX > li").toArray();
    const movieArr = [];
    for (let i = 0; i < arr.length; i++) {
      const el = arr[i];
      const anime = searchAnimeFromElement(el);
      movieArr.push(anime);
    }
    return movieArr;
  } else {
    const url = `${base_url}/category/page/${page}`;
    const req = await axios.get(url);
    return req;
  }
}

function searchAnimeFromElement(element: Element) {
  const $ = load(element);
  const anime: Movie = {
    url: $("article > a").attr("href"),
    title: $("h2.Title").text().trim(),
    thumbnail_url: "https:" + $("div.Image > figure > img").attr("data-src"),
  };
  return anime;
}
