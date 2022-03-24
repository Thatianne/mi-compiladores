const constants = require('../constants');

class LineCommentPercent {

  static exec(character) {
    if (character === "\n") {
      return constants.LINE_COMMENT_PERCENT;
    }

    // TODO tratar erros
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