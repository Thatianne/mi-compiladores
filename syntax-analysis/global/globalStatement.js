const BaseClass = require('../baseClass');
const VarStatement = require('../variable/varStatement');

//<GlobalStatement> ::= <VarStatement> <ConstStatement> <RegisterStatement><ProcedureStatement><FunctionStatement> <Main>
class GlobalStatement extends BaseClass {
  exec() {
    const varStatement = new VarStatement(this.tokens, this.currentIndex, this.errors);
    this.currentIndex = varStatement.exec();
    // TODO const

    return this.currentIndex;
  }

  static getSetFirst() {
    return VarStatement.getSetFirst();
  }

  static isOnSetFirst(token) {
    return VarStatement.isOnSetFirst(token);
  }
}

module.exports = GlobalStatement;