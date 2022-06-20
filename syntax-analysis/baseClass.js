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

  get prevToken() {
    return this.tokens[this.currentIndex - 1];
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

  hasErrors() {
    return this.errors.length > 0;
  }

  changedLine() {
    return +this.prevToken.line < +this.currentToken.line;
  }

  getSetFirst() {
    return [];
  }

  isOnSetFirst() {
    return this.getSetFirst().includes(this.currentToken);
  }
}

module.exports = BaseClass;