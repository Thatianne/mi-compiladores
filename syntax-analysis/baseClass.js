const Constants = require('./constants');

class BaseClass {
  constructor(tokens, currentIndex, errors) {
    this.tokens = tokens;
    this.currentIndex = currentIndex;
    this.errors = errors;
  }

  exec() {

  }

  get currentToken() {
    return this.tokens[this.currentIndex];
  }

  next() {
    this.currentIndex++;
  }

  prev() {
    this.currentIndex--;
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

  isSemicolon(token) {
    return this.isDelimiter(token) && token.lexema === ';';
  }

  isVarReservedWord(token) {
    return this.isReservedWord(token) && token.lexema === 'var';
  }

  isOpenCurlyBrackets(token) {
    return this.isDelimiter(token) && token.lexema === '{';
  }

  isCloseCurlyBrackets(token) {
    return this.isDelimiter(token) && token.lexema === '}';
  }

  isComma(token) {
    return this.isDelimiter(token) && token.lexema === ',';
  }

  addError(error) {
    this.errors.push(error);
  }

  isSyncToken(token) {
    this.getSyncTokens().includes(token.lexema)
  }

  getSyncTokens() {
    return []
  }
}

module.exports = BaseClass;