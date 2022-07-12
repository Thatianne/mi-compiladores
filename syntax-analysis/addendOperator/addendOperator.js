const BaseClass = require('../baseClass');
const TypeNotFound = require('../errors/typeNotFound');
const TokenHelper = require('../tokenHelper');

// TODO validar os tipos aceitos
// <AddendOperator> ::= Identifier | Decimal | RealNumber | Boolean
const ACCEPTED_TYPES = ['identifier', 'integer', 'real', 'boolean'];
class AddendOperator extends BaseClass {
  exec() {
    if (AddendOperator.isOnSetFirst(this.currentToken)) {
      this.next();
    } else {
      this.addError(new TypeNotFound(this.currentIndex, this.currentToken, ACCEPTED_TYPES));
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return [TokenHelper.isIdentifier, TokenHelper.isInteger, TokenHelper.isReal, TokenHelper.isBoolean];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, AddendOperator.getSetFirst());
  }
}

module.exports = AddendOperator;