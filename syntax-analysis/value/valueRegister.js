const BaseClass = require('../baseClass');
const TokenHelper = require('../tokenHelper');

// <ValueRegister> ::= '.' Identifier |
class ValueRegister extends BaseClass {
  exec() {
    // TODO ver se o proximo token faz parte do conjunto primeiro do constDeclaration1, se sim, seguir o q hj é o else
    if (TokenHelper.isDot(this.currentToken)) {
      this.next();

      if (TokenHelper.isIdentifier(this.currentToken)) {
        this.next();
      }
    } else {
      this.next();
    }

    return this.currentIndex;
  }
}

module.exports = ValueRegister