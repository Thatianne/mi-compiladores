const BaseClass = require('./baseClass');
const GlobalStatement = require('./global/globalStatement');
const ReservedWordNotFound = require('./errors/reservedWordNotFound');
const IdentifierNotFound = require('./errors/identifierNotFound');
const DelimiterNotFound = require('./errors/delimiterNotFound');
const UnexpectedToken = require('./errors/unexpectedToken');

const PROGRAM = 'program';

// <Start> ::= 'program' Identifier ';' <GlobalStatement>
class Start extends BaseClass {
  exec() {
    const foundProgram = this.nextUntilProgramReservedWord();

    if (foundProgram) {
      this.next();
    } else {
      this.addError(new ReservedWordNotFound(PROGRAM, this.currentIndex, this.currentToken));
    }

    const foundIdentifier = this.nextUntilIdentifier();
    if (foundIdentifier) {
      this.next();
    } else {
      this.addError(new IdentifierNotFound(this.currentIndex, this.currentToken));

    }

    const foundSemicolon = this.nextUntilSemicolon();
    if (foundSemicolon) {
      this.next();
    } else {
      this.addError(new DelimiterNotFound(';', this.currentIndex, this.currentToken));
    }

    const globalStatement = new GlobalStatement(this.tokens, this.currentIndex, this.errors);
    if(this.currentToken && (foundSemicolon || this.changedLine() || globalStatement.isOnSetFirst())) {
      this.currentIndex = globalStatement.exec();
    }

    return this.currentIndex;
  }

  isProgramReservedWord(token) {
    return this.isReservedWord(token) && token.lexema === PROGRAM;
  }

  nextUntil(funcSearchUntil, funcsStopSearch) {
    while(funcSearchUntil(this.currentToken)) {
      if (funcsStopSearch.some((func) => func.call(this, this.currentToken))) {
        return false;
      } else {
        this.addError(new UnexpectedToken(this.currentIndex, this.currentToken));
        this.next();
      }
    }

    return true;
  }

  nextUntilProgramReservedWord() {
    return this.nextUntil(
      (token) => !this.isProgramReservedWord(token),
      [
        this.isIdentifier,
        this.isSemicolon,
        this.isOnSetFirst,
      ]
    );
  }

  nextUntilIdentifier() {
    return this.nextUntil(
      (token) => !this.isIdentifier(token),
      [
        this.isSemicolon,
        this.isOnSetFirst,
      ]
    );
  }

  nextUntilSemicolon() {
    return this.nextUntil(
      (token) => !this.isSemicolon(token),
      [
        this.isOnSetFirst,
      ]
    );
  }
}

module.exports = Start;