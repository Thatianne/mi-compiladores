const BaseClass = require('../baseClass');
const VarDeclaration = require('./varDeclaration');
const VarList1 = require('./varList1');
const ReservedWordNotFound = require('../errors/reservedWordNotFound');
const DelimiterNotFound = require('../errors/delimiterNotFound');

class VarList extends BaseClass {
  exec() {
    if (this.isCloseCurlyBrackets(this.currentToken)) {
      this.next();
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
}

module.exports = VarList;