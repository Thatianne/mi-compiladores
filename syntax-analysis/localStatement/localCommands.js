const BaseClass = require('../baseClass');
const IfDecs = require('../ifDecs/ifDecs');
const ReadDecs = require('../readDecs/readDecs');
const TokenHelper = require('../tokenHelper');
const WhileDecs = require('../whileDecs/whileDecs');
const WriteDecs = require('../writeDecs/writeDecs');

/*
<LocalCommands> ::= <IfDecs> <LocalCommands>
                  | <WriteDecs> <LocalCommands>
                  | <ReadDecs> <LocalCommands>
                  | <WhileDecs> <LocalCommands>
                  | <Assigment> <LocalCommands>
                  | <FunctionCall> <LocalCommands>
                  | <ProcedureCall> <LocalCommands>
                  |
*/
class LocalCommands extends BaseClass {
  exec() {
    let useRecursiveLocalCommands = false;

    if (IfDecs.isOnSetFirst(this.currentToken)) {
      const ifDecs = new IfDecs(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = ifDecs.exec();
      useRecursiveLocalCommands = true;
    } else if (WriteDecs.isOnSetFirst(this.currentToken)){
      const writeDecs = new WriteDecs(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = writeDecs.exec();
      useRecursiveLocalCommands = true;
    } else if (ReadDecs.isOnSetFirst(this.currentToken)){
      const readDecs = new ReadDecs(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = readDecs.exec();
      useRecursiveLocalCommands = true;
    } else if (WhileDecs.isOnSetFirst(this.currentToken)){
      const whileDecs = new WhileDecs(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = whileDecs.exec();
      useRecursiveLocalCommands = true;
    }

    if (useRecursiveLocalCommands) {
      const localCommands = new LocalCommands(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = localCommands.exec();
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return [TokenHelper.isCloseCurlyBrackets, TokenHelper.isReturnReservedWord].concat(IfDecs.getSetFirst());
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, LocalCommands.getSetFirst());
  }
}

module.exports = LocalCommands;