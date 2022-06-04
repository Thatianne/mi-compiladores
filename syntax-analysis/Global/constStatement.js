const BaseClass = require('../baseClass');

class ConstStatement extends BaseClass {
  static exec(tokens, currentIndex) {
    let currentToken = tokens[currentIndex];

    if (Start.isReservedWord(currentToken) && currentToken.lexema === 'program') {
      [currentToken, currentIndex] = Start.nextToken(tokens, currentIndex);

      if (Start.isIdentifier(currentToken)) {
        [currentToken, currentIndex] = Start.nextToken(tokens, currentIndex);

        if (Start.isDelimiter(currentToken) && currentToken.lexema === ';') {
        } else {
          // TODO throw error
        }
      } else {
        // TODO throw error
      }
    } else {
      // TODO throw error
    }
  }
}

module.exports = ConstStatement;