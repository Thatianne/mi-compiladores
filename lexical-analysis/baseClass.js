const constants = require('./constants');

class BaseClass {
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

  static isError() {
    return false;
  }

}

module.exports = BaseClass;