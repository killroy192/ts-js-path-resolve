import path = require('path');

const flags: boolean = process.argv.some((avg) => avg === '--logs' || avg === '-LG');

const addPath: UpdatePath = (modulePath, rootPath, modulePathSelector?) => {

    const pathToResolve: string = modulePathSelector ?
    modulePath.replace('./', '').replace(modulePathSelector, '') :
    modulePath.replace('./', '').replace('/*', '');

    const newPath: string = path.join(rootPath, pathToResolve);

    process.env.NODE_PATH += `:${newPath}`;

    if (flags) {
        console.log(`add to NODE_PATH is '${newPath}' \n`);
    }

};

export default function pathResolver (pathToTSConfig: string) {

    if ((/\.\/.*/).test(pathToTSConfig)) {
        throw new Error('The path to tsconfig.json should be absolute');
    }

    const { outDir, baseUrl, paths } = <Options>require(pathToTSConfig).compilerOptions;

    const rootPath: string = path.join(pathToTSConfig.replace('.json', '').replace('/tsconfig', ''), outDir);

    Object.keys(paths).forEach((modulePathSelector: string) => {

        const currentModulePaths: string[] = paths[modulePathSelector];

        if (flags) {
            console.log(`\n started NODE_PATH is '${process.env.NODE_PATH}' \n`);
        }

        if (modulePathSelector === '*') {

            currentModulePaths.forEach((modulePath: string) => {

                addPath(modulePath, rootPath);
            });

        } else if (currentModulePaths.length === 1 && currentModulePaths[0].indexOf(modulePathSelector)) {

            addPath(currentModulePaths[0], rootPath, modulePathSelector);

        } else {

            throw new Error(`can't resolve the paths which matches ${currentModulePaths}`);

        }

        if (flags) {
            console.log(`now NODE_PATH is '${process.env.NODE_PATH}' \n`);
        }
    });

    console.log(process.env.NODE_PATH);

    require('module').Module._initPaths();
}