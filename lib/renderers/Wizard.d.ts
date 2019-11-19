import React from 'react';
import { IScopedContext } from '../Scoped';
import { RendererProps } from '../factory';
import { IServiceStore } from '../store/service';
import { Action } from '../types';
export interface WizardProps extends RendererProps {
    store: IServiceStore;
    readOnly?: boolean;
    actionClassName?: string;
    actionPrevLabel?: string;
    actionNextLabel?: string;
    actionNextSaveLabel?: string;
    actionFinishLabel?: string;
    mode?: 'horizontal' | 'vertical';
    onFinished: (values: object, action: any) => any;
}
export interface WizardState {
    currentStep: number;
}
export default class Wizard extends React.Component<WizardProps, WizardState> {
    static defaultProps: Partial<WizardProps>;
    static propsList: Array<string>;
    dom: any;
    form: any;
    asyncCancel: () => void;
    constructor(props: WizardProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: WizardProps): void;
    componentWillUnmount(): void;
    gotoStep(index: number): void;
    formRef(ref: any): void;
    submitToTarget(target: string, values: object): void;
    reloadTarget(target: string, data: any): void;
    domRef(ref: any): void;
    getPopOverContainer(): any;
    checkSubmit(): void;
    handleAction(e: React.UIEvent<any> | void, action: Action, data: object, throwErrors?: boolean): void | Promise<void>;
    openFeedback(dialog: any, ctx: any): Promise<{}>;
    handleChange(values: object): void;
    handleSubmit(values: object, action: Action): boolean;
    handleDialogConfirm(values: object[], action: Action, ctx: any, targets: Array<any>): void;
    handleDialogClose(): void;
    renderSteps(): JSX.Element;
    renderActions(): JSX.Element | null;
    render(): JSX.Element;
}
export declare class WizardRenderer extends Wizard {
    static contextType: React.Context<IScopedContext>;
    componentWillMount(): void;
    componentWillUnmount(): void;
    doAction(action: Action, data: object, throwErrors?: boolean): void | Promise<void>;
    submitToTarget(target: string, values: object): void;
    reloadTarget(target: string, data: any): void;
    handleDialogConfirm(values: object[], action: Action, ctx: any, targets: Array<any>): void;
}
