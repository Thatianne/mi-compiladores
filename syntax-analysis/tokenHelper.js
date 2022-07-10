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

  static isDecimal(token) {
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

  static isDecimal(token) {
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

}

module.exports = TokenHelper;