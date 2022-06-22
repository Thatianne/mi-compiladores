const BaseClass = require('../baseClass');
const RegisterDeclaration = require('./registerDeclaration');
const RegisterList1 = require('./registerList1');
const ReservedWordNotFound = require('../errors/reservedWordNotFound');
const DelimiterNotFound = require('../errors/delimiterNotFound');

// <RegisterList> ::= <RegisterDeclaration> <RegisterList1>
class RegisterList extends BaseClass {
  exec() {

    const registerDeclaration = new RegisterDeclaration(this.tokens, this.currentIndex, this.errors);
    this.currentIndex = registerDeclaration.exec();

    const registerList1 = new RegisterList1(this.tokens, this.currentIndex, this.errors);
    this.currentIndex = registerList1.exec();

    return this.currentIndex;
  }
}

module.exports = RegisterList;