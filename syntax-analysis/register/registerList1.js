const BaseClass = require('../baseClass');
const TokenHelper = require('../tokenHelper');
const RegisterDeclaration = require('./registerDeclaration');
const RegisterStatementMultiple = require('./registerStatementMultiple');

// <RegisterList1> ::= <RegisterDeclaration> <RegisterList1> | '}' <RegisterStatementMultiple>
class RegisterList1 extends BaseClass {
  exec() {
    if (TokenHelper.isCloseCurlyBrackets(this.currentToken)) {
      this.next();

      const registerStatementMultiple = new RegisterStatementMultiple(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = registerStatementMultiple.exec();
    } else {
      const registerDeclaration = new RegisterDeclaration(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = registerDeclaration.exec();

      const registerList1 = new RegisterList1(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = registerList1.exec();
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return [
      '}'
    ].concat(VarDeclaration.getSetFirst());
  }

  static isOnSetFirst(token) {
    return VarList1.getSetFirst().includes(token.lexema);
  }
}

module.exports = RegisterList1;