const BaseClass = require('../baseClass');
const VarList = require('./varList');
const ReservedWordNotFound = require('../errors/reservedWordNotFound');
const DelimiterNotFound = require('../errors/delimiterNotFound');

class VarStatement extends BaseClass {
  exec() {
    if (this.isVarReservedWord(this.currentToken)) {
      this.next();
    } else {
      this.addError(new ReservedWordNotFound('var', this.currentIndex, this.currentToken));
    }

    if (this.isOpenCurlyBrackets(this.currentToken)) {
      this.next();
    } else {
      this.addError(new DelimiterNotFound('{', this.currentIndex, this.currentToken));
    }

    const varList = new VarList(this.tokens, this.currentIndex, this.errors);
    this.currentIndex = varList.exec();

    return this.currentIndex;
  }
}

module.exports = VarStatement;