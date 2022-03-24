const constants = require('../constants');

class ArithmeticOperatorsSlash {
  static exec(character) {
    if (character === '#') {
      return constants.BLOCK_COMMENT_START_HASH;
    }
    return constants.INITIAL;
  }

  static isFinalState() {
    return true;
  }

  static willStay(character) {
    return false;
  }

  static willHaveBetterMatch(character) {
    return character === '#';
  }

}

module.exports = ArithmeticOperatorsSlash;