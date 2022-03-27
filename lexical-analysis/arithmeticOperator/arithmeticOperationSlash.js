const constants = require('../constants');
const BaseClass = require('../baseClass');

class ArithmeticOperatorSlash extends BaseClass {
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

module.exports = ArithmeticOperatorSlash;