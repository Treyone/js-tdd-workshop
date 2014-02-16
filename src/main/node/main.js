var toto = require("../js/tasks");
var task = {id:1, title:"Task Title 1"};
console.log("0 == "+toto.size());
toto.add(task);
console.log("1 == "+toto.size());