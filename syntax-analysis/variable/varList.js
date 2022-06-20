const BaseClass = require('../baseClass');
const VarDeclaration = require('./varDeclaration');
const VarList1 = require('./varList1');
const ReservedWordNotFound = require('../errors/reservedWordNotFound');
const DelimiterNotFound = require('../errors/delimiterNotFound');

// <VarList>::= <VarDeclaration> <VarList1>
// | '}'

class VarList extends BaseClass {
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
}

module.exports = VarList;