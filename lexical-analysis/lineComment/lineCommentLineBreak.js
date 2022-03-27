const constants = require('../constants');
const BaseClass = require('../baseClass');

class LineCommentLineBreak extends BaseClass {

  static exec(character) {
    return constants.INITIAL;
  }

  static isFinalState() {
    return true;
  }

  static willStay(character) {
    return false;
  }

  static willHaveBetterMatch(character) {
    return false;
  }
}

module.exports = LineCommentLineBreak