const BaseClass = require('./baseClass');
const GlobalStatement = require('./global/globalStatement');
const ReservedWordNotFound = require('./errors/reservedWordNotFound');
const IdentifierNotFound = require('./errors/identifierNotFound');
const DelimiterNotFound = require('./errors/delimiterNotFound');
const UnexpectedToken = require('./errors/unexpectedToken');

const PROGRAM = 'program';

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

    const foundSyncToken = this.nextUntilSyncToken();
    if(foundSyncToken) {
      const globalStatement = new GlobalStatement(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = globalStatement.exec();
    }

    return this.currentIndex;
  }

  isProgramReservedWord(token) {
    return this.isReservedWord(token) && token.lexema === PROGRAM;
  }

  nextUntilProgramReservedWord() {
    while(!this.isProgramReservedWord(this.currentToken)) {
      if (
        this.isIdentifier(this.currentToken) ||
        this.isSemicolon(this.currentToken) ||
        this.isSyncToken(this.currentToken)
      ) {
        return false;
      } else {
        this.addError(new UnexpectedToken(this.currentIndex, this.currentToken));
        this.next();
      }
    }

    return true;
  }

  nextUntilIdentifier() {
    while(!this.isIdentifier(this.currentToken)) {
      if (
        this.isSemicolon(this.currentToken) ||
        this.isSyncToken(this.currentToken)
      ) {
        return false;
      } else {
        this.addError(new UnexpectedToken(this.currentIndex, this.currentToken));
        this.next();
      }
    }

    return true;
  }

  nextUntilSemicolon() {
    while(!this.isSemicolon(this.currentToken)) {
      if (this.isSyncToken(this.currentToken)) {
        return false;
      } else {
        this.addError(new UnexpectedToken(this.currentIndex, this.currentToken));
        this.next();
      }
    }

    return true;
  }

  nextUntilSyncToken() {
    while(!this.isSyncToken(this.currentToken)) {
      if (this.currentToken) {
        this.addError(new UnexpectedToken(this.currentIndex, this.currentToken));
        this.next();
      } else { // não tem mais para ler
        return false;
      }
    }

    return true;
  }

  isSyncToken(token) {
    return token ? this.getSyncTokens().includes(token.lexema) : false;
  }

  getSyncTokens() {
    return [
      'var'
    ]
  }
}

module.exports = Start;