import axios from "axios";
import { CheerioAPI, Element, load } from "cheerio";
import { base_url } from "../../constants";
import { Episode, MovieType } from "../../types";
import { parseEpisodesFromSeries } from "./episodesFromSeries";

export async function episodeListParse(movieType: MovieType, slug: string) {
  let episodeList: Episode[] = [];

  const res = await axios.get(
    `https://allmoviesforyou.net/${movieType}/${slug}/`
  );
  const $ = load(res.data);
  const vidUrl = $("link[rel=canonical]").attr("href");
  if (!vidUrl) throw new Error("season not found");
  const isTvShow = movieType == "series";
  if (isTvShow) {
    const seasonsElements = $("section.SeasonBx.AACrdn a");
    let seasonEpisodes: any = [];
    const arr = seasonsElements.toArray();
    for (let i = 1; i < arr.length; i++) {
      const it = arr[i];
      const seasonEpList = await parseEpisodesFromSeries(it);
      seasonEpisodes.push(seasonEpList);
    }
    return seasonEpisodes;
  } else {
    const episode: Episode = {
      epName: $("div.TPMvCn h1.Title").text().trim(),
      epNumber: "1",
      url: vidUrl,
    };
    episodeList.push(episode);
  }
  return episodeList.reverse();
}
