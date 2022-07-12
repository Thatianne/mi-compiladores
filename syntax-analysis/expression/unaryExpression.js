const BaseClass = require('../baseClass');
const OperatorNotFound = require('../errors/operatorNotFound');
const TokenHelper = require('../tokenHelper');
const AddendOperatorUnary = require('./addendOperatorUnary');

// <UnaryExpression> ::= '!' <AddendOperatorUnary>
const OPERATORS = ['!'];
class UnaryExpression extends BaseClass {
  exec() {
    if (TokenHelper.isNot(this.currentToken)) {
      let endedTokens = this.next();

      if (!endedTokens) {
        const addendOperatorUnary = new AddendOperatorUnary(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = addendOperatorUnary.exec();
      }
    } else {
      this.addError(new OperatorNotFound(OPERATORS.join(', '), this.currentIndex, this.currentToken));
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return [TokenHelper.isNot];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, UnaryExpression.getSetFirst());
  }
}

module.exports = UnaryExpression;