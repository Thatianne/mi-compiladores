const BaseClass = require('../baseClass');
const RegisterList = require('./registerList');
const ReservedWordNotFound = require('../errors/reservedWordNotFound');
const DelimiterNotFound = require('../errors/delimiterNotFound');
const IdentifierNotFound = require('../errors/identifierNotFound');

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

      if (foundIdentifier && !endedTokens) {
        this.next();
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
      } else {
        this.addError(new IdentifierNotFound(this.currentIndex, this.currentToken));

      }
    }

    return this.currentIndex;
  }

  nextUntilRegisterReservedWord() {
    return this.nextUntil(
      this.isRegisterReservedWord, [
        this.isIdentifier,
        this.isOpenCurlyBrackets,
        RegisterList.isOnSetFirst
    ]);
  }

  nextUntilIdentifier() {
    return this.nextUntil(
      this.isIdentifier, [
        this.isOpenCurlyBrackets,
        RegisterList.isOnSetFirst
    ]);
  }

  nextUntilOpenCurlyBrackets() {
    return this.nextUntil(
      this.isOpenCurlyBrackets, [
        this.isIdentifier,
        RegisterList.isOnSetFirst
    ]);
  }

  static getSetFirst() {
    return [
      'register'
    ];
  }

  static isOnSetFirst(token) {
    return RegisterStatement.getSetFirst().includes(token);
  }
}

module.exports = RegisterStatement;