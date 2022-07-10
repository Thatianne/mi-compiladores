const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const TokenHelper = require('../tokenHelper');

// <ListArgumentsRead> ::= ',' <ArgumentsRead> | ')' ';'
class ListArgumentsRead extends BaseClass {
  exec() { // TODO tratar erro
    let useFirstProduction = false;
    let useSecondProduction = false;

    const ArgumentsRead = require('./argumentsRead');

    if (TokenHelper.isComma(this.currentToken)) {
      this.next();
      useFirstProduction = true;
    } else if (TokenHelper.isCloseBrackets(this.currentToken)) {
      this.next();
      useSecondProduction = true;
    } else {
      this.addError(new DelimiterNotFound(', or )', this.currentIndex, this.currentToken));
    }

    if (!useFirstProduction) {
      if (TokenHelper.isSemicolon(this.currentToken)) {
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
    return BaseClass.processIsOnSetFirst(token, ListArgumentsRead.getSetFirst());
  }
}

module.exports = ListArgumentsRead;