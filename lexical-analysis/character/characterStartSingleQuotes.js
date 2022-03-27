const constants = require('../constants');
const BaseClass = require('../baseClass');

class CharacterStartSingleQuotes extends BaseClass {
  static exec(character) {
    if (character === "'") {
      return constants.CHARACTER_END_SINGLE_QUOTES;
    } else if (/\x20-\x7E/) {
      return constants.CHARACTER_MIDDLE;
    }

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

module.exports = CharacterStartSingleQuotes;