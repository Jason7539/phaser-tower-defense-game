export default class Enemy {
  type;
  healthAmount;
  speed;
  reward;
  lifeDamage;
  currentScene;
  startPointObject;
  endPointObject;
  follower;

  constructor(
    type,
    healthAmount,
    speed,
    reward,
    lifeDamage,
    scene,
    startPointObject,
    endPointObject
  ) {
    this.type = type;
    this.healthAmount = healthAmount;
    this.speed = speed;
    this.reward = reward;
    this.lifeDamage = lifeDamage;
    this.currentScene = scene;
    this.startPointObject = startPointObject;
    this.endPointObject = endPointObject;
  }

  spawn(path, x, y, assetName) {
    this.follower = this.currentScene.add.follower(path, x, y, assetName);
  }
  renderEnemyToPath(duration, ease) {
    this.follower.startFollow({
      duration: duration,
      ease: ease,
    });
  }
}
