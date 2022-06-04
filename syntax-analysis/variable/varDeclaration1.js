const BaseClass = require('../baseClass');

class VarDeclaration1 extends BaseClass {
  exec() {
    if (this.isDelimiter(this.currentToken) && this.currentToken.lexema === ',') {
      this.next();

      if (this.isIdentifier(this.currentToken)) {
        this.next();

        const varDeclaration1 = new VarDeclaration1(this.tokens, this.currentIndex);
        this.currentIndex = varDeclaration1.exec();

        return this.currentIndex;
      } else {
        // TODO throw error
      }
    } else if (this.isDelimiter(this.currentToken) && this.currentToken.lexema === ';') {
      this.next();

      return this.currentIndex;
    } else {
      // console.log('error aqui')
      // TODO throw error
    }
  }
}

module.exports = VarDeclaration1;