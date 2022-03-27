const constants = require('../constants');
const BaseClass = require('../baseClass');

class Numbers extends BaseClass {
  static exec(character) {
    if (/[0-9]/.test(character)) {
      return constants.NUMBERS;
    } else if (character === '.') {
      return constants.NUMBERS_POINT;
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

module.exports = Numbers;