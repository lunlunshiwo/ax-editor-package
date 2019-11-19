import React from 'react';
import { FormControlProps } from './Item';
import moment from 'moment';
import 'moment/locale/zh-cn';
export interface DateRangeProps extends FormControlProps {
    placeholder?: string;
    disabled?: boolean;
    format: string;
    joinValues: boolean;
    delimiter: string;
    minDate?: any;
    maxDate?: any;
}
interface DateControlState {
    minDate?: moment.Moment;
    maxDate?: moment.Moment;
}
export default class DateRangeControl extends React.Component<DateRangeProps, DateControlState> {
    static defaultProps: {
        format: string;
        joinValues: boolean;
        delimiter: string;
    };
    constructor(props: DateRangeProps);
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: DateRangeProps): void;
    componentDidUpdate(prevProps: DateRangeProps): void;
    render(): JSX.Element;
}
export declare class DateRangeControlRenderer extends DateRangeControl {
    static defaultProps: {
        timeFormat: string;
        format: string;
        joinValues: boolean;
        delimiter: string;
    };
}
export declare class DateTimeRangeControlRenderer extends DateRangeControl {
    static defaultProps: {
        timeFormat: string;
        inputFormat: string;
        format: string;
        joinValues: boolean;
        delimiter: string;
    };
}
export {};
