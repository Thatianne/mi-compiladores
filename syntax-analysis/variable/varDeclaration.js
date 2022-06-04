const BaseClass = require('../baseClass');
const VarType = require('./varType');
const VarDeclaration1 = require('./varDeclaration1');
const IdentifierNotFound = require('../errors/identifierNotFound');

class VarDeclaration extends BaseClass {
  exec() {
    const varType = new VarType(this.tokens, this.currentIndex, this.errors);
    this.currentIndex = varType.exec();

    if (this.isIdentifier(this.currentToken)) {
      this.next();
    } else {
      this.addError(new IdentifierNotFound(this.currentIndex, this.currentToken));
    }

    const varDeclaration1 = new VarDeclaration1(this.tokens, this.currentIndex, this.errors);
    this.currentIndex = varDeclaration1.exec();

    return this.currentIndex;
  }
}

module.exports = VarDeclaration;