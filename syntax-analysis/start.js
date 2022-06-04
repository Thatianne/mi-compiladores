const BaseClass = require('./baseClass');
const GlobalStatement = require('./global/globalStatement');
const ReservedWordNotFound = require('./errors/reservedWordNotFound');
const IdentifierNotFound = require('./errors/identifierNotFound');
const DelimiterNotFound = require('./errors/delimiterNotFound');

const PROGRAM = 'program';

class Start extends BaseClass {
  exec() {
    if (this.isProgramReservedWord(this.currentToken)) {
      this.next();
    } else {
      this.addError( new ReservedWordNotFound(PROGRAM, this.currentIndex, this.currentToken));
    }

    if (this.isIdentifier(this.currentToken)) {
      this.next();
    } else {
      this.addError(new IdentifierNotFound(this.currentIndex, this.currentToken));
    }

    if (this.isSemicolon(this.currentToken)) {
      this.next();
    } else {
      this.addError(new DelimiterNotFound(';', this.currentIndex, this.currentToken));
    }

    const globalStatement = new GlobalStatement(this.tokens, this.currentIndex, this.errors);
    this.currentIndex = globalStatement.exec();

    return this.currentIndex;
  }

  isProgramReservedWord(token) {
    return this.isReservedWord(token) && token.lexema === PROGRAM;
  }
}

module.exports = Start;