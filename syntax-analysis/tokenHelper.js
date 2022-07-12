const Constants = require('./constants');

class TokenHelper {

  static isReservedWord(token) {
    return token.class.toLowerCase() === Constants.RESERVED_WORD.toLowerCase();
  }

  static isIdentifier(token) {
    return token.class.toLowerCase() === Constants.IDENTIFIER.toLowerCase();
  }

  static isDelimiter(token) {
    return token.class.toLowerCase() === Constants.DELIMITER.toLowerCase();
  }

  static isSemicolon(token) {
    return TokenHelper.isDelimiter(token) && token.lexema === ';';
  }

  static isColon(token) {
    return TokenHelper.isDelimiter(token) && token.lexema === ':';
  }

  static isVarReservedWord(token) {
    return TokenHelper.isReservedWord(token) && token.lexema === 'var';
  }

  static isConstReservedWord(token) {
    return TokenHelper.isReservedWord(token) && token.lexema === 'const';
  }

  static isRegisterReservedWord(token) {
    return TokenHelper.isReservedWord(token) && token.lexema === 'register';
  }

  static isProcedureReservedWord(token) {
    return TokenHelper.isReservedWord(token) && token.lexema === 'procedure';
  }

  static isFunctionReservedWord(token) {
    return TokenHelper.isReservedWord(token) && token.lexema === 'function';
  }

  static isOpenCurlyBrackets(token) {
    return TokenHelper.isDelimiter(token) && token.lexema === '{';
  }

  static isCloseCurlyBrackets(token) {
    return TokenHelper.isDelimiter(token) && token.lexema === '}';
  }

  static isComma(token) {
    return TokenHelper.isDelimiter(token) && token.lexema === ',';
  }

  static isDot(token) {
    return TokenHelper.isDelimiter(token) && token.lexema === '.';
  }

  static isOpenBrackets(token) {
    return TokenHelper.isDelimiter(token) && token.lexema === '(';
  }

  static isCloseBrackets(token) {
    return TokenHelper.isDelimiter(token) && token.lexema === ')';
  }

  static isEquals(token) {
    return token.lexema === '=';
  }

  static isInteger(token) {
    return /[0-9]+/.test(token.lexema);
  }

  static isReal(token) {
    return /[0-9]+\.[0-9]+/.test(token.lexema);
  }

  static isString(token) {
    return /".+"/.test(token.lexema);
  }

  static isChar(token) {
    return /'.'/.test(token.lexema);
  }

  static isBoolean(token) {
    return ['true', 'false'].includes(token.lexema.toLowerCase());
  }

  static isOr(token) {
    return token.lexema === '||';
  }

  static isAnd(token) {
    return token.lexema === '&&';
  }

  static isLessThen(token) {
    return token.lexema === '<';
  }

  static isBiggerThen(token) {
    return token.lexema === '>';
  }

  static isDifferent(token) {
    return token.lexema === '!=';
  }

  static isNot(token) {
    return token.lexema === '!';
  }

  static isLessOrEquals(token) {
    return token.lexema === '<=';
  }

  static isBiggerOrEquals(token) {
    return token.lexema === '>=';
  }

  static isEqualsTo(token) {
    return token.lexema === '==';
  }

  static isIncrement(token) {
    return token.lexema === '++';
  }

  static isDecrement(token) {
    return token.lexema === '--';
  }

  static isPlus(token) {
    return token.lexema === '+';
  }

  static isLess(token) {
    return token.lexema === '-';
  }

  static isDivision(token) {
    return token.lexema === '/';
  }

  static isMultiplication(token) {
    return token.lexema === '*';
  }

  static isIfReservedWord(token) {
    return TokenHelper.isReservedWord(token) && token.lexema === 'if';
  }

  static isElseReservedWord(token) {
    return TokenHelper.isReservedWord(token) && token.lexema === 'else';
  }

  static isReturnReservedWord(token) {
    return TokenHelper.isReservedWord(token) && token.lexema === 'return';
  }

  static isReadReservedWord(token) {
    return TokenHelper.isReservedWord(token) && token.lexema === 'read';
  }

  static isWhileReservedWord(token) {
    return TokenHelper.isReservedWord(token) && token.lexema === 'while';
  }

  static isWriteReservedWord(token) {
    return TokenHelper.isReservedWord(token) && token.lexema === 'write';
  }

  static isIntegerReservedWord(token) {
    return TokenHelper.isReservedWord(token) && token.lexema === 'integer';
  }

  static isRealReservedWord(token) {
    return TokenHelper.isReservedWord(token) && token.lexema === 'real';
  }

  static isStringReservedWord(token) {
    return TokenHelper.isReservedWord(token) && token.lexema === 'string';
  }

  static isCharReservedWord(token) {
    return TokenHelper.isReservedWord(token) && token.lexema === 'char';
  }

  static isBooleanReservedWord(token) {
    return TokenHelper.isReservedWord(token) && token.lexema === 'boolean';
  }
}

module.exports = TokenHelper;