const constants = require('../constants');

class Identifier {

  static exec(character) {
    const regex = /[a-zA-Z0-9_]/;

    if (regex.test(character)) {
      return constants.IDENTIFIERS;
    }

    return constants.INITIAL;
  }

  static willStay(character) {
    const regex = /[a-zA-Z0-9_]/;

    return regex.test(character);
  }

  static isFinalState() {
    return true;
  }

  static willHaveBetterMatch(character) {
    return false;
  }

}

module.exports = Identifier;