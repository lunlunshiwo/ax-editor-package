import React from 'react';
import { FormControlProps } from './Item';
export interface FormulaProps extends FormControlProps {
    formula?: string;
    initSet?: boolean;
    autoSet?: boolean;
    condition?: string;
}
export default class FormulaControl extends React.Component<FormControlProps, any> {
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: FormControlProps): void;
    doAction(): void;
    render(): null;
}
export declare class FormulaControlRenderer extends FormulaControl {
}
