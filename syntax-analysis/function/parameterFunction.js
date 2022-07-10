const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const IdentifierNotFound = require('../errors/identifierNotFound');
const TokenHelper = require('../tokenHelper');
const VarType = require('../variable/varType');
const ParameterListFunction = require('./parameterListFunction');

// <VarType> Identifier <ParameterListFunction> | ')' ':' <VarType>
class ParameterFunction extends BaseClass {
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
          const parameterListFunction = new ParameterListFunction(this.tokens, this.currentIndex, this.errors);
          this.currentIndex = parameterListFunction.exec();
        }
      } else {
        this.addError(new DelimiterNotFound(')', this.currentIndex, this.currentToken));
      }
    }

    return this.currentIndex;
  }

  nextUntilCloseBrackets() {
    return this.nextUntil(TokenHelper.isCloseBrackets, [VarType.isOnSetFirst, TokenHelper.isIdentifier, ParameterListFunction.isOnSetFirst])
  }

  nextUntilIdentifier() {
    return this.nextUntil(TokenHelper.isIdentifier, [ParameterListFunction.isOnSetFirst])
  }

  nextUntilColon() {
    return this.nextUntil(TokenHelper.isColon, [VarType.isOnSetFirst])
  }

  static getSetFirst() {
    return VarType.getSetFirst().concat([')']);
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, ParameterFunction.getSetFirst());
  }

  static getSetFirst() {
    return VarType.getSetFirst().concat([')']);
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, ParameterFunction.getSetFirst());
  }
}

module.exports = ParameterFunction;