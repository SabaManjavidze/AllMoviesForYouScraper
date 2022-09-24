export function masterExtractor(txt: string) {
  const stringsRegex =/(?<!\\)'.+?(?<!\\)'/g;
let m;
const strings:any = []
while ((m = stringsRegex.exec(`${txt}`)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === stringsRegex.lastIndex) {
        stringsRegex.lastIndex++;
    }
    
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
        strings.push(match)
    });
}
  if (!strings||strings.length<=0) {
    console.log("not matched");
    return;
  }
  let p = strings[3]+"";
  let k = strings[4].split("|");

  const numberRegex = /(?<=,)\d+(?=,)/g;
const numbers:any = []
while ((m = numberRegex.exec(`${txt}`)) !== null) {
    if (m.index === stringsRegex.lastIndex) {
        stringsRegex.lastIndex++;
    }
    
    m.forEach((match, groupIndex) => {
        numbers.push(parseInt(match))
    });
}
  if (!strings||strings.length<=0) {
    console.log("not matched");
    return;
  }
  let a = numbers[0];
  let c = numbers[1] - 1;

  while (c >= 0) {
    const replaceRegex = new RegExp(`\\b${c.toString(a)}\\b`) 
    p = p.replace(replaceRegex, k[c]);
    c--;
  }
  const sourcesRegex = /(?<=sources':\[\{src:").+?(?=")/g;
  return p.match(sourcesRegex)+"";
}
