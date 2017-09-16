"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
function pathResolver(pathToTSConfig) {
    if ((/\.\/.*/).test(pathToTSConfig)) {
        throw new Error('The path to tsconfig.json should be absolute');
    }
    var _a = require(pathToTSConfig).compilerOptions, outDir = _a.outDir, baseUrl = _a.baseUrl, paths = _a.paths;
    var rootPath = path.join(pathToTSConfig.replace('.json', '').replace('/tsconfig', ''), outDir);
    Object.keys(paths).forEach(function (modulePathSelector) {
        var currentModulePaths = paths[modulePathSelector];
        if (modulePathSelector === '*') {
            currentModulePaths.forEach(function (modulePath) {
                process.env.NODE_PATH += ":" + path.join(rootPath, modulePath.replace('./', ''));
            });
        }
        else if (currentModulePaths.length === 1 && currentModulePaths[0].indexOf(modulePathSelector)) {
            var pathToResolve = currentModulePaths[0].replace('./', '').replace(modulePathSelector, '');
            process.env.NODE_PATH += ":" + path.join(rootPath, pathToResolve);
        }
        else {
            throw new Error("can't resolve the paths which matches " + currentModulePaths);
        }
    });
    console.log(process.env.NODE_PATH);
    require('module').Module._initPaths();
}
exports.default = pathResolver;
//# sourceMappingURL=index.js.map