const BaseClass = require('../baseClass');
const OperatorNotFound = require('../errors/operatorNotFound');
const TypeNotFound = require('../errors/typeNotFound');
const TokenHelper = require('../tokenHelper');

// <AddendOperatorUnary> ::= Identifier | Boolean
class AddendOperatorUnary extends BaseClass {
  exec() {
    if (TokenHelper.isIdentifier(this.currentToken) || TokenHelper.isBoolean(this.currentToken)) {
      this.next();
    } else {
      this.addError(new TypeNotFound(this.currentIndex, this.currentToken, ['identifier', 'boolean']));
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return [TokenHelper.isIdentifier, TokenHelper.isBoolean];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, UnaryExpression.getSetFirst());
  }
}

module.exports = AddendOperatorUnary;