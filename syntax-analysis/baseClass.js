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

  get nextToken() {
    return this.tokens[this.currentIndex + 1];
  }

  get count() {
    return this.tokens.length;
  }

  next() {
    this.currentIndex++;
    return this.currentIndex >= this.count - 1; // acabaram os tokens
  }

  prev() {
    this.currentIndex--;
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

  static processIsOnSetFirst(token, set) {
    const functions = set.filter(tokenType => typeof tokenType === 'function');
    const notFunctions = set.filter(tokenType => typeof tokenType !== 'function');

    const result = functions.some(func => func.call(this, token));

    return result || notFunctions.includes(token.lexema);
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