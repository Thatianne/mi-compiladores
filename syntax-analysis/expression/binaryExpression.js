const AddendOperator = require('../addendOperator/addendOperator');
const BaseClass = require('../baseClass');
const BinaryExpressionContin = require('./binaryExpressionContin');

// <BinaryExpression> ::= <AddendOperator> <BinaryExpressionContin>
class BinaryExpression extends BaseClass {
  exec() {
    if (this.currentToken) {
      const addendOperator = new AddendOperator(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = addendOperator.exec();

      const binaryExpressionContin = new BinaryExpressionContin(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = binaryExpressionContin.exec();
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return AddendOperator.getSetFirst();
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, BinaryExpression.getSetFirst());
  }
}

module.exports = BinaryExpression;