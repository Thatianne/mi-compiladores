const constants = require('../constants');
const BaseClass = require('../baseClass');

class LogicalOperatorPartialOr extends BaseClass {
  static exec(character) {
    if (character === '|') {
      return constants.LOGICAL_OPERATOR_OR;
    }

    return constants.ERROR_LOGICAL_OPERATOR_OR_INCOMPLETED;
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

module.exports = LogicalOperatorPartialOr;