const BaseError = require('./baseError');

class DelimiterNotFound extends BaseError {
  constructor(delimiter, currentIndex, currentToken) {
    super(`Expected "${delimiter}" delimiter`, currentIndex, currentToken);
  }
}

module.exports = DelimiterNotFound;