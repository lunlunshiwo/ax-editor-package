import React from 'react';
import { RendererProps } from '../factory';
export interface DropDownButtonProps extends RendererProps {
    block?: boolean;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    align?: 'left' | 'right';
    buttons?: Array<any>;
    caretIcon?: string;
    iconOnly?: boolean;
    defaultIsOpened?: boolean;
    closeOnOutside?: boolean;
}
export interface DropDownButtonState {
    isOpened: boolean;
}
export default class DropDownButton extends React.Component<DropDownButtonProps, DropDownButtonState> {
    state: DropDownButtonState;
    static defaultProps: {
        caretIcon: string;
    };
    target: any;
    constructor(props: DropDownButtonProps);
    domRef(ref: any): void;
    toogle(e: React.MouseEvent<any>): void;
    open(): void;
    close(): void;
    renderOuter(): JSX.Element;
    render(): JSX.Element;
}
export declare class DropDownButtonRenderer extends DropDownButton {
}
