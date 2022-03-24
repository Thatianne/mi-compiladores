const fs = require('fs');
const Initial = require('./initial/initial');
const Identifiers = require('./identifiers/identifiers');
const ReservedWords = require('./reservedWords/reservedWords');
const Delimiters = require('./delimiters/delimiters');
const LogicalOperatorsNot = require('./logicalOperators/logicalOperatorsNot');
const LogicalOperatorsPartial = require('./logicalOperators/logicalOperatorsPartial');
const LogicalOperators = require('./logicalOperators/logicalOperators');
const constants = require('./constants');

const fileName = 'input/input1.txt';

const states = {
  [constants.INITIAL]: Initial,
  [constants.IDENTIFIERS]: Identifiers,
  [constants.RESERVED_WORDS]: ReservedWords,
  [constants.DELIMITERS]: Delimiters,
  [constants.LOGICAL_OPERATORS_NOT]: LogicalOperatorsNot,
  [constants.LOGICAL_OPERATORS_PARTIAL]: LogicalOperatorsPartial,
  [constants.LOGICAL_OPERATORS]: LogicalOperators,
}

const code = fs.readFileSync(fileName, {encoding:'utf8', flag:'r'});
const codeLength = code.length;
let lexemeArray = [];
let lexeme = '';
let stateName = constants.INITIAL
let state = states[stateName];
let lineCounter = 1;

for (let codeIndex = 0; codeIndex < codeLength; codeIndex++) {
  const character = code.charAt(codeIndex);
  lexemeArray.push(character);
  stateName = state.exec(character);
  state = states[stateName];

  if (character === '\n') {
    lineCounter++
  }

  const characterLookup = code.charAt(codeIndex + 1);

  if (state.isFinalState() && !state.willStay(characterLookup)) {
    lexeme = lexemeArray.join('').trim();

    if (stateName === constants.IDENTIFIERS && ReservedWords.includes(lexeme)) {
      stateName = constants.RESERVED_WORDS;
      state = ReservedWords;
    }
    console.log(lineCounter, lexeme, state.name)

    lexemeArray = []
    state = Initial
  }
}