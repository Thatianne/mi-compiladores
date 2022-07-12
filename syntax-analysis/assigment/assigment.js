const BaseClass = require('../baseClass');
const TokenHelper = require('../tokenHelper');
const AssigmentRegister = require('./assigmentRegister');
const IdentifierNotFound = require('../errors/identifierNotFound');

// <Assigment> ::= Identifier <AssigmentRegister>
class Assignment extends BaseClass {
  exec() {
    if (this.currentToken) {
      let [foundIdentifier, endedTokens] = this.nextUntilIdentifier();

      if (foundIdentifier) {
        endedTokens = this.next();
      } else {
        this.addError(new IdentifierNotFound(this.currentIndex, this.currentToken));
      }

      if (!endedTokens) {
        const assigmentRegister = new AssigmentRegister(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = assigmentRegister.exec();
      }
    }

    return this.currentIndex;
  }

  nextUntilIdentifier() {
    return this.nextUntil(TokenHelper.isIdentifier, [AssigmentRegister.isOnSetFirst]);
  }

  static getSetFirst() {
    return [TokenHelper.isIdentifier];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, Assignment.getSetFirst());
  }
}

module.exports = Assignment;