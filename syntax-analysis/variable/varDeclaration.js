const BaseClass = require('../baseClass');
const VarType = require('./varType');
const VarDeclaration1 = require('./varDeclaration1');
const IdentifierNotFound = require('../errors/identifierNotFound');
const TokenHelper = require('../tokenHelper');

// <VarDeclaration>::= <VarType> Identifier <VarDeclaration1>
class VarDeclaration extends BaseClass {
  exec() {
    if (this.currentToken) {
      const varType = new VarType(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = varType.exec();

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

    return this.currentIndex;
  }

  nextUntilIdentifier() {
    return this.nextUntil(
      TokenHelper.isIdentifier, [
        VarDeclaration1.isOnSetFirst,
    ]);
  }

  static getSetFirst() {
    return VarType.getSetFirst;
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, VarDeclaration.getSetFirst());
  }
}

module.exports = VarDeclaration;