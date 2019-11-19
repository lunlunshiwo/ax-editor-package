export interface Enginer {
    test: (tpl: string) => boolean;
    compile: (tpl: string, data: object, ...rest: Array<any>) => string;
}
export declare function reigsterTplEnginer(name: string, enginer: Enginer): void;
export declare function filter(tpl: string, data?: object, ...rest: Array<any>): string;
export declare function evalExpression(expression: string, data?: object): boolean;
export declare function evalJS(js: string, data: object): any;
