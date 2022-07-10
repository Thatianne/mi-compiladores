const BaseClass = require('../baseClass');
const IfDecs = require('../ifDecs/ifDecs');
const WriteDecs = require('../writeDecs/writeDecs');

/*
<LocalCommands> ::= <IfDecs> <LocalCommands>
                  | <WriteDecs> <LocalCommands>
                  | <ReadDecs> <LocalCommands>
                  | <WhileDecs> <LocalCommands>
                  | <Assigment> <LocalCommands>
                  | <FunctionCall> <LocalCommands>
                  | <ProcedureCall> <LocalCommands>
                  |
*/
class LocalCommands extends BaseClass {
  exec() {
    let useRecursiveLocalCommands = false;

    if (IfDecs.isOnSetFirst(this.currentToken)) {
      const ifDecs = new IfDecs(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = ifDecs.exec();
      useRecursiveLocalCommands = true;
    } else if (WriteDecs.isOnSetFirst(this.currentToken)){
      const writeDecs = new WriteDecs(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = writeDecs.exec();
      useRecursiveLocalCommands = true;
    }

    if (useRecursiveLocalCommands) {
      const localCommands = new LocalCommands(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = localCommands.exec();
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return IfDecs.getSetFirst().concat(['}', 'return']); // TODO ver como melhorar pra não deixar fixo, } relacionado a procedure e return pra function
  }

  static isOnSetFirst(token) {
    return LocalCommands.getSetFirst().includes(token.lexema);
  }
}

module.exports = LocalCommands;