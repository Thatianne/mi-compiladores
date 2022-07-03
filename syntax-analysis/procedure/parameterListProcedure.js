const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');

// <ParameterListProcedure> ::= ',' <ParameterProcedure> | ')'
class ParameterListProcedure extends BaseClass {
  exec() {
    let [foundCloseBrackets, endedTokens] = this.nextUntilCloseBrackets();

    if (foundCloseBrackets) {
      this.next();
    } else {
      if (this.isComma(this.currentToken)) {
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
    return this.nextUntil(this.isCloseBrackets, [this.isComma, ParameterProcedure.isOnSetFirst])
  }

  static getSetFirst() {
    return [',', ')'];
  }

  static isOnSetFirst(token) {
    return ParameterListProcedure.getSetFirst().includes(token.lexema);
  }
}

module.exports = ParameterListProcedure;