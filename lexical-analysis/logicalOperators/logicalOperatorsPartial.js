const constants = require('../constants');
const BaseClass = require('../baseClass');

class LogicalOperatorsPartial extends BaseClass {
  static exec(character) {
    if (['&', '|'].includes(character)) {
      return constants.LOGICAL_OPERATORS;
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

module.exports = LogicalOperatorsPartial;