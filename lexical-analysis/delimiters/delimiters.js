const constants = require('../constants');

class Delimiters {

  static exec() {
    return constants.INITIAL;
  }

  static isFinalState() {
    return true;
  }

  static willStay(character) {
    return false;
  }
}

module.exports = Delimiters;