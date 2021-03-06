const BaseClass = require('../baseClass');
const ElseDecs = require('./elseDecs');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const ReservedWordNotFound = require('../errors/reservedWordNotFound');
const AssignExpr = require('../assignExpr/assignExpr');
const TokenHelper = require('../tokenHelper');

// <IfDecs> ::= 'if' '(' <AssignExpr> ')' '{' <LocalCommands> '}' <ElseDecs>
class IfDecs extends BaseClass {
  exec() {
    let [foundIf, endedTokens] = this.nextUntilIf();

    if (foundIf) {
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

            const elseDecs = new ElseDecs(this.tokens, this.currentIndex, this.errors);
            this.currentIndex = elseDecs.exec();
          }
        }
      }
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return [TokenHelper.isIfReservedWord];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, IfDecs.getSetFirst());
  }

  nextUntilIf() {
    return this.nextUntil(TokenHelper.isIfReservedWord, [
      TokenHelper.isOpenBrackets,
      // AssignExpr.isOnSetFirst,
      TokenHelper.isCloseBrackets,
      TokenHelper.isOpenCurlyBrackets,
      TokenHelper.isCloseCurlyBrackets,
      ElseDecs.isOnSetFirst
    ]);
  }

  nextUntilOpenBrackets() {
    return this.nextUntil(TokenHelper.isOpenBrackets, [
      // AssignExpr.isOnSetFirst,
      TokenHelper.isCloseBrackets,
      TokenHelper.isOpenCurlyBrackets,
      TokenHelper.isCloseCurlyBrackets,
      ElseDecs.isOnSetFirst
    ]);
  }

  nextUntilCloseBrackets() {
    return this.nextUntil(TokenHelper.isCloseBrackets, [
      TokenHelper.isOpenCurlyBrackets,
      TokenHelper.isCloseCurlyBrackets,
      ElseDecs.isOnSetFirst
    ]);
  }

  nextUntilOpenCurlyBrackets() {
    return this.nextUntil(TokenHelper.isOpenCurlyBrackets, [
      TokenHelper.isCloseCurlyBrackets,
      ElseDecs.isOnSetFirst
    ]);
  }

  nextUntilCloseCurlyBrackets() {
    return this.nextUntil(TokenHelper.isCloseCurlyBrackets, [
      ElseDecs.isOnSetFirst
    ]);
  }
}

module.exports = IfDecs;