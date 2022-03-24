const constants = require('../constants');

class ArithmeticOperatorsDoubleMinus {
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
    return character === '-';
  }

}

module.exports = ArithmeticOperatorsDoubleMinus;