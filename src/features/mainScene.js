// This is the entry point of your game.

const width = 800;
const height = 600;

const config = {
  width,
  height,
  backgroundColor: "#28c953",
  type: Phaser.AUTO,
  scene: { preload, create },
};

const game = new Phaser.Game(config);

function helloWorld(number) {
  console.log("helloworld" + number);
  console.log("helloworld" + number);
  console.log("helloworld" + number);
}
function preload() {
  this.load.image("play_button", "play_button.png");
  this.load.image("black", "ball.png");
}

function create() {
  const centerX = width / 2;
  const centerY = height / 2;

  let playButton = this.add
    .image(centerX, centerY * 1.2, "play_button")
    .setInteractive();

  let black = this.add.image(400, 300, "black").setInteractive();

  playButton.on("pointerdown", () => {
    alert("clicked button");
  });
}
