import React from 'react';
import { OptionsControlProps, Option } from './Options';
import { Api } from '../../types';
export interface ChainedSelectProps extends OptionsControlProps {
    autoComplete?: Api;
    searchable?: boolean;
}
export interface SelectState {
    stack: Array<{
        options: Array<Option>;
        parentId: any;
        loading: boolean;
        visible?: boolean;
    }>;
}
export default class ChainedSelectControl extends React.Component<ChainedSelectProps, SelectState> {
    static defaultProps: Partial<ChainedSelectProps>;
    state: SelectState;
    constructor(props: ChainedSelectProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: ChainedSelectProps): void;
    componentDidUpdate(prevProps: ChainedSelectProps): void;
    loadMore(): void;
    handleChange(index: number, currentValue: any): void;
    reload(): void;
    render(): JSX.Element;
}
export declare class ChainedSelectControlRenderer extends ChainedSelectControl {
}
