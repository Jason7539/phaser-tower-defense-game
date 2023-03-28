class Tower {
    constructor(damage, range, attackSpeed, targeting, cost, upgradeCost, maxLevel) {
        this.damage = damage;
        this.range = range;
        this.attackSpeed = attackSpeed;
        this.targeting = targeting;
        this.cost = cost;
        this.upgradeCost = upgradeCost;
        this.maxLevel = maxLevel;
    }      

    //Possible methods

    sell(){
        return this.cost * 0.75;
    }

    tagetingEnemy() {

    }
    
    upgradeTower() {

    }
    
}

const arrow = new Tower(5, 50, 5, singletarget, 2, 50, 3);
const siege = new Tower(5, 50, 5, splash, 5, 50, 3);
const mage = new Tower(10, 50, 5, singletarget, 5, 50, 3);

module.exports = Tower;