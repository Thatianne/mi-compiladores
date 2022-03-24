const constants = require('../constants');

class BlockCommentStartHash {

  static exec(character) {
    if (character === '#') {
      return constants.BLOCK_COMMENT_END_HASH;
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