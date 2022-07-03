const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');

// <ProcedureStatement1> ::= '}' <ProcedureStatement>
class ProcedureStatement1 extends BaseClass {
  exec() {
    let [foundCloseCurlyBrackets, endedTokens] = this.nextUntilCloseCurlyBrackets();

    if (foundCloseCurlyBrackets) {
      endedTokens = this.next();
    } else {
      this.addError(new DelimiterNotFound('}', this.currentIndex, this.currentToken));
    }

    if (!endedTokens) {
      const ProcedureStatement = require('./procedureStatement');
      const procedureStatement = new ProcedureStatement(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = procedureStatement.exec();
    }

    return this.currentIndex;
  }

  nextUntilCloseCurlyBrackets() {
    const ProcedureStatement = require('./procedureStatement');
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