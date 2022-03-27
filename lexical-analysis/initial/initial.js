const constants = require('../constants');
const BaseClass = require('../baseClass');
class Initial extends BaseClass {

  static exec(character) {
    const regexIdentifier = /[a-zA-Z]/;
    const regexDelimiters = /[;,(){}[\]\.:]/
    const regexNumber = /[0-9]/;

    if (regexIdentifier.test(character)) {
      return constants.IDENTIFIERS;
    } else if (regexDelimiters.test(character)) {
      return constants.DELIMITERS;
    } else if (character === '!') {
      return constants.LOGICAL_OPERATORS_NOT;
    } else if (['&', '|'].includes(character)) {
      return constants.LOGICAL_OPERATORS_PARTIAL;
    } else if (['=', '>', '<'].includes(character)) {
      return constants.RELATIONAL_OPERATORS_SIMPLE;
    } else if (character === '+') {
      return constants.ARITHMETIC_OPERATORS_PLUS;
    } else if (character === '-') {
      return constants.ARITHMETIC_OPERATORS_MINUS;
    } else if (character === '*') {
      return constants.ARITHMETIC_OPERATORS;
    } else if (character === '/') {
      return constants.ARITHMETIC_OPERATORS_SLASH;
    } else if (regexNumber.test(character)) {
      return constants.NUMBERS;
    } else if (character === '"') {
      return constants.STRING_START_DOUBLE_QUOTES;
    } else if (character === "'") {
      return constants.CHARACTER_START_SINGLE_QUOTES;
    } else if (character === '%') {
      return constants.LINE_COMMENT_PERCENT;
    } else if (/\s/.test(character)) {
      return constants.INITIAL;
    }

    return constants.INVALID_CHARACTER;
  }

  static willStay(character) {
    const regex = /s/;

    return regex.test(character);
  }

  static isFinalState() {
    return false;
  }

  static willHaveBetterMatch(character) {
    return false;
  }

}

module.exports = Initial