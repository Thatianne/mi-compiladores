const AddendOperator = require('../addendOperator/addendOperator');
const BaseClass = require('../baseClass');
const OperatorNotFound = require('../errors/operatorNotFound');

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
    if (this.isLessThen(this.currentToken) ||
      this.isBiggerThen(this.currentToken) ||
      this.isDifferent(this.currentToken) ||
      this.isLessOrEquals(this.currentToken) ||
      this.isBiggerOrEquals(this.currentToken) ||
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

  isLessThen(token) {
    return token.lexema === '<';
  }

  isBiggerThen(token) {
    return token.lexema === '>';
  }

  isDifferent(token) {
    return token.lexema === '!=';
  }

  isLessOrEquals(token) {
    return token.lexema === '<=';
  }

  isBiggerOrEquals(token) {
    return token.lexema === '>=';
  }

  isEqualsTo(token) {
    return token.lexema === '==';
  }


  static getSetFirst() {
    return OPERATORS;
  }

  static isOnSetFirst(token) {
    return RelationalExpression.getSetFirst().includes(token.lexema);
  }
}

module.exports = RelationalExpression;