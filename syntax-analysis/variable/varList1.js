const BaseClass = require('../baseClass');
const VarDeclaration = require('./varDeclaration');

class VarList1 extends BaseClass {
  exec() {
    if (this.isDelimiter(this.currentToken) && this.currentToken.lexema === '}') {
      this.next();

      return this.currentIndex;
    } else { // qual condicao colocar? o else precisa ser pro erro
      const varDeclaration = new VarDeclaration(this.tokens, this.currentIndex);
      this.currentIndex = varDeclaration.exec();

      const varList1 = new VarList1(this.tokens, this.currentIndex);
      this.currentIndex = varList1.exec();

      return this.currentIndex;
    }
  }
}

module.exports = VarList1;