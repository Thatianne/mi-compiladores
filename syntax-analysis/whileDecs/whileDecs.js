const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const ReservedWordNotFound = require('../errors/reservedWordNotFound');
const AssignExpr = require('../assignExpr/assignExpr');
const TokenHelper = require('../tokenHelper');

// <WhileDecs>::= 'while' '('<AssignExpr>')' '{' <LocalCommands> '}'
class WhileDecs extends BaseClass {
  exec() {
    let [foundWhile, endedTokens] = this.nextUntilWhile();

    if (foundWhile) {
      endedTokens = this.next();
    } else {
      this.addError(new ReservedWordNotFound('if', this.currentIndex, this.currentToken));
    }

    if (!endedTokens) {
      let [foundOpenBrackets, endedTokens] = this.nextUntilOpenBrackets();

      if (foundOpenBrackets) {
        endedTokens = this.next();
      } else {
        this.addError(new DelimiterNotFound('(', this.currentIndex, this.currentToken));
      }

      if (!endedTokens) {
        const assignExpr = new AssignExpr(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = assignExpr.exec();

        let [foundCloseBrackets, endedTokens] = this.nextUntilCloseBrackets();

        if (foundCloseBrackets) {
          endedTokens = this.next();
        } else {
          this.addError(new DelimiterNotFound(')', this.currentIndex, this.currentToken));
        }

        if (!endedTokens) {
          let [foundOpenCurlyBrackets, endedTokens] = this.nextUntilOpenCurlyBrackets();

          if (foundOpenCurlyBrackets) {
            endedTokens = this.next();
          } else {
            this.addError(new DelimiterNotFound('{', this.currentIndex, this.currentToken));
          }

          if (!endedTokens) {
            const LocalCommands = require('../localStatement/localCommands');
            const localCommands = new LocalCommands(this.tokens, this.currentIndex, this.errors);
            this.currentIndex = localCommands.exec();

            let [foundCloseCurlyBrackets, endedTokens] = this.nextUntilCloseCurlyBrackets();

            if (foundCloseCurlyBrackets) {
              endedTokens = this.next();
            } else {
              this.addError(new DelimiterNotFound('}', this.currentIndex, this.currentToken));
            }
          }
        }
      }
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return ['while'];
  }

  static isOnSetFirst(token) {
    return WhileDecs.getSetFirst().includes(token.lexema);
  }

  isWhileReservedWord(token) {
    return TokenHelper.isReservedWord(token) && token.lexema === 'while';
  }

  nextUntilWhile() {
    return this.nextUntil(this.isWhileReservedWord, [
      TokenHelper.isOpenBrackets,
      AssignExpr.isOnSetFirst,
      TokenHelper.isCloseBrackets,
      TokenHelper.isOpenCurlyBrackets,
      TokenHelper.isCloseCurlyBrackets,
    ]);
  }

  nextUntilOpenBrackets() {
    return this.nextUntil(TokenHelper.isOpenBrackets, [
      AssignExpr.isOnSetFirst,
      TokenHelper.isCloseBrackets,
      TokenHelper.isOpenCurlyBrackets,
      TokenHelper.isCloseCurlyBrackets,
    ]);
  }

  nextUntilCloseBrackets() {
    return this.nextUntil(TokenHelper.isCloseBrackets, [
      TokenHelper.isOpenCurlyBrackets,
      TokenHelper.isCloseCurlyBrackets,
    ]);
  }

  nextUntilOpenCurlyBrackets() {
    return this.nextUntil(TokenHelper.isOpenCurlyBrackets, [
      TokenHelper.isCloseCurlyBrackets,
    ]);
  }

  nextUntilCloseCurlyBrackets() {
    return this.nextUntil(TokenHelper.isCloseCurlyBrackets, [
    ]);
  }
}

module.exports = WhileDecs;