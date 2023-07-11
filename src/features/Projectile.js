export default class Projectile {
    currentScene;
    x;
    y;
    velocity;
    image;
    owner;
    lifespan;
    
    

    constructor(scene,x,y) {
        this.currentScene = scene;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.image = image;
        this.owner = owner;
        this.lifespan = lifespan;
        this.key = key;
        this.bulletSprite = sprite;

    }

    
    createBulletAnimation(assetName, filename, frameAmount, zeroAmount, towerName) {

        this.anims.create({
            key: towerName,
            frames: this.currentScene.anims.generateFrameNames(assetName, {
                prefix: filename,
                end: frameAmount,
                zeroPad: zeroAmount,
            }), 
            frameRate: 10,
            repeat: -1
        });
    }

    createBullet(towerName, towerSprite) {
        this.bulletSprite = this.currentScene.add.sprite(towerSprite.x, towerSprite.y, towerName)
    }
}