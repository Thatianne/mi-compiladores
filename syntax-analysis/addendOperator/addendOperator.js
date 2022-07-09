const BaseClass = require('../baseClass');
const TypeNotFound = require('../errors/typeNotFound');

// TODO validar os tipos aceitos
// <AddendOperator> ::= Identifier | Decimal | RealNumber | Boolean
const ACCEPTED_TYPES = ['identifier', 'decimal', 'real', 'boolean'];
class AddendOperator extends BaseClass {
  exec() {
    if (this.isIdentifier(this.currentToken) ||
      this.isDecimal(this.currentToken) ||
      this.isReal(this.currentToken) ||
      this.isBoolean(this.currentToken)
    ) {
      this.next();
    } else {
      this.addError(new TypeNotFound(this.currentIndex, this.currentToken, ACCEPTED_TYPES));
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return [BaseClass.isIdentifier, BaseClass.isDecimal, BaseClass.isReal, BaseClass.isBoolean];
  }

  static isOnSetFirst(token) {
    return AddendOperator.getSetFirst().includes(token.lexema);
  }
}

module.exports = AddendOperator;