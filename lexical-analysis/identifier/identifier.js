const constants = require('../constants');
const BaseClass = require('../baseClass');

class Identifier extends BaseClass {

  static exec(character) {
    const regex = /[a-zA-Z0-9_]/;

    if (regex.test(character)) {
      return constants.IDENTIFIER;
    } if (/\s/.test(character)) {
      return constants.INITIAL;
    }
    return constants.INVALID_CHARACTER;
  }

  static willStay(character) {
    const regex = /[a-zA-Z0-9_]/;

    return regex.test(character);
  }

  static isFinalState() {
    return true;
  }

  static willHaveBetterMatch(character) {
    const regex = /[a-zA-Z0-9_]/;

    return regex.test(character);
  }

}

module.exports = Identifier;