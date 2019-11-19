import React from 'react';
import { OptionsControlProps, Option } from './Options';
import { Api } from '../../types';
export interface SelectProps extends OptionsControlProps {
    autoComplete?: Api;
    searchable?: boolean;
}
export default class SelectControl extends React.Component<SelectProps, any> {
    static defaultProps: Partial<SelectProps>;
    input: any;
    cache: {
        [propName: string]: any;
    };
    constructor(props: SelectProps);
    inputRef(ref: any): void;
    foucs(): void;
    changeValue(value: Option | Array<Option> | void): void;
    loadRemote(input: string): false | Promise<{
        options: object[];
    }>;
    mergeOptions(options: Array<object>): object[];
    reload(): void;
    render(): JSX.Element;
}
export declare class SelectControlRenderer extends SelectControl {
}
export declare class MultiSelectControlRenderer extends SelectControl {
    static defaultProps: {
        multiple: boolean;
    };
}
