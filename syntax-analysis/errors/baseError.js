class BaseError {
  constructor(message, currentIndex, currentToken) {
    this.message = `${message}. In end of file`;

    if (currentToken) {
      this.message = `${message}. Line ${currentToken.line}`;
    }
    this.currentIndex = currentIndex;
    this.currentToken = currentToken;
  }
}

module.exports = BaseError;