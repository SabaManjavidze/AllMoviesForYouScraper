import axios from "axios";
import { Element, load } from "cheerio";
import { base_url } from "../../constants";
import { Episode } from "../../types";

export async function doodUrlParse(url: string) {
  const { data: response } = await axios.get(url.replace("/d/", "/e/"));
  const $ = load(response);
  const content = $.text();
  if (!content.includes("'/pass_md5/")) return null;
  const md5 = content.substring(content.indexOf("'/pass_md5/"), 25);
  console.log(content);
  return "";
  // const token = md5.substringAfterLast("/")
  // const doodTld = url.substringAfter("https://dood.").substringBefore("/")
  // const randomString = getRandomString()
  // const expiry = System.currentTimeMillis()
  // const videoUrlStart = client.newCall(
  //     GET(
  //         "https://dood.$doodTld/pass_md5/$md5",
  //         Headers.headersOf("referer", url)
  //     )
  // ).execute().body!!.string()
  // return "$videoUrlStart$randomString?token=$token&expiry=$expiry"
}
