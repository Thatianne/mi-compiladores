const BaseClass = require('../baseClass');
const TypeNotFound = require('../errors/typeNotFound');
class VarType extends BaseClass {
  exec() {
    const types = ['integer', 'string', 'real', 'boolean', 'char'];
    if (types.includes(this.currentToken.lexema) || this.isIdentifier(this.currentToken)) {
      this.next();
    } else {
      this.addError(new TypeNotFound(this.currentIndex, this.currentToken))
    }

    return this.currentIndex;
  }
}

module.exports = VarType;