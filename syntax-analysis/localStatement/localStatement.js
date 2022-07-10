const BaseClass = require('../baseClass');
const VarStatement = require('../variable/varStatement');
const LocalCommands = require('./localCommands');

// <LocalStatement> ::= <VarStatement> <LocalCommands>
class LocalStatement extends BaseClass {
  exec() {
    if (this.currentToken) {
      const varStatement = new VarStatement(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = varStatement.exec();
    }

    if (this.currentToken) {
      const localCommands = new LocalCommands(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = localCommands.exec();
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return [];
  }

  static isOnSetFirst(token) {
    return LocalStatement.getSetFirst().includes(token.lexema);
  }
}

module.exports = LocalStatement;