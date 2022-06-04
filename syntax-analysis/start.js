const BaseClass = require('./baseClass');
const GlobalStatement = require('./Global/globalStatement');

class Start extends BaseClass {
  exec() {
    if (this.isReservedWord(this.currentToken) && this.currentToken.lexema === 'program') {
      this.next();

      if (this.isIdentifier(this.currentToken)) {
        this.next();

        if (this.isDelimiter(this.currentToken) && this.currentToken.lexema === ';') {
          this.next();
          const globalStatement = new GlobalStatement(this.tokens, this.currentIndex);
          this.currentIndex = globalStatement.exec();

          return this.currentIndex;
        } else {
          // TODO throw error
        }
      } else {
        // TODO throw error
      }
    } else {
      // TODO throw error
    }
  }
}

module.exports = Start;