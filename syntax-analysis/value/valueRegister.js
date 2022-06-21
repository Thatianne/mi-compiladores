const BaseClass = require('../baseClass');

// <ValueRegister> ::= '.' Identifier |
class ValueRegister extends BaseClass {
  exec() {
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