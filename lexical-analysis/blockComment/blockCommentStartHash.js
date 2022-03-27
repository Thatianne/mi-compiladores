const constants = require('../constants');
const BaseClass = require('../baseClass');

class BlockCommentStartHash extends BaseClass {

  static exec(character) {
    if (character === '#') {
      return constants.BLOCK_COMMENT_END_HASH;
    } else if (character === '') {
      return constants.ERROR_BLOCK_COMMENT_NOT_CLOSED;
    }
    return constants.BLOCK_COMMENT_MIDDLE
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

module.exports = BlockCommentStartHash