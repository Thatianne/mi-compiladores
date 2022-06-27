const BaseClass = require('../baseClass');

// <FunctionStatement1>::= '}' <FunctionStatement>
class ProcedureStatement1 extends BaseClass {
  exec() {
    let [foundCloseCurlyBrackets, endedTokens] = this.nextUntilCloseCurlyBrackets();

    if (foundCloseCurlyBrackets) {
      this.next();
    } else {
      this.addError(new DelimiterNotFound('}', this.currentIndex, this.currentToken));
    }

    if (!endedTokens) {
      const ProcedureStatement = require('./functionStatement');
      const procedureStatement = new ProcedureStatement(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = procedureStatement.exec();
    }

    return this.currentIndex;
  }

  nextUntilCloseCurlyBrackets() {
    const ProcedureStatement = require('./functionStatement');
    return this.nextUntil(this.isCloseCurlyBrackets, [ProcedureStatement.isOnSetFirst])
  }

  static getSetFirst() {
    return ['}'];
  }

  static isOnSetFirst(token) {
    return ProcedureStatement1.getSetFirst().includes(token.lexema);
  }
}

module.exports = ProcedureStatement1;