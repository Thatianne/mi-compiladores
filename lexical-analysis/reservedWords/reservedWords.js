const constants = require('../constants');

class ReservedWords {

  static exec(character) {
    return constants.INITIAL;
  }

  static includes(lexeme) {
    const words = [
      'program',
      'var',
      'const',
      'register',
      'function',
      'procedure',
      'return',
      'main',
      'if',
      'else',
      'while',
      'read',
      'write',
      'integer',
      'real',
      'boolean',
      'char',
      'string',
      'true',
      'false'
    ]

    return words.includes(lexeme);
  }

  static willStay(character) {
    const regex = /[a-zA-Z0-9_]/;

    return regex.test(character);
  }

  static isFinalState() {
    return false;
  }

  static willHaveBetterMatch(character) {
    return false;
  }
}

module.exports = ReservedWords