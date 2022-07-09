const BaseClass = require('../baseClass');
const ValueRegister = require('./valueRegister');
const AttributionValueNotFound = require('../errors/attributionValueNotFound');

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
        if (this.isDot(this.nextToken)) {
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
        return this.isDecimal(token) ||
        this.isReal(token) ||
        this.isString(token) ||
        this.isChar(token) ||
        this.isBoolean(token) ||
        this.isRegisterStart(token)
      }, [
        this.isComma,
        this.isSemicolon
      ]
    )
  }

  isRegisterStart(token) {
    return this.isIdentifier(token);
  }

}

module.exports = Value