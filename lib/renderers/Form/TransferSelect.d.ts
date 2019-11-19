import React from 'react';
import { OptionsControlProps, Option } from './Options';
export interface TransferSelectProps extends OptionsControlProps {
    viewMode?: 'table' | 'normal';
    labelField: string;
    valueField: string;
    searchField: string;
    searchPlaceholder: string;
    columns: Array<any>;
    allTitle: string;
    selectedTitle: string;
    searchable: boolean;
}
export interface TransferSelectState {
    filteredOptions: Array<Option>;
    keyword: string;
}
export declare class TransferSelect extends React.Component<TransferSelectProps, TransferSelectState> {
    static defaultProps: {
        viewMode: string;
        multiple: boolean;
        labelField: string;
        valueField: string;
        searchField: string;
        searchPlaceholder: string;
        allTitle: string;
        selectedTitle: string;
        columns: never[];
        searchable: boolean;
    };
    constructor(props: TransferSelectProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: TransferSelectProps): void;
    handleCheck(checkedItem: Option | any): void;
    handleCheckAll(): void;
    handleClear(): void;
    handleSearch(e: React.ChangeEvent<HTMLInputElement>): void;
    reload(): void;
    renderTable(): JSX.Element;
    renderNormal(): JSX.Element;
    renderAction(): JSX.Element;
    renderTableSelectedOptions(): JSX.Element;
    renderNormalSelectedOptions(): JSX.Element;
    render(): JSX.Element;
}
export declare class TransferSelectControlRenderer extends TransferSelect {
}
