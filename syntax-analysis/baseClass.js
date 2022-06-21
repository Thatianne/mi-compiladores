const Constants = require('./constants');
const UnexpectedToken = require('./errors/unexpectedToken');
const FileEnded = require('./errors/FileEndend');

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

  isConstReservedWord(token) {
    return this.isReservedWord(token) && token.lexema === 'const';
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

  isDot(token) {
    return this.isDelimiter(token) && token.lexema === '.';
  }

  isEquals(token) {
    return token.lexema === '=';
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

  static getSetFirst() {
    return [];
  }

  static isOnSetFirst(token) {
    return BaseClass.getSetFirst().includes(token);
  }

  nextUntil(funcSearchUntil, funcsStopSearch) {
    let found = false;
    let endedTokens = true;

    while(this.currentToken) {
      if (funcSearchUntil.call(this, this.currentToken)) {
        found = true;
        endedTokens = false
        break
      }
      if (funcsStopSearch.some((func) => func.call(this, this.currentToken))) {
        found = false;
        endedTokens = false;
        break;
      } else {
        this.addError(new UnexpectedToken(this.currentIndex, this.currentToken));
        this.next();
      }

    }

    if (endedTokens) {
      this.addError(new FileEnded());
    }
    return [found, endedTokens];
  }
}

module.exports = BaseClass;