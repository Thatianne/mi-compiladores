const BaseClass = require('../baseClass');
const TypeNotFound = require('../errors/typeNotFound');

// <WriteContent> ::= Decimal | RealNumber | StringLiteral
const ACCEPTED_TYPES = ['decimal', 'real', 'string'];
class WriteContent extends BaseClass {
  exec() {
    if (this.isDecimal(this.currentToken) || this.isReal(this.isReal) || this.isString(this.currentToken)) {
      this.next();
    } else {
      this.addError(new TypeNotFound(this.currentIndex, this.currentToken, ACCEPTED_TYPES));
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return [BaseClass.isDecimal, BaseClass.isReal, BaseClass.isString];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, WriteContent.getSetFirst());
  }
}

module.exports = WriteContent;