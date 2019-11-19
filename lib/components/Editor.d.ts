/**
 * @file Editor
 * @description
 * @author fex
 */
import React from 'react';
import { ClassNamesFn } from '../theme';
export declare function monacoFactory(containerElement: any, monaco: any, options: any): any;
export interface EditorProps {
    value?: string;
    defaultValue?: string;
    width?: number | string;
    height?: number | string;
    onChange?: (value: string, event: any) => void;
    language?: string;
    editorTheme?: string;
    options: {
        [propName: string]: any;
    };
    classPrefix: string;
    className?: string;
    classnames: ClassNamesFn;
    context?: any;
    style?: any;
    onFocus?: () => void;
    onBlur?: () => void;
    editorDidMount?: (editor: any, monaco: any) => void;
    editorWillMount?: (monaco: any) => void;
    editorWillUnmount?: (editor: any, monaco: any) => void;
    editorFactory?: (conatainer: HTMLElement, monaco: any, options: any) => any;
    requireConfig: {
        url: string;
        paths?: any;
        [propName: string]: any;
    };
}
export declare class Editor extends React.Component<EditorProps, any> {
    static defaultProps: {
        requireConfig: {
            url: string;
            'vs/nls': {
                availableLanguages: {
                    '*': string;
                };
            };
            paths: {};
        };
        language: string;
        editorTheme: string;
        width: string;
        height: string;
        options: {};
    };
    editor: any;
    container: any;
    currentValue: any;
    preventTriggerChangeEvent: boolean;
    disposes: Array<{
        dispose: () => void;
    }>;
    constructor(props: EditorProps);
    componentWillReceiveProps(nextProps: EditorProps): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    wrapperRef(ref: any): void;
    loadMonaco(): void;
    initMonaco(): void;
    editorWillMount(monaco: any): void;
    editorDidMount(editor: any, monaco: any): void;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<Pick<EditorProps, "style" | "context" | "value" | "className" | "classPrefix" | "classnames" | "defaultValue" | "onFocus" | "onBlur" | "onChange" | "editorDidMount" | "editorWillMount" | "editorWillUnmount" | "editorFactory"> & Partial<Pick<EditorProps, "options" | "height" | "width" | "language" | "editorTheme" | "requireConfig">> & Partial<Pick<{
    requireConfig: {
        url: string;
        'vs/nls': {
            availableLanguages: {
                '*': string;
            };
        };
        paths: {};
    };
    language: string;
    editorTheme: string;
    width: string;
    height: string;
    options: {};
}, never>>, "style" | "context" | "value" | "options" | "className" | "height" | "width" | "defaultValue" | "onFocus" | "onBlur" | "onChange" | "language" | "editorTheme" | "editorDidMount" | "editorWillMount" | "editorWillUnmount" | "editorFactory" | "requireConfig"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof Editor;
};
export default _default;
