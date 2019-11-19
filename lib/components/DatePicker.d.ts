/**
 * @file DatePicker
 * @description 时间选择器组件
 * @author fex
 */
import React from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import ReactDatePicker from 'react-datetime';
import { ClassNamesFn } from '../theme';
declare class BaseDatePicker extends ReactDatePicker {
    __hacked: boolean;
    render(): JSX.Element;
}
export interface DateProps {
    viewMode: 'years' | 'months' | 'days' | 'time';
    className?: string;
    classPrefix: string;
    classnames: ClassNamesFn;
    placeholder?: string;
    inputFormat?: string;
    timeFormat?: string;
    format?: string;
    timeConstrainst?: object;
    closeOnSelect?: boolean;
    disabled?: boolean;
    minDate?: moment.Moment;
    maxDate?: moment.Moment;
    minTime?: moment.Moment;
    maxTime?: moment.Moment;
    clearable?: boolean;
    defaultValue?: any;
    utc?: boolean;
    onChange: (value: any) => void;
    value: any;
    shortcuts: string;
    [propName: string]: any;
}
export interface DatePickerState {
    isOpened: boolean;
    isFocused: boolean;
    value: moment.Moment | undefined;
}
export declare class DatePicker extends React.Component<DateProps, DatePickerState> {
    static defaultProps: Pick<DateProps, 'viewMode' | 'shortcuts'>;
    state: DatePickerState;
    constructor(props: DateProps);
    dom: HTMLDivElement;
    componentWillReceiveProps(nextProps: DateProps): void;
    focus(): void;
    handleFocus(): void;
    handleBlur(): void;
    handleKeyPress(e: React.KeyboardEvent): void;
    handleClick(): void;
    handlePopOverClick(e: React.MouseEvent<any>): void;
    open(fn?: () => void): void;
    close(): void;
    clearValue(e: React.MouseEvent<any>): void;
    handleChange(value: moment.Moment): void;
    selectRannge(item: any): void;
    checkIsValidDate(currentDate: moment.Moment): boolean;
    getTarget(): HTMLDivElement;
    getParent(): HTMLDivElement;
    domRef: (ref: HTMLDivElement) => void;
    getAvailableShortcuts(key: string): any;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<DateProps, string | number> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof DatePicker;
};
export default _default;
export { BaseDatePicker };
