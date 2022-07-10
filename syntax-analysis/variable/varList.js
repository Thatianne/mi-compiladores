const BaseClass = require('../baseClass');
const VarDeclaration = require('./varDeclaration');
const VarList1 = require('./varList1');
const ReservedWordNotFound = require('../errors/reservedWordNotFound');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const TokenHelper = require('../tokenHelper');

// <VarList>::= <VarDeclaration> <VarList1> | '}'
class VarList extends BaseClass {
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
    return VarDeclaration.getSetFirst;
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, VarList.getSetFirst());
  }
}

module.exports = VarList;