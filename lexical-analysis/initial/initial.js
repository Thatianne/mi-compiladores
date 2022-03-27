const constants = require('../constants');
const BaseClass = require('../baseClass');
class Initial extends BaseClass {

  static exec(character) {
    const regexIdentifier = /[a-zA-Z]/;
    const regexDelimiters = /[;,(){}[\]\.:]/
    const regexNumber = /[0-9]/;

    if (regexIdentifier.test(character)) {
      return constants.IDENTIFIER;
    } else if (regexDelimiters.test(character)) {
      return constants.DELIMITER;
    } else if (character === '!') {
      return constants.LOGICAL_OPERATOR_NOT;
    } else if (['&', '|'].includes(character)) {
      return constants.LOGICAL_OPERATOR_PARTIAL;
    } else if (['=', '>', '<'].includes(character)) {
      return constants.RELATIONAL_OPERATOR_SIMPLE;
    } else if (character === '+') {
      return constants.ARITHMETIC_OPERATOR_PLUS;
    } else if (character === '-') {
      return constants.ARITHMETIC_OPERATOR_MINUS;
    } else if (character === '*') {
      return constants.ARITHMETIC_OPERATOR;
    } else if (character === '/') {
      return constants.ARITHMETIC_OPERATOR_SLASH;
    } else if (regexNumber.test(character)) {
      return constants.NUMBER;
    } else if (character === '"') {
      return constants.STRING_START_DOUBLE_QUOTES;
    } else if (character === "'") {
      return constants.CHARACTER_START_SINGLE_QUOTES;
    } else if (character === '%') {
      return constants.LINE_COMMENT_PERCENT;
    } else if (/\s/.test(character)) {
      return constants.INITIAL;
    }

    return constants.ERROR_INVALID_CHARACTER;
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