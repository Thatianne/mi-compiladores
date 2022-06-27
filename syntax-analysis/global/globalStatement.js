const BaseClass = require('../baseClass');
const VarStatement = require('../variable/varStatement');
const ConstStatement = require('../constant/constStatement');
const RegisterStatement = require('../register/registerStatement');
const ProcedureStatement = require('../procedure/procedureStatement');
const FunctionStatement = require('../function/functionStatement');

//<GlobalStatement> ::= <VarStatement> <ConstStatement> <RegisterStatement> <ProcedureStatement> <FunctionStatement> <Main>
class GlobalStatement extends BaseClass {
  exec() {
    if (this.currentToken) {
      const varStatement = new VarStatement(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = varStatement.exec();
    }

    if (this.currentToken) {
      const constStatement = new ConstStatement(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = constStatement.exec()
    }

    if (this.currentToken) {
      const registerStatement = new RegisterStatement(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = registerStatement.exec();
    }

    if (this.currentToken) {
      const procedureStatement = new ProcedureStatement(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = procedureStatement.exec();
    }

    if (this.currentToken) {
      const functionStatement = new FunctionStatement(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = functionStatement.exec();
    }

    // TODO function

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