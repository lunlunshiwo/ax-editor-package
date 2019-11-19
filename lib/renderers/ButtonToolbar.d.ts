import React from 'react';
import { RendererProps } from '../factory';
import { Action } from '../types';
export interface ButtonToolbarProps extends RendererProps {
    buttons: Array<Action>;
}
export default class ButtonToolbar extends React.Component<ButtonToolbarProps, object> {
    static propsList: Array<string>;
    render(): JSX.Element;
}
export declare class ButtonToolbarRenderer extends ButtonToolbar {
}
