import React from 'react';
import { OptionsControlProps, Option } from './Options';
import { Button } from '../../types';
export interface ButtonGroupProps extends OptionsControlProps {
    buttons?: Array<Button>;
    btnLevel: string;
    btnActiveLevel: string;
    btnClassName: string;
    btnActiveClassName: string;
    vertical?: boolean;
}
export default class ButtonGroupControl extends React.Component<ButtonGroupProps, any> {
    static defaultProps: Partial<ButtonGroupProps>;
    handleToggle(option: Option): void;
    reload(): void;
    render(props?: Readonly<ButtonGroupProps> & Readonly<{
        children?: React.ReactNode;
    }>): JSX.Element;
}
export declare class ButtonGroupControlRenderer extends ButtonGroupControl {
    render(): JSX.Element;
}
