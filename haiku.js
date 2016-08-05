var fs = require("fs"),
    cmudict_file = read_cmudict_file('./cmudict.txt');

function read_cmudict_file(file){
  return fs.readFileSync(file, 'ascii');
}

cmudict_file = cmudict_file.split("\n");
cmudict_file.pop();

var cmu_dictionary_syllables = [];

var is_form_of_word = /\(\d+\)/;

cmudict_file = cmudict_file.filter(function(line){
  return !is_form_of_word.test(line);
});

var word_phenome_extract = /^(\S+)\s(.+)/,
    digit = /\d/;
cmudict_file.forEach(function(line){
  var syllables = word_phenome_extract.exec(line).splice(1,2);

  var word = {
    syllables: syllables[1].split(digit).length -1,
    word: syllables[0]
  };

  cmu_dictionary_syllables.push(word);
});

var words_grouped_by_amount_of_syllables = cmu_dictionary_syllables.reduce(function (current, next){
  if (!(next.syllables in current)) {
    current[next.syllables] = [];
  }
  current[next.syllables].push(next);
  return current;
}, {});

function random_index_for_syllables(amount) {
  return Math.floor(Math.random() * words_grouped_by_amount_of_syllables[amount].length);
}
var first_word_index = random_index_for_syllables(5),
    second_word_index = random_index_for_syllables(7),
    third_word_index = random_index_for_syllables(5),
    haiku = words_grouped_by_amount_of_syllables[5][first_word_index].word + '\n' +
            words_grouped_by_amount_of_syllables[7][second_word_index].word + '\n' +
            words_grouped_by_amount_of_syllables[5][third_word_index].word;

console.log(haiku);
