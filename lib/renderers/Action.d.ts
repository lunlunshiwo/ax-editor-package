import React from 'react';
import { RendererProps } from '../factory';
import { ClassNamesFn } from '../theme';
import { Omit } from '../types';
export interface ActionProps {
    className?: string;
    type: 'submit' | 'reset' | 'button';
    actionType?: string;
    label?: string;
    icon?: string;
    iconClassName?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    level?: 'info' | 'success' | 'warning' | 'danger' | 'link';
    onAction?: (e: React.MouseEvent<any> | void | null, action: object) => void;
    isCurrentUrl?: (link: string) => boolean;
    onClick?: (e: React.MouseEvent<any>, props: any) => void;
    primary?: boolean;
    activeClassName: string;
    componentClass: React.ReactType;
    tooltipPlacement: 'bottom' | 'top' | 'right' | 'left' | undefined;
    disabled?: boolean;
    block?: boolean;
    data?: any;
    link?: string;
    disabledTip?: string;
    tooltip?: any;
    isMenuItem?: boolean;
    active?: boolean;
    activeLevel?: string;
    tooltipContainer?: any;
    classPrefix: string;
    classnames: ClassNamesFn;
}
export declare class Action extends React.Component<ActionProps> {
    static defaultProps: Pick<ActionProps, 'type' | 'componentClass' | 'tooltipPlacement' | 'activeClassName'>;
    dom: any;
    handleAction(e: React.MouseEvent<any>): void;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<Pick<ActionProps, "link" | "active" | "disabled" | "data" | "label" | "size" | "block" | "icon" | "tooltip" | "className" | "classPrefix" | "classnames" | "onClick" | "level" | "tooltipContainer" | "disabledTip" | "primary" | "iconClassName" | "onAction" | "actionType" | "isMenuItem" | "isCurrentUrl" | "activeLevel"> & Partial<Pick<ActionProps, "type" | "componentClass" | "tooltipPlacement" | "activeClassName">> & Partial<Pick<Pick<ActionProps, "type" | "componentClass" | "tooltipPlacement" | "activeClassName">, never>>, "link" | "active" | "disabled" | "data" | "label" | "size" | "block" | "icon" | "tooltip" | "type" | "className" | "onClick" | "level" | "componentClass" | "tooltipContainer" | "disabledTip" | "primary" | "iconClassName" | "onAction" | "tooltipPlacement" | "actionType" | "isMenuItem" | "isCurrentUrl" | "activeClassName" | "activeLevel"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof Action;
};
export default _default;
export declare class ActionRenderer extends React.Component<RendererProps & Omit<ActionProps, 'onAction' | 'isCurrentUrl' | 'tooltipContainer'> & {
    onAction: (e: React.MouseEvent<any> | void | null, action: object, data: any) => void;
    btnDisabled?: boolean;
}> {
    handleAction(e: React.MouseEvent<any> | void | null, action: any): void;
    isCurrentAction(link: string): boolean;
    render(): JSX.Element;
}
export declare class ButtonRenderer extends ActionRenderer {
}
export declare class SubmitRenderer extends ActionRenderer {
}
export declare class ResetRenderer extends ActionRenderer {
}
