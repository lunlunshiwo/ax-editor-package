import React from 'react';
import { OptionsControlProps, Option } from './Options';
export interface CheckboxesProps extends OptionsControlProps {
    placeholder?: any;
    disabled?: boolean;
    itemClassName?: string;
    columnsCount?: number;
    labelClassName?: string;
}
export default class CheckboxesControl extends React.Component<CheckboxesProps, any> {
    static defaultProps: Partial<CheckboxesProps>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: OptionsControlProps): void;
    reload(): void;
    renderGroup(option: Option, index: number): JSX.Element;
    renderItem(option: Option, index: number): JSX.Element;
    render(): JSX.Element;
}
export declare class CheckboxesControlRenderer extends CheckboxesControl {
}
