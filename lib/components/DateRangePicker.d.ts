/**
 * @file DateRangePicker
 * @description 自定义日期范围时间选择器组件
 * @author fex
 */
import React = require('react');
import moment = require('moment');
import { ClassNamesFn } from '../theme';
export interface DateRangePickerProps {
    className?: string;
    classPrefix: string;
    classnames: ClassNamesFn;
    placeholder?: string;
    theme?: any;
    format: string;
    inputFormat?: string;
    ranges?: string;
    clearable?: boolean;
    iconClassName?: string;
    minDate?: moment.Moment;
    maxDate?: moment.Moment;
    joinValues: boolean;
    delimiter: string;
    value: any;
    onChange: (value: any) => void;
    data?: any;
    disabled?: boolean;
    [propName: string]: any;
}
export interface DateRangePickerState {
    isOpened: boolean;
    isFocused: boolean;
    startDate?: moment.Moment;
    endDate?: moment.Moment;
}
export declare class DateRangePicker extends React.Component<DateRangePickerProps, DateRangePickerState> {
    static defaultProps: {
        placeholder: string;
        format: string;
        inputFormat: string;
        joinValues: boolean;
        clearable: boolean;
        delimiter: string;
        ranges: string;
        iconClassName: string;
        resetValue: string;
    };
    innerDom: any;
    popover: any;
    input?: HTMLInputElement;
    static formatValue(newValue: any, format: string, joinValues: boolean, delimiter: string): any;
    static unFormatValue(value: any, format: string, joinValues: boolean, delimiter: string): {
        startDate: moment.Moment | undefined;
        endDate: moment.Moment | undefined;
    };
    dom: React.RefObject<HTMLDivElement>;
    constructor(props: DateRangePickerProps);
    componentWillReceiveProps(nextProps: DateRangePickerProps): void;
    focus(): void;
    blur(): void;
    handleFocus(): void;
    handleBlur(): void;
    open(): void;
    close(): void;
    handleClick(): void;
    handlePopOverClick(e: React.MouseEvent<any>): void;
    handleKeyPress(e: React.KeyboardEvent): void;
    confirm(): void;
    handleStartChange(newValue: any): void;
    handleEndChange(newValue: any): void;
    selectRannge(range: {
        startDate: (now: moment.Moment) => moment.Moment;
        endDate: (now: moment.Moment) => moment.Moment;
    }): void;
    clearValue(e: React.MouseEvent<any>): void;
    checkStartIsValidDate(currentDate: moment.Moment): boolean;
    checkEndIsValidDate(currentDate: moment.Moment): boolean;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<DateRangePickerProps, string | number> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof DateRangePicker;
};
export default _default;
