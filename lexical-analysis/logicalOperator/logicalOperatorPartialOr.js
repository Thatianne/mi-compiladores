const constants = require('../constants');
const BaseClass = require('../baseClass');

class LogicalOperatorPartialOr extends BaseClass {
  static exec(character) {
    if (character === '|') {
      return constants.LOGICAL_OPERATOR_OR;
    } else if (/\s/.test(character) || character === '') {
      return constants.ERROR_LOGICAL_OPERATOR_OR_INCOMPLETED;
    }

    return constants.INITIAL;
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