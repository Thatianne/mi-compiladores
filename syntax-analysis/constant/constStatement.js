const BaseClass = require('../baseClass');
const ConstList = require('./constList');
const ReservedWordNotFound = require('../errors/reservedWordNotFound');
const DelimiterNotFound = require('../errors/delimiterNotFound');

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
      this.isConstReservedWord, [
        this.isOpenCurlyBrackets,
        ConstList.isOnSetFirst
    ]);
  }

  nextUntilOpenCurlyBrackets() {
    return this.nextUntil(
      this.isOpenCurlyBrackets, [
        ConstList.isOnSetFirst
    ]);
  }

  static getSetFirst() {
    return [
      'const'
    ];
  }

  static isOnSetFirst(token) {
    return ConstStatement.getSetFirst().includes(token);
  }
}

module.exports = ConstStatement;