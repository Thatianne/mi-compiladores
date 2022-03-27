const constants = require('../constants');
const BaseClass = require('../baseClass');

class LineCommentPercent extends BaseClass {

  static exec(character) {
    if (character === "\n" || character === '') {
      return constants.LINE_COMMENT;
    }

    return constants.LINE_COMMENT_MIDDLE;
  }

  static isFinalState() {
    return false;
  }

  static willStay(character) {
    return false;
  }

  static willHaveBetterMatch(character) {
    return true;
  }
}

module.exports = LineCommentPercent