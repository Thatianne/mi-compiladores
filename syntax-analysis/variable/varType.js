const BaseClass = require('../baseClass');
const TypeNotFound = require('../errors/typeNotFound');
class VarType extends BaseClass {
  exec() {
    const [foundType, endedTokens] = this.nextUntilType();
    if (foundType) {
      this.next();
    } else {
      this.addError(new TypeNotFound(this.currentIndex, this.currentToken))
    }

    return this.currentIndex;
  }

  getTypes() {
    return VarType.getSetFirst();
  }

  static getSetFirst() {
    return ['integer', 'string', 'real', 'boolean', 'char'];
  }

  static isOnSetFirst(token) {
    return VarType.getSetFirst().includes(token.lexema);
  }

  nextUntilType() {
    return this.nextUntil(
      VarType.isOnSetFirst, [
        this.isIdentifier
    ]);
  }
}

module.exports = VarType;