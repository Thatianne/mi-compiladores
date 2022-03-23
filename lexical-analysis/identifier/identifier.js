const Initial = require('../initial/initial');

class Identifier {

  static exec(character) {
    const regex = /[a-zA-Z0-9_]/;
    if (regex.test(character)) {
      return Identifier;
    }

    return Initial;
  }

  static isAcceptedToStart(character) {
    const regex = /[a-zA-Z]/;

    return regex.test(character);
  }

  static canEnd(character) {
    const regex = /\s/

    return regex.test(character)
  }

}

module.exports = Identifier;