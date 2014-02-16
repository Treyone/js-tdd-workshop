define(function(require) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
    var util = require('tasks');
    var color = "#FF0000";
    console.log(util);
    //util.add({id:1, title:"ttt"});
    if( 0 === util.size() ){
        console.log("0 == " + util.size());
        util.add({id:1, title:"ttt"});
        if( 1 === util.size() ){
            console.log("1 == " + util.size());
            color = "#00FF00";
        }
    }
    document.body.style.backgroundColor =color;


});