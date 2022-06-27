const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const IdentifierNotFound = require('../errors/identifierNotFound');
const VarType = require('../variable/varType');
const ParameterListFunction = require('./parameterListFunction');

// <VarType> Identifier <ParameterListFunction> | ')' ':' <VarType>
class ParameterFunction extends BaseClass {
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
        const parameterListFunction = new ParameterListFunction(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = parameterListFunction.exec();
      }
    }

    return this.currentIndex;
  }

  nextUntilIdentifier() {
    return this.nextUntil(this.isIdentifier, [ParameterListFunction.isOnSetFirst])
  }

  static getSetFirst() {
    return VarType.getSetFirst().concat([')']);
  }

  static isOnSetFirst(token) {
    return ParameterFunction.getSetFirst().includes(token.lexema);
  }
}

module.exports = ParameterFunction;