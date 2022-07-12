const BaseError = require('./baseError');

class TokenNotFound extends BaseError {
  constructor(currentIndex, currentToken, token) {
    super(`Expected token ${token}`, currentIndex, currentToken);
  }
}

module.exports = TokenNotFound;