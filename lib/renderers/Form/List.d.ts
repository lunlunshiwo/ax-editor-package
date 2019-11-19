import React from 'react';
import { OptionsControlProps, Option } from './Options';
import { Schema } from '../../types';
export interface ListProps extends OptionsControlProps {
    imageClassName: string;
    submitOnDBClick?: boolean;
    itemSchema?: Schema;
}
export default class ListControl extends React.Component<ListProps, any> {
    static propsList: string[];
    static defaultProps: {
        clearable: boolean;
        imageClassName: string;
        submitOnDBClick: boolean;
    };
    handleDBClick(option: Option, e: React.MouseEvent<HTMLElement>): void;
    handleClick(option: Option, e: React.MouseEvent<HTMLElement>): void;
    reload(): void;
    render(): JSX.Element;
}
export declare class ListControlRenderer extends ListControl {
}
