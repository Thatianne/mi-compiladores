const BaseClass = require('../baseClass');
const TypeNotFound = require('../errors/typeNotFound');

/* <ConstType> ::= 'integer'
| 'string'
| 'real'
| 'boolean'
| 'char'
*/
class VarType extends BaseClass {
  exec() {
    const [foundType, endedTokens] = this.nextUntilType();
    if (foundType) {
      this.next();
    } else {
      this.addError(new TypeNotFound(this.currentIndex, this.currentToken))
    }

    return this.currentIndex;
  }

  getTypes() {
    return ['integer', 'string', 'real', 'boolean', 'char'];
  }

  nextUntilType() {
    return this.nextUntil(
      (token) => this.getTypes().includes(token.lexema), [
        this.isIdentifier
    ]);
  }
}

module.exports = VarType;