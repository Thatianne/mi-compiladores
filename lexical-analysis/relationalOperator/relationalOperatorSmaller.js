const constants = require('../constants');
const BaseClass = require('../baseClass');

class RelationalOperatorSmaller extends BaseClass {
  static exec(character) {
    if (character === '=') {
      return constants.RELATIONAL_OPERATOR_SMALLER_OR_EQUALS;
    }
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

module.exports = RelationalOperatorSmaller;