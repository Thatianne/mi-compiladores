const BaseClass = require('../baseClass');
const TypeNotFound = require('../errors/typeNotFound');
const TokenHelper = require('../tokenHelper');

/* <ConstType> ::= 'integer'
| 'string'
| 'real'
| 'boolean'
| 'char'
*/
const ACCEPTED_TYPES = ['integer', 'string', 'real', 'boolean', 'char'];
class ConstType extends BaseClass {
  exec() {
    const [foundType, endedTokens] = this.nextUntilType();
    if (foundType) {
      this.next();
    } else {
      this.addError(new TypeNotFound(this.currentIndex, this.currentToken, ACCEPTED_TYPES))
    }

    return this.currentIndex;
  }

  getTypes() {
    return ACCEPTED_TYPES;
  }

  nextUntilType() {
    return this.nextUntil(
      ConstType.isOnSetFirst, [
        TokenHelper.isIdentifier
    ]);
  }

  static getSetFirst() {
    return [
      TokenHelper.isIntegerReservedWord,
      TokenHelper.isStringReservedWord,
      TokenHelper.isRealReservedWord,
      TokenHelper.isBooleanReservedWord,
      TokenHelper.isCharReservedWord
    ];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, ConstType.getSetFirst());
  }
}

module.exports = ConstType;