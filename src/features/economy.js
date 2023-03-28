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
  subtract(amount) {
    this.totalMoney = this.totalMoney - amount;
  }
}

module.exports = Economy;

Economy.addMoney(100)
 console.log(Economy.totalMoney);