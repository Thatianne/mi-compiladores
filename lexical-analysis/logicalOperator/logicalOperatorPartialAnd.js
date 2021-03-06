const constants = require('../constants');
const BaseClass = require('../baseClass');

class LogicalOperatorPartialAnd extends BaseClass {
  static exec(character) {
    if (character === '&') {
      return constants.LOGICAL_OPERATOR_AND;
    }

    return constants.ERROR_LOGICAL_OPERATOR_AND_INCOMPLETED;
  }

  static isFinalState() {
    return false;
  }

  static willStay(character) {
    return false;
  }

  static willHaveBetterMatch(character) {
    return false;
  }

}

module.exports = LogicalOperatorPartialAnd;