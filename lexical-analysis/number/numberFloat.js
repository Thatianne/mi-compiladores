const constants = require('../constants');
const BaseClass = require('../baseClass');

class NumberFloat extends BaseClass {
  static exec(character) {
    if (/[0-9]/.test(character)) {
      return constants.NUMBER_FLOAT;
    }
    return constants.INITIAL;
  }

  static isFinalState() {
    return true;
  }

  static willStay(character) {
    return /[0-9]/.test(character);
  }

  static willHaveBetterMatch(character) {
    return /[0-9]/.test(character);
  }

}

module.exports = NumberFloat;