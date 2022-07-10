const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const IdentifierNotFound = require('../errors/identifierNotFound');
const TokenHelper = require('../tokenHelper');
const VarType = require('../variable/varType');
const ParameterListProcedure = require('./parameterListProcedure');

// <ParameterProcedure> ::= <VarType> Identifier <ParameterListProcedure> | ')'
class ParameterProcedure extends BaseClass {
  exec() {
    let [foundCloseBrackets, endedTokens] = this.nextUntilCloseBrackets();

    if (foundCloseBrackets) {
      this.next();
    } else {
      if (!endedTokens) {
        const varType = new VarType(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = varType.exec();

        let [foundIdentifier, endedTokens] = this.nextUntilIdentifier();

        if (foundIdentifier) {
          this.next();
        } else {
          this.addError(new IdentifierNotFound(this.currentIndex, this.currentToken));
        }

        if (!endedTokens) {
          const parameterListProcedure = new ParameterListProcedure(this.tokens, this.currentIndex, this.errors);
          this.currentIndex = parameterListProcedure.exec();
        }
      } else {
        this.addError(new DelimiterNotFound(')', this.currentIndex, this.currentToken));
      }
    }

    return this.currentIndex;
  }

  nextUntilCloseBrackets() {
    return this.nextUntil(TokenHelper.isCloseBrackets, [VarType.isOnSetFirst, TokenHelper.isIdentifier, ParameterListProcedure.isOnSetFirst])
  }

  nextUntilIdentifier() {
    return this.nextUntil(TokenHelper.isIdentifier, [ParameterListProcedure.isOnSetFirst])
  }

  static getSetFirst() {
    return VarType.getSetFirst().concat([')']);
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, ParameterProcedure.getSetFirst());
  }
}

module.exports = ParameterProcedure;