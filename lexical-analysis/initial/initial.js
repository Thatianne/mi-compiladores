const Identifier = require('../identifier/identifier')

class Initial {

  static exec(character) {
    if (Identifier.isAcceptedToStart(character)) {
      return Identifier
    }

    return Initial
  }

  static canEnd(character) {
    const regex = /\s/

    return regex.test(character)
  }
}

module.exports = Initial