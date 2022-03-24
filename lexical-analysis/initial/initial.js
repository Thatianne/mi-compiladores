const constants = require('../constants');
class Initial {

  static exec(character) {
    const regexIdentifier = /[a-zA-Z]/;

    if (regexIdentifier.test(character)) {
      return constants.IDENTIFIERS;
    }

    return constants.INITIAL;
  }

  static willStay(character) {
    const regex = /s/;

    return regex.test(character);
  }

  static isFinalState() {
    return false;
  }

}

module.exports = Initial