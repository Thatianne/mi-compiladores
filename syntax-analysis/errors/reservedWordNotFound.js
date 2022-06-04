const BaseError = require('./baseError');

class ReservedWordNotFound extends BaseError {
  constructor(reservedWord, currentIndex, currentToken) {
    super(`Expected "${reservedWord}" reserved word`, currentIndex, currentToken);
  }
}

module.exports = ReservedWordNotFound;