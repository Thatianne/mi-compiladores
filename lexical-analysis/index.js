const fs = require('fs');
const Initial = require('./initial/initial');
const Identifiers = require('./identifiers/identifiers');
const ReservedWords = require('./reservedWords/reservedWords');
const constants = require('./constants');

const fileName = 'input/input1.txt';

const states = {
  [constants.INITIAL]: Initial,
  [constants.IDENTIFIERS]: Identifiers,
  [constants.RESERVED_WORDS]: ReservedWords
}

const code = fs.readFileSync(fileName, {encoding:'utf8', flag:'r'});
const codeLength = code.length;
let lexemeArray = [];
let lexeme = '';
let stateName = constants.INITIAL
let state = states[stateName];
let lineCounter = 0;

for (let codeIndex = 0; codeIndex < codeLength; codeIndex++) {
  const character = code.charAt(codeIndex);
  lexemeArray.push(character);
  stateName = state.exec(character);
  state = states[stateName];

  if (character === '\n') {
    lineCounter++
  }

  const characterLookup = code.charAt(codeIndex + 1);
  const isANewLexemaStart = Initial.exec(characterLookup) !== constants.INITIAL;
  if (!state.isFinalState() && isANewLexemaStart) {
    lexemeArray = [];
  }

  if (state.isFinalState() && !state.willStay(characterLookup)) {
    lexeme = lexemeArray.join('');

    if (stateName === constants.IDENTIFIERS && ReservedWords.includes(lexeme)) {
      stateName = constants.RESERVED_WORDS;
      state = ReservedWords;
    }
    console.log(lineCounter, lexeme, state.name)

    lexemeArray = []
    state = Initial
  }
}