"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
function default_1(pathToTSConfig) {
    if (pathToTSConfig === void 0) { pathToTSConfig = '../tsconfig'; }
    var _a = require(pathToTSConfig).compilerOptions, outDir = _a.outDir, baseUrl = _a.baseUrl, paths = _a.paths;
    var rootPath = path.join(__dirname, '..', baseUrl);
    Object.keys(paths).forEach(function (modulePath) {
        var pathToResolve = paths[modulePath][0].replace('./', '').replace(modulePath, '');
        rootPath = rootPath.replace('src', outDir);
        process.env.NODE_PATH += ":" + path.join(rootPath, pathToResolve);
        console.log(process.env.NODE_PATH);
    });
    require('module').Module._initPaths();
}
exports.default = default_1;
//# sourceMappingURL=index.js.map