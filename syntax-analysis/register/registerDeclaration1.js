const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const IdentifierNotFound = require('../errors/identifierNotFound');

// <RegisterDeclaration1> ::= ',' Identifier <RegisterDeclaration1> | ';'
class RegisterDeclaration1 extends BaseClass {
  exec() {
    if (this.isSemicolon(this.currentToken)) {
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
      this.isComma, [
        this.isIdentifier,
        RegisterDeclaration1.isOnSetFirst
    ]);
  }

  nextUntilIdentifier() {
    return this.nextUntil(
      this.isIdentifier, [
        RegisterDeclaration1.isOnSetFirst,
    ]);
  }

  static getSetFirst() {
    return [
      ',',
      ';'
    ];
  }

  static isOnSetFirst(token) {
    return RegisterDeclaration1.getSetFirst().includes(token.lexema);
  }
}

module.exports = RegisterDeclaration1;