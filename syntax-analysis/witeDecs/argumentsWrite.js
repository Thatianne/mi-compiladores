const BaseClass = require('../baseClass');
const ListArgumentsWrite = require('./listArgumentsWrite');
const RegisterWrite = require('./registerWrite');
const WriteContent = require('./writeContent');

// <ArgumentsWrite> ::= Identifier <RegisterWrite> <ListArgumentsWrite> | <WriteContent> <ListArgumentsWrite>
class ArgumentsWrite extends BaseClass {
  exec() {
    if (this.currentToken) { // TODO Se não encontrar identificador nem o conjunto primeiro de WriteContent, o q fazer?
      let [found, endedTokens] = this.nextUntilIdentifierWriteContentFirst();

      if (found) {
        if (this.isIdentifier(this.currentToken)) {
          this.next();

          if (RegisterWrite.isOnSetFirst(this.current)) { // trata produção vazia de RegisterWrite
            const registerWrite = new RegisterWrite(this.tokens, this.currentIndex, this.errors);
            this.currentIndex = registerWrite.exec();
          }

          const listArgumentsWrite = new ListArgumentsWrite(this.tokens, this.currentIndex, this.errors);
          this.currentIndex = listArgumentsWrite.exec();
        } else {
          const writeContent = new WriteContent(this.tokens, this.currentIndex, this.errors);
          this.currentIndex = writeContent.exec();

          const listArgumentsWrite = new ListArgumentsWrite(this.tokens, this.currentIndex, this.errors);
          this.currentIndex = listArgumentsWrite.exec();
        }
      }
    }
    return this.currentIndex;
  }

  nextUntilIdentifierWriteContentFirst() {
    return this.nextUntil((token) => this.isIdentifier(token) || WriteContent.isOnSetFirst(token), [RegisterWrite.isOnSetFirst, ListArgumentsWrite.isOnSetFirst])
  }

  static getSetFirst() {
    return [BaseClass.isIdentifier];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, ArgumentsWrite.getSetFirst());
  }
}

module.exports = ArgumentsWrite;