class BaseError {
  constructor(message, currentIndex, currentToken) {
    this.message = `${message}. Line ${currentToken.line} `;
    this.currentIndex = currentIndex;
    this.currentToken = currentToken;
  }
}

module.exports = BaseError;