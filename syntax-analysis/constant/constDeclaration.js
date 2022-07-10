const BaseClass = require('../baseClass');
const ConstType = require('./constType');
const ConstDeclaration1 = require('./constDeclaration1');
const IdentifierNotFound = require('../errors/identifierNotFound');
const Value = require('../value/value');
const TokenHelper = require('../tokenHelper');

// <ConstDeclaration> ::= <ConstType> Identifier '=' <Value> <ConstDeclaration1>
class ConstDeclaration extends BaseClass {
  exec() {
    const constType = new ConstType(this.tokens, this.currentIndex, this.errors);
    this.currentIndex = constType.exec();

    let [foundIdentifier, endedTokens] = this.nextUntilIdentifier();
    if (foundIdentifier) {
      this.next();
    } else {
      this.addError(new IdentifierNotFound(this.currentIndex, this.currentToken));
    }

    if (!endedTokens && TokenHelper.isEquals(this.currentToken)) {
      this.next();
      const value = new Value(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = value.exec();

      const constDeclaration1 = new ConstDeclaration1(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = constDeclaration1.exec();
    }

    return this.currentIndex;
  }

  nextUntilIdentifier() {
    return this.nextUntil(
      TokenHelper.isIdentifier, [
        ConstDeclaration1.isOnSetFirst,
    ]);
  }
}

module.exports = ConstDeclaration;