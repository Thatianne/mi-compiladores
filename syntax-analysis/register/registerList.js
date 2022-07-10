const BaseClass = require('../baseClass');
const RegisterDeclaration = require('./registerDeclaration');
const RegisterList1 = require('./registerList1');

// <RegisterList> ::= <RegisterDeclaration> <RegisterList1>
class RegisterList extends BaseClass {
  exec() {
    if (this.currentToken) {
      const registerDeclaration = new RegisterDeclaration(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = registerDeclaration.exec();

      if (this.currentToken) {
        const registerList1 = new RegisterList1(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = registerList1.exec();
      }
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return RegisterDeclaration.getSetFirst();
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, RegisterDeclaration.getSetFirst());
  }
}

module.exports = RegisterList;