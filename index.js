"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var flags = process.argv.some(function (avg) { return avg === '--logs' || avg === '-LG'; });
var addPath = function (modulePath, rootPath, modulePathSelector) {
    var pathToResolve = modulePathSelector ?
        modulePath.replace('./', '').replace(modulePathSelector, '') :
        modulePath.replace('./', '').replace('/*', '');
    var newPath = path.join(rootPath, pathToResolve);
    process.env.NODE_PATH += ":" + newPath;
    if (flags) {
        console.log("add to NODE_PATH is '" + newPath + "' \n");
    }
};
function pathResolver(pathToTSConfig) {
    if ((/\.\/.*/).test(pathToTSConfig)) {
        throw new Error('The path to tsconfig.json should be absolute');
    }
    var _a = require(pathToTSConfig).compilerOptions, outDir = _a.outDir, baseUrl = _a.baseUrl, paths = _a.paths;
    var rootPath = path.join(pathToTSConfig.replace('.json', '').replace('/tsconfig', ''), outDir);
    Object.keys(paths).forEach(function (modulePathSelector) {
        var currentModulePaths = paths[modulePathSelector];
        if (flags) {
            console.log("\n started NODE_PATH is '" + process.env.NODE_PATH + "' \n");
        }
        if (modulePathSelector === '*') {
            currentModulePaths.forEach(function (modulePath) {
                addPath(modulePath, rootPath);
            });
        }
        else if (currentModulePaths.length === 1 && currentModulePaths[0].indexOf(modulePathSelector)) {
            addPath(currentModulePaths[0], rootPath, modulePathSelector);
        }
        else {
            throw new Error("can't resolve the paths which matches " + currentModulePaths);
        }
        if (flags) {
            console.log("now NODE_PATH is '" + process.env.NODE_PATH + "' \n");
        }
    });
    console.log(process.env.NODE_PATH);
    require('module').Module._initPaths();
}
exports.default = pathResolver;
//# sourceMappingURL=index.js.map