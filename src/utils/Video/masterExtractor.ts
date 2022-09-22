export async function masterExtractor(txt: string) {
//   const stringsRegex = new RegExp("(?<!\\\\)'.+?(?<!\\\\)'");
//   const strings = txt.match(stringsRegex);
//   if (!strings) {
//     console.log("not matched");
//     return;
//   }
//   console.log({strings})
//   let p = strings[3];
//   let k = strings[4].split("|");
  let p =txt.substring(119,1083);
  let k = txt.substring(1091,2257).split("|");

//   const numberRegex = "(?<=,)d+(?=,)";
//   const numbers = txt.match(numberRegex)?.map((item) => {
//     return parseInt(item);
//   });
//   if (!numbers) {
//     console.log("numbers not found");
//     return;
//   }
//   let a = numbers[0];
//   let c = numbers[1] - 1;
  let a =parseInt(txt.substring(1084,1086));
  let c =parseInt(txt.substring(1087,1090));

  while (c >= 0) {
    const replaceRegex = new RegExp(`\b${c.toString(a)}\b`);
    p = p.replace(replaceRegex, k[c]);
    c--;
  }
  console.log({p})
  const sourcesRegex = new RegExp(`(?<=sources':\[\{src:").+?(?=")`,"gm");
  return p.match(sourcesRegex);
}
