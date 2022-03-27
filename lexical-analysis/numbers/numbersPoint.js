const constants = require('../constants');
const BaseClass = require('../baseClass');

class NumbersPoint extends BaseClass {
  static exec(character) {
    if (/[0-9]/.test(character)) {
      return constants.NUMBERS_FLOAT;
    }
    // TODO tratar erro (ex: 0..7)
    return constants.INITIAL;
  }

  static isFinalState() {
    return false;
  }

  static willStay(character) {
    return false;
  }

  static willHaveBetterMatch(character) {
    return /[0-9]/.test(character);
  }

}

module.exports = NumbersPoint;