/**
 * Created by remi on 09/02/2014.
 */
(function () {
    'use strict';
    var __tasks = [];

    /**
     * Return true if Tasks Id already in task collection
     *
     * @param task
     * @returns {boolean}
     * @private
     */
    function _exists(task){
        for(var i = 0; i<__tasks.length; i++){
            if( __tasks[i].id === task.id){
                return true;
            }
        }
        return false;
    }

    var taskObj = {
        size: function () {
            return __tasks.length;
        },
        add: function (data) {
            if( ! data.hasOwnProperty("id")){
                data["id"] = __tasks.length + 1;
            }
            if( ! _exists(data) ){
                __tasks.push(data);
            }
        },
        get:function(id){
            for(var i = 0; i<__tasks.length; i++){
                if( __tasks[i].id === id){
                    return __tasks[i];
                }
            }
            return false;
        },
        delete:function(id){

            __tasks = __tasks.filter(function(element){
                return element.id !== id;
            });
        }
    }




    /**
     * Code for my module beeing used as a module (AMD or CommonJs) or as a global object;
     */
    if ( typeof define === "function" && define.amd ) {
        define(function(require, exports, module) {
            /*for( var props in taskObj ){
                exports[props] = taskObj[props];
            }*/
            __(exports, taskObj);

        });
    }
    else {
        /**
         * This Is NODE.JS case
         */
        if( typeof window === "undefined"){
            /*for( var props in taskObj ){
                exports[props] = taskObj[props];
            }*/
            __(exports, taskObj);
        } else {
            // And normal browser case
            window.TasksThe = taskObj;
        }
    }
    function __(exports, obj){
        for( var props in obj ){
            exports[props] = obj[props];
        }
    }

})();