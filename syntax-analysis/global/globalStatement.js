const BaseClass = require('../baseClass');
const VarStatement = require('../variable/varStatement');
const ConstStatement = require('../constant/constStatement');

//<GlobalStatement> ::= <VarStatement> <ConstStatement> <RegisterStatement><ProcedureStatement><FunctionStatement> <Main>
class GlobalStatement extends BaseClass {
  exec() {
    const varStatement = new VarStatement(this.tokens, this.currentIndex, this.errors);
    this.currentIndex = varStatement.exec();

    const constStatement = new ConstStatement(this.tokens, this.currentIndex, this.errors);
    this.currentIndex = constStatement.exec();

    // TODO register

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