const constants = require('../constants');
const BaseClassError = require('../baseClassError');

class ErrorLogicalOperatorOrIncompleted extends BaseClassError {

  static exec(character) {
    return constants.INITIAL;
  }

  static willStay(character) {
    return false;
  }

  static isFinalState() {
    return true;
  }

  static willHaveBetterMatch(character) {
    return false;
  }

}

module.exports = ErrorLogicalOperatorOrIncompleted;