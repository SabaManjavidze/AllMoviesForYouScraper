import axios from "axios";
import { CheerioAPI, Element, load } from "cheerio";
import { base_url } from "../../constants";
import { Episode } from "../../types";
import { parseEpisodesFromSeries } from "./episodesFromSeries";

export async function episodeListParse() {
  let isTvShow = false;
  let episodeList: Episode[] = [];
  let $: CheerioAPI;
  try {
    const res = await axios.get(
      "https://allmoviesforyou.net/series/inside-job/"
    );
    $ = load(res.data);
    const vidUrl = $("link[rel=canonical]").attr("href");
    if (!vidUrl) throw new Error("season not found");
    isTvShow = vidUrl.includes("/series");
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return;
  }
  if (isTvShow) {
    try {
      const seasonsElements = $("section.SeasonBx.AACrdn a");
      const seasonEpisodes: any = [];
      seasonsElements.each((idx: number, it: Element) => {
        const seasonEpList = parseEpisodesFromSeries(it);
        seasonEpisodes.push(seasonEpList);
      });
      return Promise.all(seasonEpisodes);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      return;
    }
  } else {
    const episode: Episode = {
      epName: $("div.TPMvCn h1.Title").text().trim(),
      epNumber: "",
    };
    episodeList.push(episode);
  }
  console.log({ episodeList });
  return episodeList.reverse();
}
