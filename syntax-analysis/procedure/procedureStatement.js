const BaseClass = require('../baseClass');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const IdentifierNotFound = require('../errors/identifierNotFound');
const ReservedWordNotFound = require('../errors/reservedWordNotFound');
const FunctionStatement = require('../function/functionStatement');
const LocalStatement = require('../localStatement/localStatement');
const ParameterProcedure = require('./parameterProcedure');
const ProcedureStatement1 = require('./procedureStatement1');

// <ProcedureStatement> ::= 'procedure' Identifier '(' <ParameterProcedure> '{' <LocalStatement> <ProcedureStatement1> |
class ProcedureStatement extends BaseClass {
  exec() {
    let [foundProcedure, endedTokens] = this.nextUntilProcedure();
    let useEmptyProduction = false;

    if (foundProcedure) {
      this.next();
    } else {
      if (FunctionStatement.isOnSetFirst(this.currentToken)) {
        useEmptyProduction = true;
      } else {
        this.addError(new ReservedWordNotFound('procedure', this.currentIndex, this.currentToken));
      }
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
          const parameterProcedure = new ParameterProcedure(this.tokens, this.currentIndex, this.errors);
          this.currentIndex = parameterProcedure.exec();

          let [foundOpenCurlyBrackets, endedTokens] = this.nextUntilOpenCurlyBrackets();
          if (foundOpenCurlyBrackets) {
            this.next();
          } else {
            this.addError(new DelimiterNotFound('{', this.currentIndex, this.currentToken));
          }

          if (!endedTokens) {
            const localStatement = new LocalStatement(this.tokens, this.currentIndex, this.errors);
            this.currentIndex = localStatement.exec();

            const procedureStatement1 = new ProcedureStatement1(this.tokens, this.currentIndex, this.errors);
            this.currentIndex = procedureStatement1.exec();
          }
        }
      }
    }

    return this.currentIndex;
  }

  nextUntilOpenCurlyBrackets() {
    return this.nextUntil(this.isOpenCurlyBrackets, [ProcedureStatement1.isOnSetFirst])
  }

  nextUntilOpenBrackets() {
    return this.nextUntil(this.isOpenBrackets, [ParameterProcedure.isOnSetFirst, this.isOpenCurlyBrackets, ProcedureStatement1.isOnSetFirst])
  }

  nextUntilIdentifier() {
    return this.nextUntil(this.isIdentifier, [this.isOpenBrackets, ParameterProcedure.isOnSetFirst, this.isOpenCurlyBrackets, ProcedureStatement1.isOnSetFirst])
  }

  nextUntilProcedure() {
    return this.nextUntil(this.isProcedureReservedWord, [FunctionStatement.isOnSetFirst, this.isIdentifier, this.isOpenBrackets, ParameterProcedure.isOnSetFirst, this.isOpenCurlyBrackets, ProcedureStatement1.isOnSetFirst])
  }

  static getSetFirst() {
    return ['procedure'];
  }

  static isOnSetFirst(token) {
    return ProcedureStatement.getSetFirst().includes(token.lexema);
  }
}

module.exports = ProcedureStatement;