declare interface Paths {
    [prop: string]: string[];
}

declare interface Options {
    baseUrl: string;
    outDir: string;
    paths: Paths;
}
declare interface UpdatePath {
    (modulePath: string, rootPath: string, modulePathSelector?: string): void;
}