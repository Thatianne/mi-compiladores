const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const VarType = require('../variable/varType');

// <ParameterListFunction> ::= ',' <ParameterFunction> |  ')' ':' <VarType>
class ParameterListFunction extends BaseClass {
  exec() {
    let [foundCloseBrackets, endedTokens] = this.nextUntilCloseBrackets();

    if (foundCloseBrackets) {
      this.next();

      let [foundColon, endedTokens] = this.nextUntilColon();
      if (foundColon) {
        endedTokens = this.next();
      } else {
        this.addError(new DelimiterNotFound(':', this.currentIndex, this.currentToken));
      }

      if (!endedTokens) {
        const varType = new VarType(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = varType.exec();
      }
    } else {
      if (this.isComma(this.currentToken)) {
        this.next();
      } else {
        this.addError(new DelimiterNotFound(',', this.currentIndex, this.currentToken));
      }

      if (!endedTokens) {
        const ParameterFunction = require('./parameterFunction');
        const parameterFunction = new ParameterFunction(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = parameterFunction.exec();
      }
    }

    return this.currentIndex;
  }

  nextUntilCloseBrackets() {
    const ParameterFunction = require('./parameterFunction');
    return this.nextUntil(this.isCloseBrackets, [this.isComma, ParameterFunction.isOnSetFirst])
  }

  nextUntilColon() {
    return this.nextUntil(this.isColon, [VarType.isOnSetFirst])
  }

  nextUntilIdentifier() {
    return this.nextUntil(this.isIdentifier, [])
  }

  static getSetFirst() {
    return [',', ')'];
  }

  static isOnSetFirst(token) {
    return ParameterListFunction.getSetFirst().includes(token.lexema);
  }
}

module.exports = ParameterListFunction;