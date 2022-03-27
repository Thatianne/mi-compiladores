const constants = require('../constants');
const BaseClass = require('../baseClass');

class ArithmeticOperatorSum extends BaseClass {
  static exec(character) {
    if (character === '+') {
      return constants.ARITHMETIC_OPERATOR_INCREMENT;
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

module.exports = ArithmeticOperatorSum;