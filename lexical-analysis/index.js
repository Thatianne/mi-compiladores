const fs = require('fs');
const Initial = require('./initial/initial');
const ReservedWords = require('./reservedWords/reservedWords');

const fileName = 'input/input1.txt';

const code = fs.readFileSync(fileName, {encoding:'utf8', flag:'r'});
const codeLength = code.length;
let lexemeArray = [];

let state = Initial;

for (let codeIndex = 0; codeIndex < codeLength; codeIndex++) {
  const character = code.charAt(codeIndex);

  if (state.canEnd(character) || codeIndex === codeLength - 1) {
    const lexeme = lexemeArray.join('');

    if (state.name === 'Identifier') {
      if (ReservedWords.includes(lexeme)) {
        state = ReservedWords;
      }
    }
    console.log(lexeme, state.name);

    lexemeArray = [];
    state = Initial;
  } else {
    state = state.exec(character);
    lexemeArray.push(character)
  }
}