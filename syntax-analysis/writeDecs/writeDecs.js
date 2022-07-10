const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const ReservedWordNotFound = require('../errors/reservedWordNotFound');
const TokenHelper = require('../tokenHelper');
const ArgumentsWrite = require('./argumentsWrite');

// <WriteDecs> ::= 'write' '(' <ArgumentsWrite>
class WriteDecs extends BaseClass {
  exec() {
    if (this.currentToken) {
      let [foundWrite, endedTokens] = this.nextUntilWrite();

      if (foundWrite) {
        this.next();
      } else {
        this.addError(new ReservedWordNotFound('write', this.currentIndex, this.currentToken));
      }

      if (!endedTokens) {
        let [foundOpenBrackets, endedTokens] = this.nextUntilOpenBrackets();

        if (foundOpenBrackets) {
          this.next();
        } else {
          this.addError(new DelimiterNotFound('(', this.currentIndex, this.currentToken));
        }

        if (!endedTokens) {
          const argumentsWrite = new ArgumentsWrite(this.tokens, this.currentIndex, this.errors);
          this.currentIndex = argumentsWrite.exec();
        }
      }
    }

    return this.currentIndex;
  }

  nextUntilWrite() {
    return this.nextUntil(TokenHelper.isWriteReservedWord, [TokenHelper.isOpenBrackets, ArgumentsWrite.isOnSetFirst])
  }

  nextUntilOpenBrackets() {
    return this.nextUntil(TokenHelper.isOpenBrackets, [ArgumentsWrite.isOnSetFirst])
  }

  static getSetFirst() {
    return [TokenHelper.isWriteReservedWord];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, WriteDecs.getSetFirst());
  }
}

module.exports = WriteDecs;