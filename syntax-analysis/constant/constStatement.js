const BaseClass = require('../baseClass');
const ConstList = require('./constList');
const ReservedWordNotFound = require('../errors/reservedWordNotFound');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const TokenHelper = require('../tokenHelper');

// <ConstStatement>::= 'const' '{' <ConstList>
class ConstStatement extends BaseClass {
  exec() {
    let [foundConst, endedTokens] = this.nextUntilConstReservedWord();
    if (foundConst) {
      this.next();
    } else {
      this.addError(new ReservedWordNotFound('const', this.currentIndex, this.currentToken));
    }

    if (!endedTokens) {
      let [foundOpenCurlyBrackets, endedTokens] = this.nextUntilOpenCurlyBrackets();
      if (foundOpenCurlyBrackets) {
        this.next();
      } else {
        this.addError(new DelimiterNotFound('{', this.currentIndex, this.currentToken));
      }

      if (!endedTokens) {
        const constList = new ConstList(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = constList.exec();
      }
    }

    return this.currentIndex;
  }

  nextUntilConstReservedWord() {
    return this.nextUntil(
      TokenHelper.isConstReservedWord, [
        TokenHelper.isOpenCurlyBrackets,
        ConstList.isOnSetFirst
    ]);
  }

  nextUntilOpenCurlyBrackets() {
    return this.nextUntil(
      TokenHelper.isOpenCurlyBrackets, [
        ConstList.isOnSetFirst
    ]);
  }

  static getSetFirst() {
    return [TokenHelper.isConstReservedWord]
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, ConstStatement.getSetFirst());
  }
}

module.exports = ConstStatement;