// https://gist.github.com/revolunet/843889
// LZW-compress a string
function lzw_encode(s) {
  var dict = {};
  var data = (s + "").split("");
  var out = [];
  var currChar;
  var phrase = data[0];
  var code = 256;
  for (var i = 1; i < data.length; i++) {
    currChar = data[i];
    if (dict[phrase + currChar] != null) {
      phrase += currChar;
    } else {
      out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
      dict[phrase + currChar] = code;
      code++;
      phrase = currChar;
    }
  }
  out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
  for (var i = 0; i < out.length; i++) {
    out[i] = String.fromCharCode(out[i]);
  }
  return out.join("");
}

// Decompress an LZW-encoded string
function lzw_decode(s) {
  var dict = {};
  var data = (s + "").split("");
  var currChar = data[0];
  var oldPhrase = currChar;
  var out = [currChar];
  var code = 256;
  var phrase;
  for (var i = 1; i < data.length; i++) {
    var currCode = data[i].charCodeAt(0);
    if (currCode < 256) {
      phrase = data[i];
    } else {
      phrase = dict[currCode] ? dict[currCode] : oldPhrase + currChar;
    }
    out.push(phrase);
    currChar = phrase.charAt(0);
    dict[code] = oldPhrase + currChar;
    code++;
    oldPhrase = phrase;
  }
  return out.join("");
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
  var enst = lzw_encode(str);
  var dest = lzw_decode(enst);
  if (str !== dest) {
    count++;
    console.log(count, "test failed." + index, str);
  }
}

[...Array(100)].forEach((temp, index) => {
  testfn(index);
});

console.log("all finished.error:" + count);
