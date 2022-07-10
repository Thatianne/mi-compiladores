const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const TokenHelper = require('../tokenHelper');

// <ListArgumentsWrite> ::= ',' <ArgumentsWrite> | ')' ';'
class ListArgumentsWrite extends BaseClass {
  exec() { // TODO tratar erro
    if (TokenHelper.isComma(this.currentToken)) {
      this.next();

      const ArgumentsWrite = require('./argumentsWrite');
      const argumentsWrite = new ArgumentsWrite(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = argumentsWrite.exec();

    } else if (TokenHelper.isCloseBrackets(this.currentToken)) {
      this.next();

      if (TokenHelper.isSemicolon(this.currentToken)) {
        this.next();
      } else {
        this.addError(new DelimiterNotFound(';', this.currentIndex, this.currentToken));
      }
    } else {
      this.addError(new DelimiterNotFound(', or )', this.currentIndex, this.currentToken));
    }
    return this.currentIndex;
  }

  static getSetFirst() {
    return [];
  }

  static isOnSetFirst(token) {
    return ListArgumentsWrite.getSetFirst().includes(token.lexema);
  }
}

module.exports = ListArgumentsWrite;