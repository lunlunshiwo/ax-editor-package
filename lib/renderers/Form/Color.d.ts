import React from 'react';
import { FormControlProps } from './Item';
export interface ColorProps extends FormControlProps {
    placeholder?: string;
    format?: string;
    timeConstrainst?: object;
    closeOnSelect?: boolean;
    presetColors?: string[];
}
export interface ColorControlState {
    open: boolean;
}
export default class ColorControl extends React.PureComponent<ColorProps, ColorControlState> {
    static defaultProps: Partial<ColorProps>;
    state: ColorControlState;
    render(): JSX.Element;
}
export declare class ColorControlRenderer extends ColorControl {
}
