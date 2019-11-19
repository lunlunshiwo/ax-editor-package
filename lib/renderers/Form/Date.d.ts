import React from 'react';
import { FormControlProps } from './Item';
import 'moment/locale/zh-cn';
export interface DateProps extends FormControlProps {
    placeholder?: string;
    inputFormat?: string;
    timeFormat?: string;
    format?: string;
    timeConstrainst?: object;
    closeOnSelect?: boolean;
    disabled?: boolean;
    iconClassName?: string;
}
export default class DateControl extends React.PureComponent<DateProps> {
    static defaultProps: {
        format: string;
        viewMode: string;
        inputFormat: string;
        timeConstrainst: {
            minutes: {
                step: number;
            };
        };
        clearable: boolean;
        iconClassName: string;
    };
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: DateProps): void;
    render(): JSX.Element;
}
export declare class DateControlRenderer extends DateControl {
    static defaultProps: {
        placeholder: string;
        dateFormat: string;
        timeFormat: string;
        strictMode: boolean;
        format: string;
        viewMode: string;
        inputFormat: string;
        timeConstrainst: {
            minutes: {
                step: number;
            };
        };
        clearable: boolean;
        iconClassName: string;
    };
}
export declare class DatetimeControlRenderer extends DateControl {
    static defaultProps: {
        placeholder: string;
        inputFormat: string;
        dateFormat: string;
        timeFormat: string;
        closeOnSelect: boolean;
        strictMode: boolean;
        format: string;
        viewMode: string;
        timeConstrainst: {
            minutes: {
                step: number;
            };
        };
        clearable: boolean;
        iconClassName: string;
    };
}
export declare class TimeControlRenderer extends DateControl {
    static defaultProps: {
        placeholder: string;
        inputFormat: string;
        dateFormat: string;
        timeFormat: string;
        viewMode: string;
        closeOnSelect: boolean;
        format: string;
        timeConstrainst: {
            minutes: {
                step: number;
            };
        };
        clearable: boolean;
        iconClassName: string;
    };
}
