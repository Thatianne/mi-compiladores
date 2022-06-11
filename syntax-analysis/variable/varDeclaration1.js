const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const IdentifierNotFound = require('../errors/identifierNotFound');


class VarDeclaration1 extends BaseClass {
  exec() {
    if (!this.isSemicolon(this.currentToken) && !this.isComma(this.currentToken)) {
      // TODO ver qual caminho pode ter melhor match
      this.next();


    }
    // semicolon - caminho var list 1 (pr é recursivo)

    // comma -


    if (this.isSemicolon(this.currentToken)) {
      this.next();
    } else if (this.isComma(this.currentToken)) {
      this.next();

      if (this.isIdentifier(this.currentToken)) {
        this.next();
      } else {
        this.addError(new IdentifierNotFound(this.currentIndex, this.currentToken));
      }

      const varDeclaration1 = new VarDeclaration1(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = varDeclaration1.exec();

    } else {
      this.addError(new DelimiterNotFound('; or ,', this.currentIndex, this.currentToken));
    }

    return this.currentIndex;
  }
}

module.exports = VarDeclaration1;