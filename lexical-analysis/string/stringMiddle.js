const constants = require('../constants');
const BaseClass = require('../baseClass');

class StringMiddle extends BaseClass {
  static exec(character) {
    if (character === '"') {
      return constants.STRING_END_DOUBLE_QUOTES;
    } else if (character === "") {
      return constants.ERROR_STRING_NOT_CLOSED;
    } else if (/\x20-\x7E/) {
      return constants.STRING_MIDDLE;
    }

    return constants.INITIAL;
  }

  static isFinalState() {
    return false;
  }

  static willStay(character) {
    return character !== '"';
  }

  static willHaveBetterMatch(character) {
    return true;
  }

}

module.exports = StringMiddle;