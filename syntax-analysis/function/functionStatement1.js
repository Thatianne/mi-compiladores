const BaseClass = require('../baseClass');
const TokenHelper = require('../tokenHelper');

// <FunctionStatement1>::= '}' <FunctionStatement>
class FunctionStatement1 extends BaseClass {
  exec() {
    let [foundCloseCurlyBrackets, endedTokens] = this.nextUntilCloseCurlyBrackets();

    if (foundCloseCurlyBrackets) {
      endedTokens = this.next();
    } else {
      this.addError(new DelimiterNotFound('}', this.currentIndex, this.currentToken));
    }

    if (!endedTokens) {
      const FunctionStatement = require('./functionStatement');
      const functionStatement = new FunctionStatement(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = functionStatement.exec();
    }

    return this.currentIndex;
  }

  nextUntilCloseCurlyBrackets() {
    const FunctionStatement = require('./functionStatement');
    return this.nextUntil(TokenHelper.isCloseCurlyBrackets, [FunctionStatement.isOnSetFirst])
  }

  static getSetFirst() {
    return [TokenHelper.isCloseCurlyBrackets];
  }

  static isOnSetFirst(token) {
    return FunctionStatement1.getSetFirst().includes(token.lexema);
  }
}

module.exports = FunctionStatement1;