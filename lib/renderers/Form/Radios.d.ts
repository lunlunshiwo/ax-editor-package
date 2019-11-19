import React from 'react';
import { OptionsControlProps, Option } from './Options';
export interface RadiosProps extends OptionsControlProps {
    placeholder?: any;
    columnsCount?: number;
    labelClassName?: string;
}
export default class RadiosControl extends React.Component<RadiosProps, any> {
    static defaultProps: Partial<RadiosProps>;
    handleChange(option: Option): void;
    reload(): void;
    render(): JSX.Element;
}
export declare class RadiosControlRenderer extends RadiosControl {
    static defaultProps: {
        multiple: boolean;
    };
}
