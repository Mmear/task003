(function (object) {
    object.Store = {
        get: function (key, reviver) {  //reviver:还原函数
            var value = localStorage.getItem(key);
            if(value) {
                try {
                    reviver = !!reviver ? reviver : function (key, value) {
                        return value;
                    };
                    var json_value = JSON.parse(value, reviver); //尝试解析
                    if(!!json_value) {
                        return json_value;
                    }
                }catch (e) {
                    return value;
                }
            }else {

            }
        } ,
        set: function (key, value) {
            localStorage.setItem(key, value);
        },
        remove: function (key) {
            localStorage.removeItem(key);
        },
        keyIndex: function (key) {
            return localStorage.key(key);
        }
    };
    Store.setList = function (dataList) {
        for(var i in dataList) {
            if(dataList.hasOwnProperty(i)) {
                store.set(i, dataList[i]);
            }
        }
    };
    Store.removeList = function (keyList) {
        for(var i in keyList) {
            if(keyList.hasOwnProperty(i)){
                Store.remove(i);
            }
        }
    };
})(window);

