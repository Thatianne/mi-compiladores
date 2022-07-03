const BaseClass = require('../baseClass');
const LocalCommands = require('./localCommands');

// <LocalStatement> ::= <VarStatement> <LocalCommands>
class LocalStatement extends BaseClass {
  exec() {
    // TODO adicionar VarStatement

    const localCommands = new LocalCommands(this.tokens, this.currentIndex, this.errors);
    this.currentIndex = localCommands.exec();

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