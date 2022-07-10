const BaseClass = require('../baseClass');
const RegisterList = require('./registerList');
const ReservedWordNotFound = require('../errors/reservedWordNotFound');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const IdentifierNotFound = require('../errors/identifierNotFound');
const TokenHelper = require('../tokenHelper');

// <RegisterStatement> ::= 'register' Identifier '{' <RegisterList>
class RegisterStatement extends BaseClass {
  exec() {
    let [foundRegister, endedTokens] = this.nextUntilRegisterReservedWord();
    if (foundRegister) {
      this.next();
    } else {
      this.addError(new ReservedWordNotFound('register', this.currentIndex, this.currentToken));
    }

    if (!endedTokens) {
      let [foundIdentifier, endedTokens] = this.nextUntilIdentifier();

      if (foundIdentifier) {
        this.next();
      } else {
        this.addError(new IdentifierNotFound(this.currentIndex, this.currentToken));
      }

      if (!endedTokens) {
        let [foundOpenCurlyBrackets, endedTokens] = this.nextUntilOpenCurlyBrackets();

        if (foundOpenCurlyBrackets) {
          this.next();
        } else {
          this.addError(new DelimiterNotFound('{', this.currentIndex, this.currentToken));
        }

        if (!endedTokens) {
          const registerList = new RegisterList(this.tokens, this.currentIndex, this.errors);
          this.currentIndex = registerList.exec();
        }
      }
    }

    return this.currentIndex;
  }

  nextUntilRegisterReservedWord() {
    return this.nextUntil(
      TokenHelper.isRegisterReservedWord, [
        TokenHelper.isIdentifier,
        TokenHelper.isOpenCurlyBrackets,
        RegisterList.isOnSetFirst
    ]);
  }

  nextUntilIdentifier() {
    return this.nextUntil(
      TokenHelper.isIdentifier, [
        TokenHelper.isOpenCurlyBrackets,
        RegisterList.isOnSetFirst
    ]);
  }

  nextUntilOpenCurlyBrackets() {
    return this.nextUntil(
      TokenHelper.isOpenCurlyBrackets, [
        TokenHelper.isIdentifier,
        RegisterList.isOnSetFirst
    ]);
  }

  static getSetFirst() {
    return [
      'register'
    ];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, RegisterStatement.getSetFirst());
  }
}

module.exports = RegisterStatement;