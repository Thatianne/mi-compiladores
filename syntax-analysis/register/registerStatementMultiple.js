const BaseClass = require('../baseClass');

// <RegisterStatementMultiple> ::= <RegisterStatement> |
class RegisterStatementMultiple extends BaseClass {
  exec() {
    if (this.currentToken) {
      if (this.currentToken.lexema === 'register') { // TODO trocar por isInFirstSet
        const RegisterStatement = require('./registerStatement');
        const registerStatement = new RegisterStatement(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = registerStatement.exec();
      }
    }

    return this.currentIndex;
  }
}

module.exports = RegisterStatementMultiple;