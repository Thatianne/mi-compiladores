const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const TokenHelper = require('../tokenHelper');
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
      if (TokenHelper.isComma(this.currentToken)) {
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
    return this.nextUntil(TokenHelper.isCloseBrackets, [TokenHelper.isComma, ParameterFunction.isOnSetFirst])
  }

  nextUntilColon() {
    return this.nextUntil(TokenHelper.isColon, [VarType.isOnSetFirst])
  }

  nextUntilIdentifier() {
    return this.nextUntil(TokenHelper.isIdentifier, [])
  }

  static getSetFirst() {
    return [TokenHelper.isComma, TokenHelper.isCloseBrackets];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, ParameterListFunction.getSetFirst());
  }
}

module.exports = ParameterListFunction;