const Constants = require('./constants');

class BaseClass {
  constructor(tokens, currentIndex) {
    this.tokens = tokens;
    this.currentIndex = currentIndex;
  }

  exec() {

  }

  get currentToken() {
    return this.tokens[this.currentIndex];
  }

  next() {
    this.currentIndex++;
  }

  isReservedWord(token) {
    return token.class.toLowerCase() === Constants.RESERVED_WORD.toLowerCase();
  }

  isIdentifier(token) {
    return token.class.toLowerCase() === Constants.IDENTIFIER.toLowerCase();
  }

  isDelimiter(token) {
    return token.class.toLowerCase() === Constants.DELIMITER.toLowerCase();
  }
}

module.exports = BaseClass;