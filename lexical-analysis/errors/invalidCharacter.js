const constants = require('../constants');

class InvalidCharacter {

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

module.exports = InvalidCharacter;