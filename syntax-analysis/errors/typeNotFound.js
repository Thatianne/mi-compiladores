const BaseError = require('./baseError');

class TypeNotFound extends BaseError {
  constructor(currentIndex, currentToken, typesArr = ['integer', 'string', 'real', 'boolean', 'char']) {
    super(`Expected type (${typesArr.join(', ')} or register created type)`, currentIndex, currentToken);
  }
}

module.exports = TypeNotFound;