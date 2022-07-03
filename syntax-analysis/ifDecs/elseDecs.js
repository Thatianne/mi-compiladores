const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const ReservedWordNotFound = require('../errors/reservedWordNotFound');

// <ElseDecs>::= 'else' '{' <LocalCommands> '}' |
class ElseDecs extends BaseClass {
  exec() {
    let [foundElse, endedTokens] = this.nextUntilElse();
    let useEmptyProduction = false;

    if (foundElse) {
      endedTokens = this.next();
    } else {
      const LocalCommands = require('../localStatement/localCommands');
      if (LocalCommands.isOnSetFirst(this.currentToken)) {
        useEmptyProduction = true;
      } else {
        this.addError(new ReservedWordNotFound('else', this.currentIndex, this.currentToken));
      }
    }

    if (!endedTokens && !useEmptyProduction) {
      let [foundOpenCurlyBrackets, endedTokens] = this.nextUntilOpenCurlyBrackets();
      if (foundOpenCurlyBrackets) {
        endedTokens = this.next();
      } else {
        this.addError(new DelimiterNotFound('{', this.currentIndex, this.currentToken));
      }

      if (!endedTokens) {
        // TODO executar LocalCommands

        if (this.isCloseCurlyBrackets(this.currentToken)) {
          endedTokens = this.next();
        } else {
          this.addError(new DelimiterNotFound('}', this.currentIndex, this.currentToken));
        }
      }
    }
    return this.currentIndex;
  }

  static getSetFirst() {
    return ['else'];
  }

  static isOnSetFirst(token) {
    return ElseDecs.getSetFirst().includes(token.lexema);
  }

  isElseReservedWord(token) {
    return this.isReservedWord(token) && token.lexema === 'else';
  }

  nextUntilElse() {
    const LocalCommands = require('../localStatement/localCommands');

    return this.nextUntil(this.isElseReservedWord, [
      LocalCommands.isOnSetFirst,
      this.isOpenCurlyBrackets,
      this.isCloseCurlyBrackets,
    ]);
  }

  nextUntilOpenCurlyBrackets() {
    return this.nextUntil(this.isOpenCurlyBrackets, [this.isCloseCurlyBrackets]);
  }
}

module.exports = ElseDecs;