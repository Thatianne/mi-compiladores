const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const IdentifierNotFound = require('../errors/identifierNotFound');
const TokenHelper = require('../tokenHelper');

// <RegisterDeclaration1> ::= ',' Identifier <RegisterDeclaration1> | ';'
class RegisterDeclaration1 extends BaseClass {
  exec() {
    if (TokenHelper.isSemicolon(this.currentToken)) {
      this.next();
    } else {
      let [foundComma, endedTokens] = this.nextUntilComma();

      if (foundComma) {
        this.next();
      } else {
        this.addError(new DelimiterNotFound(',', this.currentIndex, this.currentToken));
      }

      if (!endedTokens) {
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
    }

    return this.currentIndex;
  }

  nextUntilComma() {
    return this.nextUntil(
      TokenHelper.isComma, [
        TokenHelper.isIdentifier,
        RegisterDeclaration1.isOnSetFirst
    ]);
  }

  nextUntilIdentifier() {
    return this.nextUntil(
      TokenHelper.isIdentifier, [
        RegisterDeclaration1.isOnSetFirst,
    ]);
  }

  static getSetFirst() {
    return [TokenHelper.isComma, TokenHelper.isSemicolon];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, RegisterDeclaration1.getSetFirst());
  }
}

module.exports = RegisterDeclaration1;