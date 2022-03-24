const constants = require('../constants');

class ArithmeticOperatorsMinus {
  static exec(character) {
    if (character === '-') {
      return constants.ARITHMETIC_OPERATORS_DOUBLE_MINUS;
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
    return character === '-';
  }

}

module.exports = ArithmeticOperatorsMinus;