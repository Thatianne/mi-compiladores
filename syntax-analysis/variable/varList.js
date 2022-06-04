const BaseClass = require('../baseClass');
const VarDeclaration = require('./varDeclaration');
const VarList1 = require('./varList1');

class VarList extends BaseClass {
  exec() {
    if (this.isDelimiter(this.currentToken) && this.currentToken.lexema === '}') {
      this.next();

      return this.currentIndex;
    } else { // TODO o else deve ser pro erro
      const varDeclaration = new VarDeclaration(this.tokens, this.currentIndex);
      this.currentIndex = varDeclaration.exec();

      const varList1 = new VarList1(this.tokens, this.currentIndex);
      this.currentIndex = varList1.exec();

      return this.currentIndex;
    }

    // TODO else
  }
}

module.exports = VarList;