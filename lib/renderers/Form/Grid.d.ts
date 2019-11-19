/// <reference types="react" />
import Grid from '../Grid';
import { Schema } from '../../types';
import { FormControlProps } from './Item';
export interface GridProps extends FormControlProps {
}
export declare class GridRenderer extends Grid<GridProps> {
    static propsList: Array<string>;
    static defaultProps: {};
    renderChild(region: string, node: Schema, key: number, length: number): JSX.Element;
}
