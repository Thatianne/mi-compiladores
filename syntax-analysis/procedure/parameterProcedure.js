const BaseClass = require('../baseClass');
const IdentifierNotFound = require('../errors/identifierNotFound');
const VarType = require('../variable/varType');
const ParameterListProcedure = require('./parameterListProcedure');

// TODO qual erro indicar se não vier um varType nem ')'
// <ParameterProcedure> ::= <VarType> Identifier <ParameterListProcedure> | ')'
class ParameterProcedure extends BaseClass {
  exec() {
    if (this.isCloseBrackets(this.currentToken)) {
      this.next();
    } else if (VarType.isOnSetFirst(this.currentToken)){
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
    }

    return this.currentIndex;
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