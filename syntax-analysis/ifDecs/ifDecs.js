const BaseClass = require('../baseClass');
const ElseDecs = require('./elseDecs');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const ReservedWordNotFound = require('../errors/reservedWordNotFound');
const AssignExpr = require('../assignExpr/assignExpr');

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
        // TODO executar AssignExpr
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
            // TODO executar LocalCommands

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
    return ['if'];
  }

  static isOnSetFirst(token) {
    return IfDecs.getSetFirst().includes(token.lexema);
  }

  isIfReservedWord(token) {
    return this.isReservedWord(token) && token.lexema === 'if';
  }

  nextUntilIf() {
    return this.nextUntil(this.isIfReservedWord, [
      this.isOpenBrackets,
      // AssignExpr.isOnSetFirst,
      this.isCloseBrackets,
      this.isOpenCurlyBrackets,
      this.isCloseCurlyBrackets,
      ElseDecs.isOnSetFirst
    ]);
  }

  nextUntilOpenBrackets() {
    return this.nextUntil(this.isOpenBrackets, [
      // AssignExpr.isOnSetFirst,
      this.isCloseBrackets,
      this.isOpenCurlyBrackets,
      this.isCloseCurlyBrackets,
      ElseDecs.isOnSetFirst
    ]);
  }

  nextUntilCloseBrackets() {
    return this.nextUntil(this.isCloseBrackets, [
      this.isOpenCurlyBrackets,
      this.isCloseCurlyBrackets,
      ElseDecs.isOnSetFirst
    ]);
  }

  nextUntilOpenCurlyBrackets() {
    return this.nextUntil(this.isOpenCurlyBrackets, [
      this.isCloseCurlyBrackets,
      ElseDecs.isOnSetFirst
    ]);
  }

  nextUntilCloseCurlyBrackets() {
    return this.nextUntil(this.isCloseCurlyBrackets, [
      ElseDecs.isOnSetFirst
    ]);
  }
}

module.exports = IfDecs;