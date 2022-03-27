const constants = require('./constants');

class BaseClassError {
  static exec(character) {
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

  static isError(character) {
    return true;
  }

}

module.exports = BaseClassError;