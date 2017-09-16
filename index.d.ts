export interface Paths {
    [prop: string]: string[];
}

export interface Options {
    baseUrl: string;
    outDir: string;
    paths: Paths;
}

export function pathResolver (pathToTSConfig: string): void;
