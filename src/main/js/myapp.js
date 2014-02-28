/**
 * Created by remi on 19/02/2014.
 */
var MyAPP = (function (MyAPP) {

    if( ! $ ){
        throw "jQuery is Required";
    }

    return {
        init:function(){
            //$.trigger("MyAPPInit");
        },
        Models: {},
        config: {
            cache: true
        }
    };

})();


(function (models) {

    var url = "http://jsdemo.local.fr/v3/task"
        , tasks = []
        , Task = {};

    Task = {
        add:function(task){

        },
        remove:function(id){

        },
        getAll:function(callBack){
            MyAPP.connect.get(url, callBack);
        },
        getById:function(id){

        },
        update:function(id, task){

        },
        find:function(){

        }
    };

    models['Task'] = Task;

})(MyAPP.Models);


(function (MyAPP) {
    MyAPP["connect"] = {
        get: function (url, cb) {
            if (MyAPP.cache && MyAPP.config.cache && MyAPP.cache.hasCache(url)) {
                cb.call({}, MyAPP.cache.get(url));
            } else {
                $.get(url, function (datas) {
                    if (MyAPP.config.cache) {
                        MyAPP.cache.save(url, datas);
                    }
                    cb.call({}, datas);
                });
            }

        }
    }
})( MyAPP || {} );


/**
 * Cache Adapter in Objet for Single Page Applications
 */
var CacheObjectAdapter = (function () {

    var cached = {};

    return  {
        hasCache: function (key) {
            return cached.hasOwnProperty(key);
        },
        save: function (key, datas) {
            cached[key] = datas;
        },
        get: function (key) {
            return cached[key];
        },
        remove: function (key) {
            delete cached[key];
        },
        reset: function () {
            cached = {};
        }
    }

})();

(function (MyAPP, adapter) {

    // Adapter must implement Interface

    MyAPP["cache"] = {
        hasCache: function (key) {
            return adapter.hasCache.call({}, key);
        },
        save: function (key, datas) {
            return adapter.save.call({}, key, datas);
        },
        get: function (key) {
            return adapter.get.call({}, key);
        }
    }

})(MyAPP, CacheObjectAdapter);
