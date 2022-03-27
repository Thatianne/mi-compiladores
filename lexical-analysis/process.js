const fs = require('fs');
const constants = require('./constants');
const states = require('./states');

class Process {
  static init(inputFile, outputFile) {
    const outputArray = []
    const code = fs.readFileSync(inputFile, {encoding:'utf8', flag:'r'});
    const codeLength = code.length;
    const reservedWordsState = states.states[constants.RESERVED_WORD];
    let lexemeArray = [];
    let lexeme = '';
    let stateName = constants.INITIAL
    let state = states.states[stateName];
    let lineCounter = 1;

    for (let codeIndex = 0; codeIndex < codeLength; codeIndex++) {
      const character = code.charAt(codeIndex);
      stateName = state.exec(character);
      lexemeArray.push(character);

      console.log(state, character, states.states[stateName])

      state = states.states[stateName];

      if (codeIndex === codeLength - 1 && !state.isFinalState()) {
        stateName = state.exec('');
        state = states.states[stateName];
      }

      const characterLookup = code.charAt(codeIndex + 1);
      if (
        state.isFinalState() &&
        (
          (!state.willStay(characterLookup) && (!state.willHaveBetterMatch(characterLookup)) ||
          codeIndex === codeLength - 1
          )
        )
      ) {
        lexeme = lexemeArray.join('').trim();

        if (stateName === constants.IDENTIFIER && reservedWordsState.includes(lexeme)) {
          stateName = constants.RESERVED_WORD;
          state = states.states[stateName];
        }
        console.log(`${lineCounter} ${lexeme} ${state.name}`);
        outputArray.push(`${lineCounter} ${lexeme} ${state.name}`);

        lexemeArray = [];
        state = states.states[constants.INITIAL];
      }

      if (character === '\n') {
        lineCounter++;
      }
    }

    fs.writeFileSync(outputFile, outputArray.join('\n'), { flag: 'w+' });
  }
}

module.exports = Process;