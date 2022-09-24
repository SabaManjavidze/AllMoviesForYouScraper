export function getVidNRes(masterPlaylist: string, query: string) {
  const vidList: { quality: string; video: string }[] = [];
  masterPlaylist.split(query).forEach((item) => {
    const qualIdx = item.indexOf("RESOLUTION=");
    const quality = item.substring(qualIdx, item.length - 1);
    const qualityY = quality.substring(
      quality.indexOf("x") + 1,
      quality.indexOf(",")
    );
    const query2 = "\n";
    const videoIdx = item.indexOf(query2) + 1;
    const video = item.substring(videoIdx, item.length - 1);
    const videoO = video.substring(
      0,
      video.indexOf("8" + query2) + 1 || video.length
    );
    const vid = { quality: qualityY, video: videoO };
    vidList.push(vid);
  });
  return vidList;
}
