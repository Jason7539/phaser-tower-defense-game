const economy = require("./src/features/economy");
const enemy = require("./src/features/Enemy");
const tower = require("./src/features/tower");

console.log("hello world");

let econ = new economy(100);

console.log("econ1: ", econ.totalMoney);

let econ2 = new economy(54);
console.log("econ2: ", econ2.totalMoney);
