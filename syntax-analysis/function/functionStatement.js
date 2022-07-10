const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const IdentifierNotFound = require('../errors/identifierNotFound');
const ReservedWordNotFound = require('../errors/reservedWordNotFound');
const ParameterFunction = require('./parameterFunction');
const FunctionStatement1 = require('./functionStatement1');
const Value = require('../value/value');
const TokenHelper = require('../tokenHelper');
const LocalStatement = require('../localStatement/localStatement');

// <FunctionStatement>::= 'function' Identifier '(' <ParameterFunction> '{' <LocalStatement> 'return' <Value>';' <FunctionStatement1> |
class FunctionStatement extends BaseClass {
  exec() {
    let [foundFunction, endedTokens] = this.nextUntilFunction();
    let useEmptyProduction = false;

    if (foundFunction) {
      this.next();
    } else {
      // TODO quando fizer o mainStatement
      // if (MainStatement.isOnSetFirst(this.currentToken)) {
      //  useEmptyProduction = true;
      // } else {
        this.addError(new ReservedWordNotFound('function', this.currentIndex, this.currentToken));
      // }
    }

    if (!endedTokens && !useEmptyProduction) {
      let [foundIdentifier, endedTokens] = this.nextUntilIdentifier();

      if (foundIdentifier) {
        this.next();
      } else {
        this.addError(new IdentifierNotFound(this.currentIndex, this.currentToken));
      }

      if (!endedTokens) {
        let [foundOpenBrackets, endedTokens] = this.nextUntilOpenBrackets();

        if (foundOpenBrackets) {
          this.next();
        } else {
          this.addError(new DelimiterNotFound('(', this.currentIndex, this.currentToken));
        }

        if (!endedTokens) {
          const parameterFunction = new ParameterFunction(this.tokens, this.currentIndex, this.errors);
          this.currentIndex = parameterFunction.exec();

          let [foundOpenCurlyBrackets, endedTokens] = this.nextUntilOpenCurlyBrackets();
          if (foundOpenCurlyBrackets) {
            this.next();
          } else {
            this.addError(new DelimiterNotFound('{', this.currentIndex, this.currentToken));
          }

          if (!endedTokens) {
            const localStatement = new LocalStatement(this.tokens, this.currentIndex, this.errors);
            this.currentIndex = localStatement.exec();

            let [foundReturn, endedTokens] = this.nextUntilReturn();

            if (foundReturn) {
              endedTokens = this.next();
            } else {
              this.addError(new ReservedWordNotFound('return', this.currentIndex, this.currentToken));
            }

            if (!endedTokens) {
              const value = new Value(this.tokens, this.currentIndex, this.errors);
              this.currentIndex = value.exec();
            }

            if (this.currentToken) {
              let [foundSemicolon, endedTokens] = this.nextUntilSemicolon();
              if (foundSemicolon) {
                endedTokens = this.next();
              } else {
                this.addError(new DelimiterNotFound(';', this.currentIndex, this.currentToken));
              }
            }

            if (this.currentToken) {
              const functionStatement1 = new FunctionStatement1(this.tokens, this.currentIndex, this.errors);
              this.currentIndex = functionStatement1.exec();
            }
          }
        }
      }
    }

    return this.currentIndex;
  }

  nextUntilSemicolon() {
    return this.nextUntil(TokenHelper.isSemicolon, [FunctionStatement1.isOnSetFirst, TokenHelper.isCloseCurlyBrackets]);
  }

  nextUntilReturn() {
    return this.nextUntil(this.isReturnReservedWord, [
      Value.isOnSetFirst,
      TokenHelper.isSemicolon,
      FunctionStatement1.isOnSetFirst,
      TokenHelper.isCloseCurlyBrackets
    ]);
  }

  nextUntilOpenCurlyBrackets() {
    return this.nextUntil(TokenHelper.isOpenCurlyBrackets, [
      this.isReturnReservedWord,
      Value.isOnSetFirst,
      TokenHelper.isSemicolon,
      FunctionStatement1.isOnSetFirst
    ]);
  }

  nextUntilOpenBrackets() {
    return this.nextUntil(TokenHelper.isOpenBrackets, [
      ParameterFunction.isOnSetFirst,
      TokenHelper.isOpenCurlyBrackets,
      this.isReturnReservedWord,
      Value.isOnSetFirst,
      TokenHelper.isSemicolon,
      FunctionStatement1.isOnSetFirst
    ]);
  }

  nextUntilIdentifier() {
    return this.nextUntil(TokenHelper.isIdentifier, [
      TokenHelper.isOpenBrackets,
      ParameterFunction.isOnSetFirst,
      TokenHelper.isOpenCurlyBrackets,
      this.isReturnReservedWord,
      Value.isOnSetFirst,
      TokenHelper.isSemicolon,
      FunctionStatement1.isOnSetFirst
    ]);
  }

  nextUntilFunction() {
    return this.nextUntil(TokenHelper.isFunctionReservedWord, [
      TokenHelper.isIdentifier,
      TokenHelper.isOpenBrackets,
      ParameterFunction.isOnSetFirst,
      TokenHelper.isOpenCurlyBrackets,
      this.isReturnReservedWord,
      Value.isOnSetFirst,
      TokenHelper.isSemicolon,
      FunctionStatement1.isOnSetFirst
    ]);
  }

  isReturnReservedWord(token) {
    return TokenHelper.isReservedWord(token) && token.lexema === 'return';
  }

  static getSetFirst() {
    return [TokenHelper.isFunctionReservedWord];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, FunctionStatement.getSetFirst());
  }
}

module.exports = FunctionStatement;