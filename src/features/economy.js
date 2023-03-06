class Economy {
  // design instance variable
  totalMoney;

  constructor(startingMoney) {
    this.totalMoney = startingMoney;
  }

  // designing methods
  addMoney(amount) {
    this.totalMoney = this.totalMoney + amount;
  }
  subtract(amount) {}
}

module.exports = Economy;
