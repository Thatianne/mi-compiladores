const constants = require('../constants');
const BaseClass = require('../baseClass');

class BlockCommentEndHash extends BaseClass {

  static exec(character) {
    if (character === '/') {
      return constants.BLOCK_COMMENT_END_SLASH
    }
    //TODO colocar para erro
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

module.exports = BlockCommentEndHash