const BaseClass = require('./baseClass');
const GlobalStatement = require('./global/globalStatement');
const ReservedWordNotFound = require('./errors/reservedWordNotFound');
const IdentifierNotFound = require('./errors/identifierNotFound');
const DelimiterNotFound = require('./errors/delimiterNotFound');
const TokenHelper = require('./tokenHelper');

const PROGRAM = 'program';

// <Start> ::= 'program' Identifier ';' <GlobalStatement>
class Start extends BaseClass {
  exec() {
    let [foundProgram, endedTokens] = this.nextUntilProgramReservedWord();

    if (foundProgram) {
      this.next();
    } else {
      this.addError(new ReservedWordNotFound(PROGRAM, this.currentIndex, this.currentToken));
    }

    if (!endedTokens) {
      let [foundIdentifier, endedTokens] = this.nextUntilIdentifier();
      if (foundIdentifier) {
        this.next();
      } else {
        this.addError(new IdentifierNotFound(this.currentIndex, this.currentToken));
      }

      if (!endedTokens) {
        let [foundSemicolon, endedTokens] = this.nextUntilSemicolon();
        if (foundSemicolon) {
          this.next();
        } else {
          this.addError(new DelimiterNotFound(';', this.currentIndex, this.currentToken));
        }

        if(!endedTokens && (foundSemicolon || this.changedLine() || GlobalStatement.isOnSetFirst(this.currentToken))) {
          const globalStatement = new GlobalStatement(this.tokens, this.currentIndex, this.errors);
          this.currentIndex = globalStatement.exec();
        }
      }
    }

    return this.currentIndex;
  }

  isProgramReservedWord(token) {
    return TokenHelper.isReservedWord(token) && token.lexema === PROGRAM;
  }

  nextUntilProgramReservedWord() {
    return this.nextUntil(
      this.isProgramReservedWord, [
        TokenHelper.isIdentifier,
        TokenHelper.isSemicolon,
        GlobalStatement.isOnSetFirst,
    ]);
  }

  nextUntilIdentifier() {
    return this.nextUntil(
      TokenHelper.isIdentifier, [
        TokenHelper.isSemicolon,
        GlobalStatement.isOnSetFirst,
    ]);
  }

  nextUntilSemicolon() {
    return this.nextUntil(
      TokenHelper.isSemicolon, [
        GlobalStatement.isOnSetFirst,
    ]);
  }
}

module.exports = Start;