const BaseClass = require('../baseClass');
const VarDeclaration = require('./varDeclaration');
const DelimiterNotFound = require('../errors/delimiterNotFound');

class VarList1 extends BaseClass {
  exec() {
    if (this.isCloseCurlyBrackets(this.currentToken)) {
      this.next();

      return this.currentIndex;
    } else {
      // const indexBeforeAlternativePath = this.currentIndex;

      const varDeclaration = new VarDeclaration(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = varDeclaration.exec();


      const varList1 = new VarList1(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = varList1.exec();


      // TODO se desceu a arvore e não mudou o currentIndex, então tem erro, deveria ter ';'
      // if(indexBeforeAlternativePath === this.currentIndex) {
      //   this.addError(new DelimiterNotFound('}', this.currentIndex, this.currentToken))
      // }
    }

    return this.currentIndex;
  }

  getFir
}

module.exports = VarList1;