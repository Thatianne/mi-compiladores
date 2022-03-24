const fs = require('fs');
const constants = require('./constants');
const states = require('./states');

class Process {
  static init(filename) {
    const code = fs.readFileSync(filename, {encoding:'utf8', flag:'r'});
    const codeLength = code.length;
    const reservedWordsState = states.states[constants.RESERVED_WORDS];
    let lexemeArray = [];
    let lexeme = '';
    let stateName = constants.INITIAL
    let state = states.states[stateName];
    let lineCounter = 1;

    for (let codeIndex = 0; codeIndex < codeLength; codeIndex++) {
      const character = code.charAt(codeIndex);
      lexemeArray.push(character);
      stateName = state.exec(character);
      state = states.states[stateName];

      const characterLookup = code.charAt(codeIndex + 1);

      if (state.isFinalState() && !state.willStay(characterLookup) && (!state.willHaveBetterMatch(characterLookup) || codeIndex === codeLength - 1)) {
        lexeme = lexemeArray.join('').trim();

        if (stateName === constants.IDENTIFIERS && reservedWordsState.includes(lexeme)) {
          stateName = constants.RESERVED_WORDS;
          state = reservedWordsState;
        }
        console.log(lineCounter, lexeme, state.name);

        lexemeArray = [];
        state = states.states[constants.INITIAL];
      }

      if (character === '\n') {
        lineCounter++;
      }
    }
  }
}

module.exports = Process;