import React from 'react';
import { FormControlProps } from './Item';
import { Button } from '../../types';
export interface ButtonToolbarProps extends FormControlProps {
    buttons?: Array<Button>;
}
export declare class ButtonToolbarControl extends React.Component<ButtonToolbarProps> {
    static defaultProps: {};
    render(): JSX.Element;
}
export declare class ButtonToolbarRenderer extends ButtonToolbarControl {
}
