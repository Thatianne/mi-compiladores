const BaseClass = require('../baseClass');
const VarType = require('../variable/varType');

// <ParameterListProcedure> ::= ',' <ParameterProcedure> | ')'
class ParameterListProcedure extends BaseClass {
  exec() {
    if (this.isCloseBrackets(this.currentToken)) {
      this.next();
    } else if (this.isComma(this.currentToken)){
      this.next();

      const ParameterProcedure = require('./parameterProcedure');
      const parameterProcedure = new ParameterProcedure(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = parameterProcedure.exec();
    }

    return this.currentIndex;
  }

  nextUntilIdentifier() {
    return this.nextUntil(this.isIdentifier, [])
  }

  static getSetFirst() {
    return VarType.getSetFirst().concat([')']);
  }

  static isOnSetFirst(token) {
    return ParameterProcedure.getSetFirst().includes(token);
  }
}

module.exports = ParameterListProcedure;