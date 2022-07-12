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
    if (RelationalExpression.isOnSetFirst(this.currentToken)) {
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

  static getOperators() {
    return OPERATORS;
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