const constants = require('../constants');
const BaseClass = require('../baseClass');

class Number extends BaseClass {
  static exec(character) {
    if (/[0-9]/.test(character)) {
      return constants.NUMBER;
    } else if (character === '.') {
      return constants.NUMBER_POINT;
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
    return character === '.';
  }

}

module.exports = Number;