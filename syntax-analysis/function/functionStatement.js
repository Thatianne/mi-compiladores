const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const IdentifierNotFound = require('../errors/identifierNotFound');
const ReservedWordNotFound = require('../errors/reservedWordNotFound');
const ParameterFunction = require('./parameterFunction');
const FunctionStatement1 = require('./functionStatement1');
const Value = require('../value/value');

// <FunctionStatement>::= 'function' Identifier  '(' <ParameterFunction> '{' <LocalStatement> 'return' <Value>';' <FunctionStatement1> |
class FunctionStatement extends BaseClass {
  exec() {
    let [foundFunction, endedTokens] = this.nextUntilFunction();

    if (foundFunction) {
      this.next();

      if (!endedTokens) {
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
              // TODO adicionar localStatement

              if (this.currentToken.lexema === 'return') { // TODO ajeitar
                this.next();
              } else {
                // TODO adicionar erro
              }

              const value = new Value(this.tokens, this.currentIndex, this.errors);
              this.currentIndex = value.exec();

              if (this.currentToken.lexema === ';') {
                this.next();
              } else {
                // TODO adicionar erro
              }

              const functionStatement1 = new FunctionStatement1(this.tokens, this.currentIndex, this.errors);
              this.currentIndex = functionStatement1.exec();
            }
          }
        }
      }
    } else if (!endedTokens) {
      this.addError(new ReservedWordNotFound('procedure', this.currentIndex, this.currentToken));
    }

    return this.currentIndex;
  }

  nextUntilOpenCurlyBrackets() {
    return this.nextUntil(this.isOpenCurlyBrackets, [FunctionStatement1.isOnSetFirst])
  }

  nextUntilOpenBrackets() {
    return this.nextUntil(this.isOpenBrackets, [ParameterFunction.isOnSetFirst, this.isOpenCurlyBrackets, FunctionStatement1.isOnSetFirst])
  }

  nextUntilIdentifier() {
    return this.nextUntil(this.isIdentifier, [this.isOpenBrackets, ParameterFunction.isOnSetFirst, this.isOpenCurlyBrackets, FunctionStatement1.isOnSetFirst])
  }

  nextUntilFunction() {
    return this.nextUntil(this.isFunctionReservedWord, [this.isIdentifier, this.isOpenBrackets, ParameterFunction.isOnSetFirst, this.isOpenCurlyBrackets, FunctionStatement1.isOnSetFirst])
  }

  static getSetFirst() {
    return ['function'];
  }

  static isOnSetFirst(token) {
    return FunctionStatement.getSetFirst().includes(token.lexema);
  }
}

module.exports = FunctionStatement;