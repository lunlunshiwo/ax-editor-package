/**
 * @file Overlay
 * @description
 * @author fex
 */
import React from 'react';
interface OverlayProps {
    placement?: string;
    show?: boolean;
    rootClose?: boolean;
    onHide?(props: any, ...args: any[]): any;
    container?: React.ReactNode | Function;
    target?: React.ReactNode | Function;
}
export default class Overlay extends React.Component<OverlayProps> {
    static defaultProps: {
        placement: string;
    };
    constructor(props: OverlayProps);
    render(): JSX.Element;
}
export {};
