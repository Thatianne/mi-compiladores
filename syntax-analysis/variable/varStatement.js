const BaseClass = require('../baseClass');
const VarList = require('./varList');
const ReservedWordNotFound = require('../errors/reservedWordNotFound');
const DelimiterNotFound = require('../errors/delimiterNotFound');

class VarStatement extends BaseClass {
  exec() {
    const foundVar = this.nextUntilVarReservedWord();
    if (foundVar) {
      this.next();
    } else {
      this.addError(new ReservedWordNotFound('var', this.currentIndex, this.currentToken));
    }

    const foundOpenCurlyBrackets = this.nextUntilOpenCurlyBrackets();
    if (foundOpenCurlyBrackets) {
      this.next();
    } else {
      this.addError(new DelimiterNotFound('{', this.currentIndex, this.currentToken));
    }

    const varList = new VarList(this.tokens, this.currentIndex, this.errors);
    this.currentIndex = varList.exec();

    return this.currentIndex;
  }

  nextUntilVarReservedWord() {
    while(!this.isVarReservedWord(this.currentToken)) {
      if (
        this.isOpenCurlyBrackets(this.currentToken) ||
        this.isSyncToken(this.currentToken)
      ) {
        return false;
      } else {
        this.addError(new UnexpectedToken(this.currentIndex, this.currentToken));
        this.next();
      }
    }

    return true;
  }

  nextUntilOpenCurlyBrackets() {
    while(!this.isOpenCurlyBrackets(this.currentToken)) {
      if (this.isSyncToken(this.currentToken)) {
        return false;
      } else {
        this.addError(new UnexpectedToken(this.currentIndex, this.currentToken));
        this.next();
      }
    }

    return true;
  }

  getSyncTokens() {
    return [
      '{'
    ]
  }
}

module.exports = VarStatement;