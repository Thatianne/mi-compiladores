const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const IdentifierNotFound = require('../errors/identifierNotFound');
const OperatorNotFound = require('../errors/operatorNotFound');
const Value = require('../value/value');

// <ConstDeclaration1> ::= ',' Identifier  '=' <Value> <ConstDeclaration1> | ';''
class ConstDeclaration1 extends BaseClass {
  exec() {
    let [foundSemicolonOrComma, endedTokens] = this.nextUntilSemicolonOrComma();

    if (foundSemicolonOrComma) {
      if (this.isSemicolon(this.currentToken)) {
        this.next();
      } else {
        this.next();

        if (!endedTokens) {
          let [foundIdentifier, endedTokens] = this.nextUntilIdentifier();

          if (foundIdentifier) {
            this.next();
          } else {
            this.addError(new IdentifierNotFound(this.currentIndex, this.currentToken));
          }

          if (!endedTokens) {
          let [foundEquals, endedTokens] = this.nextUntilEquals();

            if (foundEquals) {
              this.next();
            } else {
              this.addError(new OperatorNotFound('=', this.currentIndex, this.currentToken));
            }

            if (this.currentToken) {
              const value = new Value(this.tokens, this.currentIndex, this.errors);
              this.currentIndex = value.exec();
            }

            if (this.currentToken) {
              const constDeclaration1 = new ConstDeclaration1(this.tokens, this.currentIndex, this.errors);
              this.currentIndex = constDeclaration1.exec();
            }
          }
        }
      }
    } else {
      this.addError(new DelimiterNotFound(', or ;', this.currentIndex, this.currentToken));
    }

    return this.currentIndex;
  }

  nextUntilSemicolonOrComma() {
    return this.nextUntil(
      (token) => this.isComma(token) || this.isSemicolon(token), [
        this.isIdentifier,
        this.isEquals,
        Value.isOnSetFirst,
        ConstDeclaration1.isOnSetFirst
    ]);
  }

  nextUntilIdentifier() {
    return this.nextUntil(
      this.isIdentifier, [
        this.isEquals,
        Value.isOnSetFirst,
        ConstDeclaration1.isOnSetFirst,
    ]);
  }

  nextUntilEquals() {
    return this.nextUntil(
      this.isEquals, [
        Value.isOnSetFirst,
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
    return ConstDeclaration1.getSetFirst().includes(token.lexema);
  }
}

module.exports = ConstDeclaration1;