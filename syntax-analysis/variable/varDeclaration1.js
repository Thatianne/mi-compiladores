const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const IdentifierNotFound = require('../errors/identifierNotFound');
const TokenHelper = require('../tokenHelper');

// <VarDeclaration1>::= ',' Identifier <VarDeclaration1>
// | ';'

class VarDeclaration1 extends BaseClass {
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
          const varDeclaration1 = new VarDeclaration1(this.tokens, this.currentIndex, this.errors);
          this.currentIndex = varDeclaration1.exec();
        }
      }
    }

    return this.currentIndex;
  }

  nextUntilComma() {
    return this.nextUntil(
      TokenHelper.isComma, [
        TokenHelper.isIdentifier,
        VarDeclaration1.isOnSetFirst
    ]);
  }

  nextUntilIdentifier() {
    return this.nextUntil(
      TokenHelper.isIdentifier, [
        VarDeclaration1.isOnSetFirst,
    ]);
  }

  static getSetFirst() {
    return [
      ',',
      ';'
    ];
  }

  static isOnSetFirst(token) {
    return VarDeclaration1.getSetFirst().includes(token.lexema);
  }
}

module.exports = VarDeclaration1;