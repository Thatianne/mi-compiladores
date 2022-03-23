class ReservedWords {

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
}

module.exports = ReservedWords