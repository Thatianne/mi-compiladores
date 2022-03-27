const constants = require('../constants');
const BaseClass = require('../baseClass');

class LogicalOperatorNot extends BaseClass {
  static exec(character) {
    if (character === '=') {
      return constants.RELATIONAL_OPERATOR;
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

module.exports = LogicalOperatorNot;