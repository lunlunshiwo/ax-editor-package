import React from 'react';
import { FormControlProps } from './Item';
import { TableCell } from '../Table';
export interface StaticProps extends FormControlProps {
    placeholder?: string;
    tpl?: string;
    text?: string;
}
export default class StaticControl extends React.Component<StaticProps, any> {
    static defaultProps: {
        placeholder: string;
    };
    constructor(props: StaticProps);
    handleQuickChange(values: any, saveImmediately: boolean | any): void;
    render(): JSX.Element;
}
export declare class StaticControlRenderer extends StaticControl {
}
export declare class StaticFieldRenderer extends TableCell {
    static defaultProps: {
        wrapperComponent: string;
    };
    render(): JSX.Element;
}
