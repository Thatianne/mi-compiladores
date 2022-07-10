const Constants = require('./constants');
const UnexpectedToken = require('./errors/unexpectedToken');
const FileEnded = require('./errors/FileEndend');

class BaseClass {
  constructor(tokens, currentIndex, errors) {
    this.tokens = tokens;
    this.currentIndex = currentIndex;
    this.errors = errors;
  }

  exec() {

  }

  get currentToken() {
    return this.tokens[this.currentIndex];
  }

  get prevToken() {
    return this.tokens[this.currentIndex - 1];
  }

  get nextToken() {
    return this.tokens[this.currentIndex + 1];
  }

  get count() {
    return this.tokens.length;
  }

  next() {
    this.currentIndex++;
    return this.currentIndex >= this.count - 1; // acabaram os tokens
  }

  prev() {
    this.currentIndex--;
  }

  isReservedWord(token) {
    return token.class.toLowerCase() === Constants.RESERVED_WORD.toLowerCase();
  }

  isIdentifier(token) { // TODO melhorar metodos duplicados
    return token.class.toLowerCase() === Constants.IDENTIFIER.toLowerCase();
  }

  static isIdentifier(token) {
    return token.class.toLowerCase() === Constants.IDENTIFIER.toLowerCase();
  }

  isDelimiter(token) {
    return token.class.toLowerCase() === Constants.DELIMITER.toLowerCase();
  }

  static isDelimiter(token) {
    return token.class.toLowerCase() === Constants.DELIMITER.toLowerCase();
  }

  isSemicolon(token) {
    return this.isDelimiter(token) && token.lexema === ';';
  }

  isColon(token) {
    return this.isDelimiter(token) && token.lexema === ':';
  }

  isVarReservedWord(token) {
    return this.isReservedWord(token) && token.lexema === 'var';
  }

  isConstReservedWord(token) {
    return this.isReservedWord(token) && token.lexema === 'const';
  }

  isRegisterReservedWord(token) {
    return this.isReservedWord(token) && token.lexema === 'register';
  }

  isProcedureReservedWord(token) {
    return this.isReservedWord(token) && token.lexema === 'procedure';
  }

  isFunctionReservedWord(token) {
    return this.isReservedWord(token) && token.lexema === 'function';
  }

  isOpenCurlyBrackets(token) {
    return this.isDelimiter(token) && token.lexema === '{';
  }

  isCloseCurlyBrackets(token) {
    return this.isDelimiter(token) && token.lexema === '}';
  }

  isComma(token) {
    return this.isDelimiter(token) && token.lexema === ',';
  }

  isDot(token) {
    return this.isDelimiter(token) && token.lexema === '.';
  }

  static isDot(token) {
    return BaseClass.isDelimiter(token) && token.lexema === '.';
  }

  isOpenBrackets(token) {
    return this.isDelimiter(token) && token.lexema === '(';
  }

  isCloseBrackets(token) {
    return this.isDelimiter(token) && token.lexema === ')';
  }

  isEquals(token) {
    return token.lexema === '=';
  }

  isDecimal(token) {
    return /[0-9]+/.test(token.lexema);
  }

  isReal(token) {
    return /[0-9]+\.[0-9]+/.test(token.lexema);
  }

  isString(token) {
    return /".+"/.test(token.lexema);
  }

  isChar(token) {
    return /'.'/.test(token.lexema);
  }

  isBoolean(token) {
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

  isOr(token) {
    return token.lexema === '||';
  }

  isAnd(token) {
    return token.lexema === '&&';
  }

  addError(error) {
    this.errors.push(error);
  }

  hasErrors() {
    return this.errors.length > 0;
  }

  changedLine() {
    return +this.prevToken.line < +this.currentToken.line;
  }

  static getSetFirst() {
    return [];
  }

  static processIsOnSetFirst(token, set) {
    const functions = set.filter(tokenType => typeof tokenType === 'function');
    const notFunctions = set.filter(tokenType => typeof tokenType !== 'function');

    const result = functions.some(func => func.call(this, token));

    return result || notFunctions.includes(token.lexema);
  }

  nextUntil(funcSearchUntil, funcsStopSearch) {
    let found = false;
    let endedTokens = true;

    while(this.currentToken) {
      if (funcSearchUntil.call(this, this.currentToken)) {
        found = true;
        endedTokens = false
        break
      }
      if (funcsStopSearch.some((func) => func.call(this, this.currentToken))) {
        found = false;
        endedTokens = false;
        break;
      } else {
        this.addError(new UnexpectedToken(this.currentIndex, this.currentToken));
        this.next();
      }

    }

    if (endedTokens) {
      this.addError(new FileEnded());
    }
    return [found, endedTokens];
  }
}

module.exports = BaseClass;