// TODO: use this as a es module example

export default class Economy {
  // design instance variable
  totalMoney;
  currentScene;
  goldName;
  moneyText;

  constructor(startingMoney, scene, goldName) {
    this.totalMoney = startingMoney;
    this.currentScene = scene;
    this.goldName = goldName;
  }

  render() {
    this.currentScene.add.image(30, 25, this.goldName);
    this.moneyText = this.currentScene.add.text(65, 15, `=${this.totalMoney}`, {
      fontSize: "32px",
      fill: "#000",
    }); 
  }

  addMoney(amount) {
    this.totalMoney = this.totalMoney + amount;
    this.moneyText.setText(`=${this.totalMoney}`);
  }

  subtractMoney(amount) {
    this.totalMoney = this.totalMoney - amount;
    this.moneyText.setText(`=${this.totalMoney}`);
  }
}

//this in let econ is the currentScene (variable) = scene
