const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const TokenHelper = require('../tokenHelper');

// <ParameterListProcedure> ::= ',' <ParameterProcedure> | ')'
class ParameterListProcedure extends BaseClass {
  exec() {
    let [foundCloseBrackets, endedTokens] = this.nextUntilCloseBrackets();

    if (foundCloseBrackets) {
      this.next();
    } else {
      if (TokenHelper.isComma(this.currentToken)) {
        this.next();
      } else {
        this.addError(new DelimiterNotFound(',', this.currentIndex, this.currentToken));
      }

      if (!endedTokens) {
        const ParameterProcedure = require('./parameterProcedure');
        const parameterProcedure = new ParameterProcedure(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = parameterProcedure.exec();
      }
    }

    return this.currentIndex;
  }

  nextUntilCloseBrackets() {
    const ParameterProcedure = require('./parameterProcedure');
    return this.nextUntil(TokenHelper.isCloseBrackets, [TokenHelper.isComma, ParameterProcedure.isOnSetFirst])
  }

  static getSetFirst() {
    return [TokenHelper.isComma, TokenHelper.isCloseBrackets];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, ParameterListProcedure.getSetFirst());
  }
}

module.exports = ParameterListProcedure;