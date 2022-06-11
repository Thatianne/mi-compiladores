const BaseError = require('./baseError');

class UnexpectedToken extends BaseError {
  constructor(currentIndex, currentToken) {
    super(`Unexpected token "${currentToken.lexema}"`, currentIndex, currentToken);
  }
}

module.exports = UnexpectedToken;