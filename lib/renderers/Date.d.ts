import React from 'react';
import { RendererProps } from '../factory';
export interface DateProps extends RendererProps {
    className?: string;
    placeholder?: string;
    format?: string;
    valueFormat?: string;
    fromNow?: boolean;
    updateFrequency?: number;
}
export interface DateState {
    random?: number;
}
export declare class DateField extends React.Component<DateProps, DateState> {
    refreshInterval: NodeJS.Timeout;
    static defaultProps: Partial<DateProps>;
    state: DateState;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export declare class DateFieldRenderer extends DateField {
    static defaultProps: Partial<DateProps>;
}
export declare class DateTimeFieldRenderer extends DateField {
    static defaultProps: Partial<DateProps>;
}
export declare class TimeFieldRenderer extends DateField {
    static defaultProps: Partial<DateProps>;
}
