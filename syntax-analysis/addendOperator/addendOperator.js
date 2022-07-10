const BaseClass = require('../baseClass');
const TypeNotFound = require('../errors/typeNotFound');
const TokenHelper = require('../tokenHelper');

// TODO validar os tipos aceitos
// <AddendOperator> ::= Identifier | Decimal | RealNumber | Boolean
const ACCEPTED_TYPES = ['identifier', 'decimal', 'real', 'boolean'];
class AddendOperator extends BaseClass {
  exec() {
    if (TokenHelper.isIdentifier(this.currentToken) ||
      TokenHelper.isDecimal(this.currentToken) ||
      TokenHelper.isReal(this.currentToken) ||
      TokenHelper.isBoolean(this.currentToken)
    ) {
      this.next();
    } else {
      this.addError(new TypeNotFound(this.currentIndex, this.currentToken, ACCEPTED_TYPES));
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return [TokenHelper.isIdentifier, TokenHelper.isDecimal, TokenHelper.isReal, TokenHelper.isBoolean];
  }

  static isOnSetFirst(token) {
    return AddendOperator.getSetFirst().includes(token.lexema);
  }
}

module.exports = AddendOperator;