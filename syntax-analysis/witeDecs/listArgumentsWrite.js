const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const ArgumentsWrite = require('./argumentsWrite');

// <ListArgumentsWrite> ::= ',' <ArgumentsWrite> | ')' ';'
class ListArgumentsWrite extends BaseClass {
  exec() { // TODO tratar erro
    if (this.isComma(this.currentToken)) {
      this.next();

      const argumentsWrite = new ArgumentsWrite(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = argumentsWrite.exec();

    } else if (this.isCloseBrackets(this.currentToken)) {
      this.next();

      if (this.isSemicolon(this.currentToken)) {
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