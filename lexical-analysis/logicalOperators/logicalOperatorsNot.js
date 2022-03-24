const constants = require('../constants');

class LogicalOperatorsNot {
  static exec(character) {
    return constants.INITIAL;
  }

  static isFinalState() {
    return true;
  }

  static willStay(character) {
    return false;
  }

}

module.exports = LogicalOperatorsNot;