const BaseClass = require('../baseClass');
const VarStatement = require('../variable/varStatement');

class GlobalStatement extends BaseClass {
  exec() {
    const varStatement = new VarStatement(this.tokens, this.currentIndex, this.errors);
    this.currentIndex = varStatement.exec();

    // TODO const

    return this.currentIndex;
  }
}

module.exports = GlobalStatement;