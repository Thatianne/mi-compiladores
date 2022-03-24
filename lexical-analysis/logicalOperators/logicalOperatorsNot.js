const constants = require('../constants');

class LogicalOperatorsNot {
  static exec(character) {
    if (character === '=') {
      return constants.RELATIONAL_OPERATORS;
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
    return character === '=';
  }

}

module.exports = LogicalOperatorsNot;