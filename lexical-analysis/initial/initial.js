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
    } else if (character === '&') {
      return constants.LOGICAL_OPERATOR_PARTIAL_AND;
    }else if (character === '|') {
      return constants.LOGICAL_OPERATOR_PARTIAL_OR;
    } else if (character === '=') {
      return constants.RELATIONAL_OPERATOR_ASSIGNMENT;
    } else if (character === '>') {
      return constants.RELATIONAL_OPERATOR_BIGGER;
    } else if (character === '<') {
      return constants.RELATIONAL_OPERATOR_SMALLER;
    } else if (character === '+') {
      return constants.ARITHMETIC_OPERATOR_SUM;
    } else if (character === '-') {
      return constants.ARITHMETIC_OPERATOR_MINUS;
    } else if (character === '*') {
      return constants.ARITHMETIC_OPERATOR_MULTIPLICATION;
    } else if (character === '/') {
      return constants.ARITHMETIC_OPERATOR_DIVISION;
    } else if (regexNumber.test(character)) {
      return constants.NUMBER;
    } else if (character === '"') {
      return constants.STRING_START_DOUBLE_QUOTES;
    } else if (character === "'") {
      return constants.CHARACTER_START_SINGLE_QUOTES;
    } else if (character === '%') {
      return constants.LINE_COMMENT_PERCENT;
    } else if (/\s/.test(character) || character === '') {
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