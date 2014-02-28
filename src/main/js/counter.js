// fichier counter.js
(function () {
    var count = 0;
    var obj = {
        increment: function () {
            return ++count;
        },
        reset : function(){
            count = 0;
            return count;
        }
    };

    if (typeof define === 'function' && define.amd) {
        // Si AMD alors on ajoute défini le module
        define(function (require, exports, module) {
            for( var props in obj ){
                if( obj.hasOwnProperty(props)){
                    // Copie des propriétés de obj dans exports
                    exports[props] = obj[props];
                }

            }
        });
    } else {
        // On expose l'objet dans la fenetre
        window.counter = obj;
    }

})();


