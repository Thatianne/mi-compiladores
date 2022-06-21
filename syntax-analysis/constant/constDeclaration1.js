const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const IdentifierNotFound = require('../errors/identifierNotFound');
const Value = require('../value/value');

// <ConstDeclaration1> ::= ',' Identifier  '=' <Value> <ConstDeclaration1> | ';''
class ConstDeclaration1 extends BaseClass {
  exec() {
    if (this.isSemicolon(this.currentToken)) {
      this.next();
    } else {
      let [foundComma, endedTokens] = this.nextUntilComma();

      if (!endedTokens) {
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

          if (!endedTokens && this.isEquals(this.currentToken)) {
            this.next();
            const value = new Value(this.tokens, this.currentIndex, this.errors);
            this.currentIndex = value.exec();

            const constDeclaration1 = new ConstDeclaration1(this.tokens, this.currentIndex, this.errors);
            this.currentIndex = constDeclaration1.exec();
          }
        }
      }
    }

    return this.currentIndex;
  }

  nextUntilComma() {
    return this.nextUntil(
      this.isComma, [
        this.isIdentifier,
        ConstDeclaration1.isOnSetFirst
    ]);
  }

  nextUntilIdentifier() {
    return this.nextUntil(
      this.isIdentifier, [
        ConstDeclaration1.isOnSetFirst,
    ]);
  }

  static getSetFirst() {
    return [
      ',',
      ';'
    ];
  }

  static isOnSetFirst(token) {
    return ConstDeclaration1.getSetFirst().includes(token);
  }
}

module.exports = ConstDeclaration1;