// TODO: use this as a es module example

export default class Economy {
  // design instance variable
  totalMoney;
  currentScene;
  goldName;
  goldText;

  constructor(startingMoney, scene, goldName) {
    this.totalMoney = startingMoney;
    this.currentScene = scene;
    this.goldName = goldName;
  }

  render() {
    // TODO: add paramters to bring this to the front
    this.currentScene.add.image(30, 25, this.goldName);
    this.currentScene.add.text(65, 15, `=${this.totalMoney}`, {
      fontSize: "32px",
      fill: "#000",
    });
  }

  // designing methods
  addMoney(amount) {
    this.totalMoney = this.totalMoney + amount;
    this.render();
  }
  subtractMoney(amount) {
    this.totalMoney = this.totalMoney - amount;
  }
}
