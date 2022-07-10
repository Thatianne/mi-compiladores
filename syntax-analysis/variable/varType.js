const BaseClass = require('../baseClass');
const TypeNotFound = require('../errors/typeNotFound');
const TokenHelper = require('../tokenHelper');

const ACCEPTED_TYPES = ['integer', 'string', 'real', 'boolean', 'char']
class VarType extends BaseClass {
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
    return VarType.getSetFirst();
  }

  static getSetFirst() {
    return ACCEPTED_TYPES;
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, VarType.getSetFirst());
  }

  nextUntilType() {
    return this.nextUntil(
      VarType.isOnSetFirst, [
        TokenHelper.isIdentifier
    ]);
  }
}

module.exports = VarType;