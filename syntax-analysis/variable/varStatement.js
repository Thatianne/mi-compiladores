const BaseClass = require('../baseClass');
const VarList = require('./varList');

class VarStatement extends BaseClass {
  exec() {
    if (this.isReservedWord(this.currentToken) && this.currentToken.lexema === 'var') {
      this.next();

      if (this.isDelimiter(this.currentToken) && this.currentToken.lexema === '{') {
        this.next();

        const varList = new VarList(this.tokens, this.currentIndex);
        this.currentIndex = varList.exec();

        return this.currentIndex;
      } else {
        // TODO throw error
      }
    } else {
      // TODO throw error
    }
  }
}

module.exports = VarStatement;