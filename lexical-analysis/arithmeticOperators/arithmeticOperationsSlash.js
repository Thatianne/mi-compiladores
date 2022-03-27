const constants = require('../constants');
const BaseClass = require('../baseClass');

class ArithmeticOperatorsSlash extends BaseClass {
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