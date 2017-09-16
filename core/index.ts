import path = require('path');

export default function pathResolver (pathToTSConfig: string) {

    if ((/\.\/.*/).test(pathToTSConfig)) {
        throw new Error('The path to tsconfig.json should be absolute');
    }

    const { outDir, baseUrl, paths } = <Options>require(pathToTSConfig).compilerOptions;

    const rootPath: string = path.join(pathToTSConfig.replace('.json', '').replace('/tsconfig', ''), outDir);

    Object.keys(paths).forEach((modulePathSelector) => {

        const currentModulePaths = paths[modulePathSelector];

        if (modulePathSelector === '*') {

            currentModulePaths.forEach((modulePath) => {
                process.env.NODE_PATH += `:${path.join(rootPath, modulePath.replace('./', ''))}`;
            });

        } else if (currentModulePaths.length === 1 && currentModulePaths[0].indexOf(modulePathSelector)) {

            const pathToResolve = currentModulePaths[0].replace('./', '').replace(modulePathSelector, '');

            process.env.NODE_PATH += `:${path.join(rootPath, pathToResolve)}`;

        } else {

            throw new Error(`can't resolve the paths which matches ${currentModulePaths}`);

        }
    });

    console.log(process.env.NODE_PATH);

    require('module').Module._initPaths();
}