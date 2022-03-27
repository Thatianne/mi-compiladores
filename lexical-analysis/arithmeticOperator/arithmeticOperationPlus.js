const constants = require('../constants');
const BaseClass = require('../baseClass');

class ArithmeticOperatorPlus extends BaseClass {
  static exec(character) {
    if (character === '+') {
      return constants.ARITHMETIC_OPERATOR_DOUBLE_PLUS;
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
    return character === '+';
  }

}

module.exports = ArithmeticOperatorPlus;