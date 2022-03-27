const constants = require('../constants');
const BaseClass = require('../baseClass');

class ArithmeticOperatorMultiplication extends BaseClass {
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

module.exports = ArithmeticOperatorMultiplication;