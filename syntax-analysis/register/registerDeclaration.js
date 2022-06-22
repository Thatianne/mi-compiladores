const BaseClass = require('../baseClass');
const ConstType = require('../constant/constType');
const RegisterDeclaration1 = require('./registerDeclaration1');
const IdentifierNotFound = require('../errors/identifierNotFound');

// <RegisterDeclaration> ::= <ConstType> Identifier <RegisterDeclaration1>
class RegisterDeclaration extends BaseClass {
  exec() {
    if (this.currentToken) {
      const constType = new ConstType(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = constType.exec();

      let [foundIdentifier, endedTokens] = this.nextUntilIdentifier();
      if (foundIdentifier) {
        this.next();
      } else {
        this.addError(new IdentifierNotFound(this.currentIndex, this.currentToken));
      }

      if (!endedTokens) {
        const registerDeclaration1 = new RegisterDeclaration1(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = registerDeclaration1.exec();
      }
    }

    return this.currentIndex;
  }

  nextUntilIdentifier() {
    return this.nextUntil(
      this.isIdentifier, [
        RegisterDeclaration1.isOnSetFirst,
    ]);
  }
}

module.exports = RegisterDeclaration;