const BaseClass = require('../baseClass');
const VarList = require('./varList');

class VarType extends BaseClass {
  exec() {
    const types = ['integer', 'string', 'real', 'boolean', 'char'];

    if (types.includes(this.currentToken.lexema) || this.isIdentifier(this.currentToken)) {
      this.next();

      return this.currentIndex;
    } else {
      console.log('error aqui')
      // TODO throw error
    }
  }
}

module.exports = VarType;