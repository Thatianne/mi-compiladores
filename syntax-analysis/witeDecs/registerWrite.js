const BaseClass = require('../baseClass');
const IdentifierNotFound = require('../errors/identifierNotFound');

// <RegisterWrite> ::= '.' Identifier |
class RegisterWrite extends BaseClass {
  exec() { // TODO tratar erros
    if (this.isDot(this.currentToken)) {
      this.next();

      if (this.isIdentifier(this.currentToken)) {
        this.next();
      } else {
        this.addError(new IdentifierNotFound(this.currentIndex, this.currentToken));
      }
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return [BaseClass.isDot];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, RegisterWrite.getSetFirst());
  }
}

module.exports = RegisterWrite;