const constants = require('../constants');

class ArithmeticOperatorsDoublePlus {
  static exec(character) {
    return constants.INITIAL;
  }

  static isFinalState() {
    return true;
  }

  static willStay(character) {
    return false;
  }

  static willHaveBetterMatch(character) {
    return false;
  }

}

module.exports = ArithmeticOperatorsDoublePlus;