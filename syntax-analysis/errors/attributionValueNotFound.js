const BaseError = require('./baseError');

class AttributionValueNotFound extends BaseError {
  constructor(currentIndex, currentToken) {
    super(`Expected attribution value`, currentIndex, currentToken);
  }
}

module.exports = AttributionValueNotFound;