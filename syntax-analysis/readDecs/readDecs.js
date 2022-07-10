const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const ReservedWordNotFound = require('../errors/reservedWordNotFound');
const TokenHelper = require('../tokenHelper');
const ArgumentsRead = require('./argumentsRead');

// <ReadDecs> ::= 'read' '(' <ArgumentsRead>
class ReadDecs extends BaseClass {
  exec() {
    if (this.currentToken) {
      let [foundWrite, endedTokens] = this.nextUntilRead();

      if (foundWrite) {
        this.next();
      } else {
        this.addError(new ReservedWordNotFound('read', this.currentIndex, this.currentToken));
      }

      if (!endedTokens) {
        let [foundOpenBrackets, endedTokens] = this.nextUntilOpenBrackets();

        if (foundOpenBrackets) {
          this.next();
        } else {
          this.addError(new DelimiterNotFound('(', this.currentIndex, this.currentToken));
        }

        if (!endedTokens) {
          const argumentsRead = new ArgumentsRead(this.tokens, this.currentIndex, this.errors);
          this.currentIndex = argumentsRead.exec();
        }
      }
    }

    return this.currentIndex;
  }

  nextUntilRead() {
    return this.nextUntil(TokenHelper.isReadReservedWord, [TokenHelper.isOpenBrackets, ArgumentsRead.isOnSetFirst])
  }

  nextUntilOpenBrackets() {
    return this.nextUntil(TokenHelper.isOpenBrackets, [ArgumentsRead.isOnSetFirst])
  }

  static getSetFirst() {
    return [TokenHelper.isReadReservedWord];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, ReadDecs.getSetFirst());
  }
}

module.exports = ReadDecs;