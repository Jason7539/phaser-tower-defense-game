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

//Add later
// //Animations: control what animations scorpion has access
  // this.anims.create({
  //   key: "moving_left",
  //   frames: this.anims.generateFrameNames("scorpion", {
  //     prefix: "Walk",
  //     end: 7,
  //     zeroPad: 3,
  //   }),
  //   repeat: -1,
  // });
  // this.anims.create({
  //   key: "up",
  //   frames: this.anims.generateFrameNames("scorpion", {
  //     prefix: "U",
  //     end: 7,
  //     zeroPad: 3,
  //   }),
  //   repeat: -1,
  // });
  // this.anims.create({
  //   key: "down",
  //   frames: this.anims.generateFrameNames("scorpion", {
  //     prefix: "D",
  //     end: 7,
  //     zeroPad: 3,
  //   }),
  //   repeat: -1,
  // });

  //Sprite or animation for pathing
  // jason: we have created path. this adds an image to follow that path

  // const follower = this.add.follower(
  //   path,
  //   startPointObject.x,
  //   startPointObject.y,
  //   "scorpion"
  // );
  // follower.startFollow({
  //   duration: 10000,
  //   ease: "Linear",
  //   // anims: this.anims,
  // });