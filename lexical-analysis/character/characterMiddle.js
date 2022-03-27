const constants = require('../constants');
const BaseClass = require('../baseClass');

class CharacterMiddle extends BaseClass {
  static exec(character) {
    if (character === "'") {
      return constants.CHARACTER_END_SINGLE_QUOTES;
    }

    // TODO tratar erros
    return constants.INITIAL;
  }

  static isFinalState() {
    return false;
  }

  static willStay(character) {
    return character !== "'";
  }

  static willHaveBetterMatch(character) {
    return true;
  }

}

module.exports = CharacterMiddle;