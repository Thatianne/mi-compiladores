const BaseClass = require('../baseClass');
const RegisterStatement = require('./registerStatement');

// <RegisterStatementMultiple> ::= <RegisterStatement> |
class RegisterStatementMultiple extends BaseClass {
  exec() {
    if (this.currentToken) {
      if (this.currentToken.lexema === 'register') { // TODO ver se tem dependencia circular
        const registerStatement = new RegisterStatement(this.tokens, this.currentIndex, this.errors);
        this.currentToken = registerStatement.exec();
      } else {
        this.next();
      }
    }

    return this.currentIndex;
  }
}

module.exports = RegisterStatementMultiple;