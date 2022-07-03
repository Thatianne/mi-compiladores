const BaseError = require('./baseError');

class OperatorNotFound extends BaseError {
  constructor(operator, currentIndex, currentToken) {
    super(`Expected operator ${operator}`, currentIndex, currentToken);
  }
}

module.exports = OperatorNotFound;