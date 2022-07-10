const BaseClass = require('../baseClass');
const TokenHelper = require('../tokenHelper');
const ListArgumentsRead = require('./listArgumentsRead');
const RegisterRead = require('./registerRead');

// <ArgumentsRead> ::= Identifier <RegisterRead> <ListArgumentsRead>
class ArgumentsRead extends BaseClass {
  exec() {
    if (this.currentToken) {
      let [found, endedTokens] = this.nextUntilIdentifier();

      if (found) {
        this.next();

        if (RegisterRead.isOnSetFirst(this.currentToken)) { // trata produção vazia de RegisterRead
          const registerRead = new RegisterRead(this.tokens, this.currentIndex, this.errors);
          this.currentIndex = registerRead.exec();
        }

        const listArgumentsRead = new ListArgumentsRead(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = listArgumentsRead.exec();
      }
    }
    return this.currentIndex;
  }

  nextUntilIdentifier() {
    return this.nextUntil(TokenHelper.isIdentifier, [RegisterRead.isOnSetFirst, ListArgumentsRead.isOnSetFirst])
  }

  static getSetFirst() {
    return [TokenHelper.isIdentifier];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, ArgumentsRead.getSetFirst());
  }
}

module.exports = ArgumentsRead;