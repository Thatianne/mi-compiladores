const BaseClass = require('../baseClass');
const TypeNotFound = require('../errors/typeNotFound');
const TokenHelper = require('../tokenHelper');

// <WriteContent> ::= Decimal | RealNumber | StringLiteral
const ACCEPTED_TYPES = ['integer', 'real', 'string'];
class WriteContent extends BaseClass {
  exec() {
    if (TokenHelper.isInteger(this.currentToken) || TokenHelper.isReal(TokenHelper.isReal) || TokenHelper.isString(this.currentToken)) {
      this.next();
    } else {
      this.addError(new TypeNotFound(this.currentIndex, this.currentToken, ACCEPTED_TYPES));
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return [TokenHelper.isInteger, TokenHelper.isReal, TokenHelper.isString];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, WriteContent.getSetFirst());
  }
}

module.exports = WriteContent;