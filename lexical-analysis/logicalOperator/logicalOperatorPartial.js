const constants = require('../constants');
const BaseClass = require('../baseClass');

class LogicalOperatorPartial extends BaseClass {
  static exec(character) {
    if (['&', '|'].includes(character)) {
      return constants.LOGICAL_OPERATOR;
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

module.exports = LogicalOperatorPartial;