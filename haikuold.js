var fs = require("fs");
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

cmudictFile = cmudictFile.split("\n");

var cmuDictionarySyllables = [];

cmudictFile = cmudictFile.filter(function(line){
  !/\(\d+\)/.test(line);
});

cmudictFile.forEach(function(line){
  cmuDictionarySyllables.push(line.split(/\d/g));
});
console.log(cmudictFile);

var firstWordIndex;

var haiku = cmuDictionarySyllables.find(function(word,index){
  if(word.length === 5){
    firstWordIndex = index;
    return true;
  }
})[0].replace(/\s/g,"");

haiku += "\n"+cmuDictionarySyllables.find(function(word){
  return word.length === 7;
})[0].replace(/\s/g,"");

haiku += "\n"+cmuDictionarySyllables.find(function(word,index){
  if(word.length === 5 && firstWordIndex !== index){
    return true;
  }
})[0].replace(/\s/g,"");

console.log(haiku);
