const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const ReservedWordNotFound = require('../errors/reservedWordNotFound');
const TokenHelper = require('../tokenHelper');

// <ElseDecs>::= 'else' '{' <LocalCommands> '}' |
class ElseDecs extends BaseClass {
  exec() {
    let [foundElse, endedTokens] = this.nextUntilElse();
    let useEmptyProduction = false;

    const LocalCommands = require('../localStatement/localCommands');

    if (foundElse) {
      endedTokens = this.next();
    } else {
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
        const localCommands = new LocalCommands(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = localCommands.exec();

        if (TokenHelper.isCloseCurlyBrackets(this.currentToken)) {
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
    return TokenHelper.isReservedWord(token) && token.lexema === 'else';
  }

  nextUntilElse() {
    const LocalCommands = require('../localStatement/localCommands');

    return this.nextUntil(this.isElseReservedWord, [
      LocalCommands.isOnSetFirst,
      TokenHelper.isOpenCurlyBrackets,
      TokenHelper.isCloseCurlyBrackets,
    ]);
  }

  nextUntilOpenCurlyBrackets() {
    return this.nextUntil(TokenHelper.isOpenCurlyBrackets, [TokenHelper.isCloseCurlyBrackets]);
  }
}

module.exports = ElseDecs;