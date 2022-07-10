const BaseClass = require('../baseClass');
const VarDeclaration = require('./varDeclaration');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const TokenHelper = require('../tokenHelper');

// <VarList1> ::= <VarDeclaration> <VarList1> | '}'
class VarList1 extends BaseClass {
  exec() {
    if (TokenHelper.isCloseCurlyBrackets(this.currentToken)) {
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
      TokenHelper.isCloseCurlyBrackets
    ].concat(VarDeclaration.getSetFirst());
  }

  static isOnSetFirst(token) {
    return VarList1.getSetFirst().includes(token.lexema);
  }
}

module.exports = VarList1;