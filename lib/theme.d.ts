import React from 'react';
import { ExtractProps } from './types';
export declare type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | boolean;
interface ClassDictionary {
    [id: string]: any;
}
interface ClassArray extends Array<ClassValue> {
}
export declare type ClassNamesFn = (...classes: ClassValue[]) => string;
interface ThemeConfig {
    classPrefix?: string;
    renderers?: {
        [propName: string]: any;
    };
    [propsName: string]: any;
}
export declare function theme(name: string, config: Partial<ThemeConfig>): void;
export declare function makeClassnames(ns?: string): (...classes: ClassValue[]) => string;
export declare type ThemeInstance = ThemeConfig & {
    getRendererConfig: (name?: string) => any;
    classnames: ClassNamesFn;
};
export declare function hasTheme(theme: string): boolean;
export declare function setDefaultTheme(theme: string): void;
export declare function classnames(...classes: ClassValue[]): string;
export declare function getClassPrefix(): string | undefined;
export declare function getTheme(theme: string): ThemeInstance;
export interface ThemeProps {
    classPrefix: string;
    classnames: ClassNamesFn;
}
export declare const ThemeContext: React.Context<string>;
export declare let defaultTheme: string;
export declare function themeable<T extends React.ComponentType<ThemeProps & ExtractProps<T>>>(ComposedComponent: T): React.ComponentClass<Pick<JSX.LibraryManagedAttributes<T, ExtractProps<T>>, Exclude<keyof JSX.LibraryManagedAttributes<T, ExtractProps<T>>, "classPrefix" | "classnames">> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: T;
};
export {};
