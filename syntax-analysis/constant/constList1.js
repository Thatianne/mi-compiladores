const BaseClass = require('../baseClass');
const ConstDeclaration = require('./constDeclaration');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const TokenHelper = require('../tokenHelper');

// <ConstList1> ::= <ConstDeclaration> <ConstList1> | '}'
class ConstList1 extends BaseClass {
  exec() {
    if (TokenHelper.isCloseCurlyBrackets(this.currentToken)) {
      this.next();
    } else {
      const constDeclaration = new ConstDeclaration(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = constDeclaration.exec();

      const constList1 = new ConstList1(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = constList1.exec();
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return [TokenHelper.isCloseCurlyBrackets].concat(ConstDeclaration.getSetFirst())
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, ConstList1.getSetFirst());
  }
}

module.exports = ConstList1;