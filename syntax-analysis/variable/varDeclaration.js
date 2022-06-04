const BaseClass = require('../baseClass');
const VarType = require('./varType');
const VarDeclaration1 = require('./varDeclaration1');

class VarDeclaration extends BaseClass {
  exec() {
    const varType = new VarType(this.tokens, this.currentIndex);
    this.currentIndex = varType.exec(); // TODO try-catch

    if (this.isIdentifier(this.currentToken)) {
      this.next();

      const varDeclaration1 = new VarDeclaration1(this.tokens, this.currentIndex);
      this.currentIndex = varDeclaration1.exec(); // TODO try-catch
      return this.currentIndex;
    } else {
      // TODO throw error
    }

    //TODO criar tratamento geral de erro
  }
}

module.exports = VarDeclaration;