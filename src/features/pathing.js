export default class Pathing {
    currentScene
    startPointLayer
    endPointLayer

    constructor(scene) {
        this.currentScene = scene;
        this.startPointLayer = map.getObjectLayer("Start");
        this.endPointLayer = map.getObjectLayer("End");
    }

    //Line 59 - 81 from mainScene
    startPoint() {
        const startPointObject = startPointLayer.objects.find(
            (object) =>
              object.properties.find((prop) => prop.name === "StartPoint").value ===
              "200"
          );
    }

    endPoint() {
        const endPointObject = endPointLayer.objects.find(
            (object) =>
              object.properties.find((prop) => prop.name === "EndPoint").value === "200"
          );
    }
    
    getPath() {
        const path = new Phaser.Curves.Path();
        path.moveTo(this.startPointObject.x, startPointObject.y);
        path.lineTo(this.endPointObject.x, this.endPointObject.y);
        const startPoint = new Phaser.Math.Vector2(startPointObject.x,startPointObject.y);
        const endPoint = new Phaser.Math.Vector2(endPointObject.x, endPointObject.y);
    }
}