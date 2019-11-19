import moment from 'moment';
import { PlainObject } from '../types';
export declare const prettyBytes: (num: number) => string;
export declare const escapeHtml: (str: string) => string;
export declare function formatDuration(value: number): string;
export declare const relativeValueRe: RegExp;
export declare const filterDate: (value: string, data?: object, format?: string) => moment.Moment;
export declare const filters: {
    [propName: string]: (input: any, ...args: any[]) => any;
};
export declare function registerFilter(name: string, fn: (input: any, ...args: any[]) => any): void;
export declare function pickValues(names: string, data: object): any;
export declare const resolveVariable: (path: string, data?: any) => any;
export declare const resolveVariableAndFilter: (path: string, data?: object, defaultFilter?: string) => any;
export declare const tokenize: (str: string, data: object, defaultFilter?: string) => string;
export declare function dataMapping(to: any, from: PlainObject): any;
