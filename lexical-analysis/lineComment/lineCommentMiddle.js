const constants = require('../constants');
const BaseClass = require('../baseClass');

class LineCommentMiddle extends BaseClass {

  static exec(character) {
    // TODO tratar quando o comentário está na última linha do arquivo
    if (character === "\n") {
      return constants.LINE_COMMENT_LINE_BREAK;
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