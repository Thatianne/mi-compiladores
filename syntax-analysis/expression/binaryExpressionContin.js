const AddendOperator = require('../addendOperator/addendOperator');
const BaseClass = require('../baseClass');
const OperatorNotFound = require('../errors/operatorNotFound');
const TokenHelper = require('../tokenHelper');
const RelationalExpression = require('./relationalExpression');
const LogicalExpression = require('./logicalExpression');

/*
<BinaryExpressionContin> ::= '+' <AddendOperator>
                  | '-' <AddendOperator>
                  | '*' <AddendOperator>
                  | '/' <AddendOperator>
                  | '++'
                  | '--'
                  | <RelationalExpression>
                  | <LogicalExpression>

 */
const OPERATORS = ['+', '-', '*', '/', '++', '--'];
class BinaryExpressionContin extends BaseClass {
  exec() {
    if (TokenHelper.isPlus(this.currentToken) ||
      TokenHelper.isLess(this.currentToken) ||
      TokenHelper.isMultiplication(this.currentToken) ||
      TokenHelper.isDivision(this.currentToken)
    ) {
      let endedTokens = this.next();

      if (!endedTokens) {
        const addendOperator = new AddendOperator(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = addendOperator.exec();
      }
    } else if (TokenHelper.isIncrement(this.currentToken) || TokenHelper.isDecrement(this.currentToken)) {
      this.next();
    } else if (RelationalExpression.isOnSetFirst(this.currentToken)) {
      const relationalExpression = new RelationalExpression(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = relationalExpression.exec();
    } else if (LogicalExpression.isOnSetFirst(this.currentToken)) {
      const logicalExpression = new LogicalExpression(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = logicalExpression.exec();
    } else {
      this.addError(
        new OperatorNotFound(
          OPERATORS.concat(
            LogicalExpression.getOperators().concat(
            RelationalExpression.getOperators())
          ).join(', '),
          this.currentIndex,
          this.currentToken
        )
      );
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return [
      TokenHelper.isPlus,
      TokenHelper.isLess,
      TokenHelper.isDivision,
      TokenHelper.isMultiplication,
      TokenHelper.isIncrement,
      TokenHelper.isDecrement
    ].concat(RelationalExpression.getSetFirst())
    .concat(LogicalExpression.getSetFirst());
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, BinaryExpressionContin.getSetFirst());
  }
}

module.exports = BinaryExpressionContin;