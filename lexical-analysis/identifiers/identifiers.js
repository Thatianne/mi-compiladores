const constants = require('../constants');
const BaseClass = require('../baseClass');

class Identifier extends BaseClass {

  static exec(character) {
    const regex = /[a-zA-Z0-9_]/;

    if (regex.test(character)) {
      return constants.IDENTIFIERS;
    } else if (!/[\x20-\x7E]/.test(character)) {
      return constants.INVALID_CHARACTER;
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