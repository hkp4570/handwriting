/**
 * 合并两个模块
 * src/a.js
 * src/index.js
 */
(function (modules){
    var moduleExports = {};

    function __webpack_require(moduleId){
        if(moduleExports[moduleId]){
            return moduleExports[moduleId];
        }
        var func = modules[moduleId];
        var module = {
            exports:{}
        }
        func(module, module.exports,__webpack_require);
        var result = module.exports;
        moduleExports[moduleId] = result;
        return result;
    }

    // 首先执行入口模块
    return __webpack_require('./src/index.js');
})({
    './src/a.js':function(module,exports){

    },
    './src/index.js':function(module,exports,__webpack_require){

    }
})
