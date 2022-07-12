const BaseClass = require('../baseClass');
const AddendOperator = require('../addendOperator/addendOperator');
const TokenHelper = require('../tokenHelper');
const AssigmentOperators = require('./assigmentOperators');
const TokenNotFound = require('../errors/tokenNotFound');
const IdentifierNotFound = require('../errors/identifierNotFound');
const OperatorNotFound = require('../errors/operatorNotFound');
const DelimiterNotFound = require('../errors/delimiterNotFound');

/* <AssigmentRegister> ::= '.' Identifier '=' <AssigmentOperators> ';'
| '=' <AssigmentOperators> ';'
| '++' ';'
| '--' ';'
*/
const OPERATORS = ['.', '=', '++', '--'];
class AssigmentRegister extends BaseClass {
  exec() {
    let [found, endedTokens] = this.nextUntilAnyFirst();

    if (found && !endedTokens) {
      if (TokenHelper.isDot(this.currentToken)) {
        this.next();

        let [foundIdentifier, endedTokens] = this.nextUntilIdentifier();

        if (foundIdentifier) {
          endedTokens = this.next();
        } else {
          this.addError(new IdentifierNotFound(this.currentIndex, this.currentToken));
        }

        if (!endedTokens) {
          let [foundEquals, endedTokens] = this.nextUntilEquals();

          if (foundEquals) {
            endedTokens = this.next();
          } else {
            this.addError(new OperatorNotFound('=', this.currentIndex, this.currentToken));
          }

          if (!endedTokens) {
            const assigmentOperators = new AssigmentOperators(this.tokens, this.currentIndex, this.errors);
            this.currentIndex = assigmentOperators.exec();

            let [foundSemicolon, endedTokens] = this.nextUntilSemicolon();
            if (foundSemicolon) {
              this.next();
            } else {
              this.addError(new DelimiterNotFound(';', this.currentIndex, this.currentToken));
            }
          }
        }
      } else if (TokenHelper.isEquals(this.currentToken)) {
        this.next();

        const assigmentOperators = new AssigmentOperators(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = assigmentOperators.exec();

        let [foundSemicolon, endedTokens] = this.nextUntilSemicolon();
        if (foundSemicolon) {
          this.next();
        } else {
          this.addError(new DelimiterNotFound(';', this.currentIndex, this.currentToken));
        }
      } else if (TokenHelper.isIncrement(this.currentToken)) {
        this.next();

        let [foundSemicolon, endedTokens] = this.nextUntilSemicolon();
        if (foundSemicolon) {
          this.next();
        } else {
          this.addError(new DelimiterNotFound(';', this.currentIndex, this.currentToken));
        }
      } else if (TokenHelper.isDecrement(this.currentToken)) {
        this.next();

        let [foundSemicolon, endedTokens] = this.nextUntilSemicolon();
        if (foundSemicolon) {
          this.next();
        } else {
          this.addError(new DelimiterNotFound(';', this.currentIndex, this.currentToken));
        }
      }
    } else {
      this.addError(new TokenNotFound(this.currentIndex, this.currentToken, OPERATORS.join(', ')));
    }

    return this.currentIndex;
  }

  nextUntilAnyFirst() {
    return this.nextUntil(AssigmentRegister.isOnSetFirst, [
      TokenHelper.isSemicolon,
      AssigmentOperators.isOnSetFirst
    ]);
  }

  nextUntilIdentifier() {
    return this.nextUntil(TokenHelper.isIdentifier, [
      TokenHelper.isEquals,
      AssigmentOperators.isOnSetFirst,
      TokenHelper.isSemicolon,
    ]);
  }

  nextUntilEquals() {
    return this.nextUntil(TokenHelper.isEquals, [
      AssigmentOperators.isOnSetFirst,
      TokenHelper.isSemicolon,
    ]);
  }

  nextUntilSemicolon() {
    return this.nextUntil(TokenHelper.isSemicolon, []);
  }

  static getSetFirst() {
    return [TokenHelper.isDot, TokenHelper.isEquals, TokenHelper.isIncrement, TokenHelper.isDecrement];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, AssigmentRegister.getSetFirst());
  }
}

module.exports = AssigmentRegister;