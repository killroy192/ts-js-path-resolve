import path = require('path');

export default function (pathToTSConfig = '../tsconfig') {

    const { outDir, baseUrl, paths } = <Options>require(pathToTSConfig).compilerOptions;

    let rootPath: string = path.join(__dirname, '..', baseUrl);

    Object.keys(paths).forEach((modulePath) => {
        const pathToResolve = paths[modulePath][0].replace('./', '').replace(modulePath, '');

        rootPath = rootPath.replace('src', outDir);

        process.env.NODE_PATH += `:${path.join(rootPath, pathToResolve)}`;
        console.log(process.env.NODE_PATH);
    });

    require('module').Module._initPaths();
}