// This is the entry point of your game.

const width = 800;
const height = 600;

const config = {
  width,
  height,
  type: Phaser.AUTO,
  scene: { preload, create },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("play_button", "play_button.png");
}

function create() {
  const centerX = width / 2;
  const centerY = height / 2;

  let playButton = this.add
    .image(centerX, centerY * 1.2, "play_button")
    .setInteractive();

  playButton.on("pointerdown", () => {
    alert("clicked button");
  });
}
