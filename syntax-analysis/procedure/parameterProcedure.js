const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const IdentifierNotFound = require('../errors/identifierNotFound');
const VarType = require('../variable/varType');
const ParameterListProcedure = require('./parameterListProcedure');

// TODO qual erro indicar se não vier um varType nem ')'
// <ParameterProcedure> ::= <VarType> Identifier <ParameterListProcedure> | ')'
class ParameterProcedure extends BaseClass {
  exec() {
    let [foundCloseBrackets, endedTokens] = this.nextUntilCloseBrackets();

    if (foundCloseBrackets) {
      this.next();
    } else {
      if (!endedTokens && VarType.isOnSetFirst(this.currentToken)) {
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
        this.addError(DelimiterNotFound(')', this.currentIndex, this.currentToken));
      }
    }

    return this.currentIndex;
  }

  nextUntilCloseBrackets() {
    return this.nextUntil(this.isCloseBrackets, [VarType.isOnSetFirst])
  }

  nextUntilIdentifier() {
    return this.nextUntil(this.isIdentifier, [ParameterListProcedure.isOnSetFirst])
  }

  static getSetFirst() {
    return VarType.getSetFirst().concat([')']);
  }

  static isOnSetFirst(token) {
    return ParameterProcedure.getSetFirst().includes(token.lexema);
  }
}

module.exports = ParameterProcedure;