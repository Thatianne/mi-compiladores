const BaseClass = require('../baseClass');
const ConstDeclaration = require('./constDeclaration');
const DelimiterNotFound = require('../errors/delimiterNotFound');

/*
<ConstList1> ::= <ConstDeclaration> <ConstList1>
              | '}'
*/
class ConstList1 extends BaseClass {
  exec() {
    if (this.isCloseCurlyBrackets(this.currentToken)) {
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
    return [
      '}'
    ].concat(ConstDeclaration.getSetFirst());
  }

  static isOnSetFirst(token) {
    return ConstList1.getSetFirst().includes(token.lexema);
  }
}

module.exports = ConstList1;