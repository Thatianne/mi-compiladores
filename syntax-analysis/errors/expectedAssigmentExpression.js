const BaseError = require('./baseError');

class ExpectedAssigmentExpression extends BaseError {
  constructor(delimiter, currentIndex, currentToken) {
    super(`Expected "${delimiter}" delimiter`, currentIndex, currentToken);
  }
}

module.exports = ExpectedAssigmentExpression;