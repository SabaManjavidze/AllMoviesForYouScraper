import axios from "axios";
import { Element, load } from "cheerio";
import { base_url } from "../../constants";
import { Episode } from "../../types";
import { episodeFromElement } from "./episodeFromElement";

export async function parseEpisodesFromSeries(seasonElem: Element) {
  const episodesUrl = seasonElem.attribs.href;
  const episodesHtml = await axios.get(episodesUrl);
  const $ = load(episodesHtml.data);
  const episodeElements = $("tr.Viewed");
  const episodeArr: Episode[] = [];
  episodeElements.each((idx, it) => {
    const episode = episodeFromElement(it);
    episodeArr.push(episode);
  });
  return episodeArr;
}
