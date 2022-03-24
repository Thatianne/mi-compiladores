const constants = require('../constants');

class LogicalOperatorsPartial {
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

}

module.exports = LogicalOperatorsPartial;