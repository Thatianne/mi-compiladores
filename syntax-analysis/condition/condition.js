const BaseClass = require('../baseClass');
const AddendOperator = require('../addendOperator/addendOperator');
const ConditionContin = require('./conditionContin');

// <Condition> ::= <AddendOperator> <ConditionContin>
class Condition extends BaseClass {
  exec() {
    const addendOperator = new AddendOperator(this.tokens, this.currentIndex, this.errors);
    this.currentIndex = addendOperator.exec();

    const conditionContin = new ConditionContin(this.tokens, this.currentIndex, this.errors);
    this.currentIndex = conditionContin.exec();

    return this.currentIndex;
  }

  static getSetFirst() {
    return AddendOperator.getSetFirst();
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, Condition.getSetFirst());
  }
}

module.exports = Condition;