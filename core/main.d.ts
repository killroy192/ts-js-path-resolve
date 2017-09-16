declare interface Paths {
    [prop: string]: string[];
}

declare interface Options {
    baseUrl: string;
    outDir: string;
    paths: Paths;
}