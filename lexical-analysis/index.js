const fs = require('fs');
const Initial = require('./initial/initial');
const Identifiers = require('./identifiers/identifiers');
const ReservedWords = require('./reservedWords/reservedWords');
const Delimiters = require('./delimiters/delimiters');
const LogicalOperatorsNot = require('./logicalOperators/logicalOperatorsNot');
const LogicalOperatorsPartial = require('./logicalOperators/logicalOperatorsPartial');
const LogicalOperators = require('./logicalOperators/logicalOperators');
const RelationalOperatorsSimple = require('./relationalOperators/relationalOperatorsSimple');
const RelationalOperators = require('./relationalOperators/relationalOperators');
const ArithmeticOperators = require('./arithmeticOperators/arithmeticOperations');
const ArithmeticOperatorsMinus = require('./arithmeticOperators/arithmeticOperationsMinus');
const ArithmeticOperatorsDoubleMinus = require('./arithmeticOperators/arithmeticOperationsDoubleMinus');
const ArithmeticOperatorsPlus = require('./arithmeticOperators/arithmeticOperationsPlus');
const ArithmeticOperatorsDoublePlus = require('./arithmeticOperators/arithmeticOperationsDoublePlus ');

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
  [constants.RELATIONAL_OPERATORS_SIMPLE]: RelationalOperatorsSimple,
  [constants.RELATIONAL_OPERATORS]: RelationalOperators,
  [constants.ARITHMETIC_OPERATORS]: ArithmeticOperators,
  [constants.ARITHMETIC_OPERATORS_MINUS]: ArithmeticOperatorsMinus,
  [constants.ARITHMETIC_OPERATORS_DOUBLE_MINUS]: ArithmeticOperatorsDoubleMinus,
  [constants.ARITHMETIC_OPERATORS_PLUS]: ArithmeticOperatorsPlus,
  [constants.ARITHMETIC_OPERATORS_DOUBLE_PLUS]: ArithmeticOperatorsDoublePlus,
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

  if (state.isFinalState() && !state.willStay(characterLookup) && !state.willHaveBetterMatch(characterLookup)) {
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