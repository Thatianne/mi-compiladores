const BaseClass = require('../baseClass');
const VarType = require('../variable/varType');

// <ParameterListFunction> ::=   ',' <ParameterFunction> |  ')' ':' <VarType>
class ParameterListProcedure extends BaseClass {
  exec() {
    if (this.isCloseBrackets(this.currentToken)) {
      this.next();

      if (this.currentToken.lexema === ':') { // TODO trocar
        this.next();
      } else {
        this.addError(new DelimiterNotFound(':', this.currentIndex, this.currentToken));
      }

      const varType = new VarType(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = varType.exec();
    } else if (this.isComma(this.currentToken)){
      this.next();

      const ParameterFunction = require('./parameterFunction');
      const parameterFunction = new ParameterFunction(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = parameterFunction.exec();
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