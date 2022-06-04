const BaseError = require('./baseError');

class TypeNotFound extends BaseError {
  constructor(currentIndex, currentToken) {
    const types = ['integer', 'string', 'real', 'boolean', 'char']; //TODO melhorar, array está duplicado

    super(`Expected type (${types.join(', ')} or register created type)`, currentIndex, currentToken);
  }
}

module.exports = TypeNotFound;