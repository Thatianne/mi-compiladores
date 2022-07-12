const BaseClass = require('../baseClass');
const AddendOperator = require('../addendOperator/addendOperator');
const Value = require('../value/value');
const BinaryExpression = require('../expression/binaryExpression');
const UnaryExpression = require('../expression/unaryExpression');
const TokenHelper = require('../tokenHelper');
const ExpectedAssigmentExpression = require('../errors/expectedAssigmentExpression');
const BinaryExpressionContin = require('../expression/binaryExpressionContin');

// <AssigmentOperators> ::= <Value> | <BinaryExpression> | <UnaryExpression>
class AssignmentOperators extends BaseClass {
  exec() {
    if (this.currentToken) {
      let [found, endedTokens] = this.nextUntilFirst();

      if (found) {
        if (BinaryExpression.isOnSetFirst(this.currentToken) && BinaryExpressionContin.isOnSetFirst(this.nextToken)) {
          const binaryExpression = new BinaryExpression(this.tokens, this.currentIndex, this.errors);
          this.currentIndex = binaryExpression.exec();
        } else if (UnaryExpression.isOnSetFirst(this.currentToken)) {
          const unaryExpression = new UnaryExpression(this.tokens, this.currentIndex, this.errors);
          this.currentIndex = unaryExpression.exec();
        } else if (Value.isOnSetFirst(this.currentToken)) {
          const value = new Value(this.tokens, this.currentIndex, this.errors);
          this.currentIndex = value.exec();
        } else {
          this.addError(new ExpectedAssigmentExpression(this.currentIndex, this.currentToken));
        }
      }
    }

    return this.currentIndex;
  }

  nextUntilFirst() {
    return this.nextUntil(AssignmentOperators.isOnSetFirst, [TokenHelper.isSemicolon]);
  }

  static getSetFirst() {
    return Value.getSetFirst().concat(
            BinaryExpression.getSetFirst().concat(
            UnaryExpression.getSetFirst())
    );
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, AssignmentOperators.getSetFirst());
  }
}

module.exports = AssignmentOperators;