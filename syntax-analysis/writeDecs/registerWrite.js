const BaseClass = require('../baseClass');
const IdentifierNotFound = require('../errors/identifierNotFound');
const TokenHelper = require('../tokenHelper');

// <RegisterWrite> ::= '.' Identifier |
class RegisterWrite extends BaseClass {
  exec() { // TODO tratar erros
    if (TokenHelper.isDot(this.currentToken)) {
      this.next();

      if (TokenHelper.isIdentifier(this.currentToken)) {
        this.next();
      } else {
        this.addError(new IdentifierNotFound(this.currentIndex, this.currentToken));
      }
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return [TokenHelper.isDot];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, RegisterWrite.getSetFirst());
  }
}

module.exports = RegisterWrite;