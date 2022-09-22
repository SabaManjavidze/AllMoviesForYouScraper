import axios from "axios";
import { Cheerio, Element, load } from "cheerio";
import { base_url, episode_url } from "../../constants";
import { Episode } from "../../types";

export function episodeFromElement(element: Element) {
  const $ = load(element);
  const episodeUrl = $("td.MvTbPly > a.ClA").attr("href") + "";
  const epNum = $("td > span.Num").text().trim();
  const epName = $("td.MvTbTtl > a").text().trim();
  const episode: Episode = {
    id: episodeUrl.split("/").slice(-2).toString().replace(",", ""),
    epName: epName,
    epNumber: epNum,
    url: episodeUrl,
  };
  return episode;
}
