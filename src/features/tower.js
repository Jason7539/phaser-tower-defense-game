export default class Tower {
    constructor(damage, range, attackSpeed, cost, upgradeCost, x, y) {
        this.damage = damage;
        this.range = range;
        this.attackSpeed = attackSpeed;
        this.cost = cost;
        this.upgradeCost = upgradeCost;
        // this.maxLevel = 1;
        this.x = x;
        this.y = y;
    }      

    //Possible methods

    attack(enemy) {
        const distance = this.getDistancetoTarget(enemy);
        if (distance <= this.range) {
            enemy.takeDamage(this.damage);
        }
    }

    getDistancetoTarget(enemy) {
        const dx = enemy.x - this.x;
        const dy = enemy.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance;
    }
    
    upgradeTower() {
        if (this.maxLevel == 1) {
            /*totalmoney -= this.upgradeCost*/
            this.damage * 1.2;
            this.range * 1.2;
            this.attackSpeed * 1.2;
            this.maxLevel++;
        } else if (this.maxLevel == 2) {
            this.damage * 1.4;
            this.range * 1.4;
            this.attackSpeed * 1.4;
            this.maxLevel++;
        }
    }
}


