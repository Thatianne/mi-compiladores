const BaseClass = require('../baseClass');
const ValueRegister = require('./valueRegister');
const AttributionValueNotFound = require('../errors/attributionValueNotFound');
const TokenHelper = require('../tokenHelper');

/*
<Value>  ::= Decimal
          | RealNumber
          | StringLiteral
          | Identifier <ValueRegister>
          | Char
          | Boolean
*/
class Value extends BaseClass {
  exec() {
    let [foundedType, endedTokens] = this.nextUntilTypes();

    if (foundedType) {
      if (this.isRegisterStart(this.currentToken)) {
        if (TokenHelper.isDot(this.nextToken)) {
          this.next();
          const valueRegister = new ValueRegister(this.tokens, this.currentIndex, this.errors);
          this.currentIndex = valueRegister.exec();
        } else {
          this.next();
        }
      } else {
        this.next();
      }
    } else {
      this.addError(new AttributionValueNotFound(this.currentIndex, this.currentToken));
    }

    return this.currentIndex;
  }

  nextUntilTypes() {
    return this.nextUntil(
      (token) => {
        return TokenHelper.isInteger(token) ||
        TokenHelper.isReal(token) ||
        TokenHelper.isString(token) ||
        TokenHelper.isChar(token) ||
        TokenHelper.isBoolean(token) ||
        this.isRegisterStart(token)
      }, [
        TokenHelper.isComma,
        TokenHelper.isSemicolon,
        TokenHelper.isCloseCurlyBrackets
      ]
    )
  }

  isRegisterStart(token) {
    return TokenHelper.isIdentifier(token);
  }

  static getSetFirst() {
    return [
      TokenHelper.isInteger,
      TokenHelper.isReal,
      TokenHelper.isString,
      TokenHelper.isChar,
      TokenHelper.isBoolean
    ]
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, Value.getSetFirst());
  }

}

module.exports = Value