const constants = require('../constants');
const BaseClass = require('../baseClass');

class LineCommentMiddle extends BaseClass {

  static exec(character) {
    if (character === "\n" || character === '') {
      return constants.LINE_COMMENT;
    } else {
      return constants.LINE_COMMENT_MIDDLE;
    }
  }

  static isFinalState() {
    return false;
  }

  static willStay(character) {
    return true;
  }

  static willHaveBetterMatch(character) {
    return false;
  }
}

module.exports = LineCommentMiddle