/**
 **     PSEUDOCODE
 *  1     Initialize table with single character strings
 *  2     P = first input character
 *  3     WHILE not end of input stream
 *  4          C = next input character
 *  5          IF P + C is in the string table
 *  6            P = P + C
 *  7          ELSE
 *  8            output the code for P
 *  9          add P + C to the string table
 *  10           P = C
 *  11         END WHILE
 *  12    output code for P
 * @param {*} str
 */

function compress(str) {
  let output = []; // output
  let phrase = str[0]; // 前一个key
  let curchar = "";
  let dict = {};
  let code = 256;
  for (var i = 1; i < str.length; i++) {
    curchar = str[i];
    // 判断前一个key和当前字符结合, 如果存在表中, 表示可压缩
    if (dict[`${phrase}${curchar}`]) {
      // 可压缩
      phrase = `${phrase}${curchar}`;
    } else {
      // 不可压缩,
      //   console.log(phrase);
      // 输出前一个串的code
      output.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0)); // 输出一个编码的的标记
      code++;
      // 记录新串到表中
      dict[`${phrase}${curchar}`] = code;
      //   console.log("add:", `${phrase}${curchar}:`, code);
      // 当前字符给前一个串
      phrase = curchar;
    }
    // 最后一个key, 编码key=>val换掉.
    if (i === str.length - 1) {
      //   console.log("phrase:",phrase);
      output.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    }
  }
  return output.map((p) => String.fromCharCode(p)).join("");
}

/**
 * *    PSEUDOCODE
 * 1    Initialize table with single character strings
 * 2    OLD = first input code
 * 3    output translation of OLD
 * 4    WHILE not end of input stream
 * 5        NEW = next input code
 * 6        IF NEW is not in the string table
 * 7               S = translation of OLD
 * 8               S = S + C
 * 9       ELSE
 * 10              S = translation of NEW
 * 11       output S
 * 12       C = first character of S
 * 13       OLD + C to the string table
 * 14       OLD = NEW
 * 15   END WHILE
 * @param {*} dsr
 */
function uncompress(dsr) {
  //
  let dict = {};
  let code = 256;
  let s = "";
  let currchar = dsr[0];
  let output = [currchar]; // output
  let oldPhrase = currchar;
  for (var i = 1; i < dsr.length; i++) {
    newCode = dsr[i].charCodeAt(0);
    // console.log("newCode:", newCode);
    // code not in table
    if (newCode < 256) {
      // 这是非结合字符
      s = dsr[i];
    } else {
      s = dict[newCode] ? dict[newCode] : oldPhrase + currchar;
    }
    // console.log("s:", charCode, s);
    output.push(s);
    currchar = s[0];
    // 不存在字典中
    code++;
    dict[code] = oldPhrase + currchar;
    oldPhrase = s;
  }

  return output.join("");
}

function genRandom() {
  var s = "";
  for (var i = 0; i < 500; i++) {
    s += String.fromCharCode(parseInt(Math.random() * 75) + 48);
  }
  return s;
}
let count = 0;

function testfn(index) {
  var str = genRandom();
  var enst = compress(str);
  var dest = uncompress(enst);
  if (str !== dest) {
    count++;
    console.log(count, "test failed." + index, str);
  }
}

[...Array(100)].forEach((temp, index) => {
  testfn(index);
});

var ss = "aabcaacaabcabcabccbacbaacbccbaac";
// var ss =
//   ";bH42YIF5SGiFMtzcmWnyb4:s1Koz9vlwiAOzh<iv61f1xw6MEtWLIBHSgflq5QFFFzOQ<W2z[7JIILycTD>8O[cnt[v8F5b3=dckfmL;p;kts]H@coY9FRh9G1E^NKq?lbQVvOK1rmBVa5YywsrgCi>gZWo@RyHFa7fFKk9QUkFxlChyFg:t];D<TXE9qI0>Atyt?rRF<fufNj2R5FjZ0a?O]h7Fx4J[g\tHlc1Sif<:HipvaYkcMPFs?uVlG[>dsq>ehN]1lw<@_WR6hpcU`NjWbk`_mExTQQ=x\32UOifCgSmw<N`QR\vqy7GS2cLEVnECHk>FsugddJjjNn9EuDK35LTPe@6@rqjzu<2E2B;`8R7VgrZR3hDTMBINQ>]FuMRM<K301`LE09wH`UQB>0p]9OszM`v:dg[26RGWGujQpB?O6C2LfSUmgw:ExAB<bgHnb9W`]H1r0yhAxfC6s`>J33vugB3M^aXxN8\3C9:CC0v";
var enst = compress(ss);
// console.log(enst, enst.length);
var dest = uncompress(enst);
// console.log(dest, dest.length);

console.log(ss === dest);
