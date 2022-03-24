const constants = require('../constants');
class Initial {

  static exec(character) {
    const regexIdentifier = /[a-zA-Z]/;
    const regexDelimiters = /[;,(){}[\]\.:]/

    if (regexIdentifier.test(character)) {
      return constants.IDENTIFIERS;
    } else if (regexDelimiters.test(character)) {
      return constants.DELIMITERS;
    } else if (character === '!') {
      return constants.LOGICAL_OPERATORS_NOT;
    } else if (['&', '|'].includes(character)) {
      return constants.LOGICAL_OPERATORS_PARTIAL;
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