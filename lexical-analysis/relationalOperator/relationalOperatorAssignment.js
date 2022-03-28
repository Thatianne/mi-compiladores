const constants = require('../constants');
const BaseClass = require('../baseClass');

class RelationalOperatorAssignment extends BaseClass {
  static exec(character) {
    if (character === '=') {
      return constants.RELATIONAL_OPERATOR_EQUALS;
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

module.exports = RelationalOperatorAssignment;