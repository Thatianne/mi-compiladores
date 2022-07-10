const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');

// <ListArgumentsRead> ::= ',' <ArgumentsRead> | ')' ';'
class ListArgumentsRead extends BaseClass {
  exec() { // TODO tratar erro
    let useFirstProduction = false;
    let useSecondProduction = false;

    const ArgumentsRead = require('./argumentsRead');

    if (this.isComma(this.currentToken)) {
      this.next();
      useFirstProduction = true;
    } else if (this.isCloseBrackets(this.currentToken)) {
      this.next();
      useSecondProduction = true;
    } else {
      this.addError(new DelimiterNotFound(', or )', this.currentIndex, this.currentToken));
    }

    if (!useFirstProduction) {
      if (this.isSemicolon(this.currentToken)) {
        this.next();
      } else {
        this.addError(new DelimiterNotFound(';', this.currentIndex, this.currentToken));
      }
    } else if (!useSecondProduction && ArgumentsRead.isOnSetFirst(this.currentToken)) {
      const argumentsRead = new ArgumentsRead(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = argumentsRead.exec();
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return [',', ')'];
  }

  static isOnSetFirst(token) {
    return ListArgumentsRead.getSetFirst().includes(token.lexema);
  }
}

module.exports = ListArgumentsRead;