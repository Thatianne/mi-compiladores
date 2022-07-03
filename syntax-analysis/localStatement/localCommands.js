const BaseClass = require('../baseClass');
const IfDecs = require('../ifDecs/ifDecs');

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
    if (IfDecs.isOnSetFirst(this.currentToken)) {
      const ifDecs = new IfDecs(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = ifDecs.exec();
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