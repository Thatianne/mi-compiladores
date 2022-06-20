const BaseClass = require('../baseClass');
const VarDeclaration = require('./varDeclaration');
const DelimiterNotFound = require('../errors/delimiterNotFound');

// <VarList1> ::= <VarDeclaration> <VarList1>
// | '}'

class VarList1 extends BaseClass {
  exec() {
    if (this.isCloseCurlyBrackets(this.currentToken)) {
      this.next();
    } else {
      const varDeclaration = new VarDeclaration(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = varDeclaration.exec();

      const varList1 = new VarList1(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = varList1.exec();
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return [
      '}'
    ].concat(VarDeclaration.getSetFirst());
  }

  static isOnSetFirst(token) {
    return VarList1.getSetFirst().includes(token);
  }
}

module.exports = VarList1;