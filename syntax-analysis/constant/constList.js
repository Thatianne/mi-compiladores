const BaseClass = require('../baseClass');
const ConstDeclaration = require('./constDeclaration');
const ConstList1 = require('./constList1');

// <ConstList>::= <ConstDeclaration> <ConstList1>
class ConstList extends BaseClass {
  exec() {
    const constDeclaration = new ConstDeclaration(this.tokens, this.currentIndex, this.errors);
    this.currentIndex = constDeclaration.exec();

    const constList1 = new ConstList1(this.tokens, this.currentIndex, this.errors);
    this.currentIndex = constList1.exec();

    return this.currentIndex;
  }
}

module.exports = ConstList;