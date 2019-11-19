import React from 'react';
import { FormControlProps } from './Item';
import { Button } from '../../types';
export interface ButtonProps extends FormControlProps, Button {
}
export declare class ButtonControl extends React.Component<ButtonProps, any> {
    static defaultProps: Partial<ButtonProps>;
    render(): JSX.Element;
}
export declare class ButtonControlRenderer extends ButtonControl {
}
export declare class SubmitControlRenderer extends ButtonControl {
}
export declare class ResetControlRenderer extends ButtonControl {
}
