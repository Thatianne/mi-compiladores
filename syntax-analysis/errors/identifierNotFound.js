const BaseError = require('./baseError');

class IdentifierNotFound extends BaseError {
  constructor(currentIndex, currentToken) {
    super(`Expected identifier`, currentIndex, currentToken);
  }
}

module.exports = IdentifierNotFound;