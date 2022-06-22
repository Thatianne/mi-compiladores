const BaseClass = require('../baseClass');

// <ValueRegister> ::= '.' Identifier |
class ValueRegister extends BaseClass {
  exec() {
    // TODO ver se o proximo token faz parte do conjunto primeiro do constDeclaration1, se sim, seguir o q hj é o else
    if (this.isDot(this.currentToken)) {
      this.next();

      if (this.isIdentifier(this.currentToken)) {
        this.next();
      }
    } else {
      this.next();
    }

    return this.currentIndex;
  }
}

module.exports = ValueRegister