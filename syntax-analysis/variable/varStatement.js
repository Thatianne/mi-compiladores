const BaseClass = require('../baseClass');
const VarList = require('./varList');
const ReservedWordNotFound = require('../errors/reservedWordNotFound');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const TokenHelper = require('../tokenHelper');

// <VarStatement>::= 'var' '{' <VarList>
class VarStatement extends BaseClass {
  exec() {
    let [foundVar, endedTokens] = this.nextUntilVarReservedWord();
    if (foundVar) {
      this.next();
    } else {
      this.addError(new ReservedWordNotFound('var', this.currentIndex, this.currentToken));
    }

    if (!endedTokens) {
      let [foundOpenCurlyBrackets, endedTokens] = this.nextUntilOpenCurlyBrackets();
      if (foundOpenCurlyBrackets) {
        this.next();
      } else {
        this.addError(new DelimiterNotFound('{', this.currentIndex, this.currentToken));
      }

      if (!endedTokens) {
        const varList = new VarList(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = varList.exec();
      }
    }

    return this.currentIndex;
  }

  nextUntilVarReservedWord() {
    return this.nextUntil(
      TokenHelper.isVarReservedWord, [
        TokenHelper.isOpenCurlyBrackets,
        TokenHelper.isCloseCurlyBrackets,
        VarList.isOnSetFirst
    ]);
  }

  nextUntilOpenCurlyBrackets() {
    return this.nextUntil(
      TokenHelper.isOpenCurlyBrackets, [
        TokenHelper.isCloseCurlyBrackets,
        VarList.isOnSetFirst
    ]);
  }

  static getSetFirst() {
    return [
      'var'
    ];
  }

  static isOnSetFirst(token) {
    return VarStatement.getSetFirst().includes(token.lexema);
  }
}

module.exports = VarStatement;