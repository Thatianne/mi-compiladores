const AddendOperator = require('../addendOperator/addendOperator');
const BaseClass = require('../baseClass');
const OperatorNotFound = require('../errors/operatorNotFound');
const TokenHelper = require('../tokenHelper');

/*
 <RelationalExpression> ::= '<' <AddendOperator>
                    | '>' <AddendOperator>
                    | '!=' <AddendOperator>
                    | '<=' <AddendOperator>
                    | '>=' <AddendOperator>
                    | '==' <AddendOperator>
 */
const OPERATORS = ['<', '>', '!=', '<=', '>=', '=='];
class RelationalExpression extends BaseClass {
  exec() {
    if (TokenHelper.isLessThen(this.currentToken) ||
      TokenHelper.isBiggerThen(this.currentToken) ||
      TokenHelper.isDifferent(this.currentToken) ||
      TokenHelper.isLessOrEquals(this.currentToken) ||
      TokenHelper.isBiggerOrEquals(this.currentToken) ||
      TokenHelper.isEqualsTo(this.currentToken)
    ) {
      let endedTokens = this.next();

      if (!endedTokens) {
        const addendOperator = new AddendOperator(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = addendOperator.exec();
      }
    } else {
      this.addError(new OperatorNotFound(OPERATORS.join(', '), this.currentIndex, this.currentToken));
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return [
      TokenHelper.isLessThen,
      TokenHelper.isBiggerThen,
      TokenHelper.isDifferent,
      TokenHelper.isLessOrEquals,
      TokenHelper.isBiggerOrEquals,
      TokenHelper.isEqualsTo
    ]
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, RelationalExpression.getSetFirst());
  }
}

module.exports = RelationalExpression;