import React from 'react';
import { RendererProps } from '../../factory';
import { IFormStore } from '../../store/form';
import { Api, SchemaNode, Action } from '../../types';
import { IScopedContext } from '../../Scoped';
export declare type FormGroup = FormSchema & {
    title?: string;
    className?: string;
};
export declare type FormGroupNode = FormGroup | FormGroupArray;
export interface FormGroupArray extends Array<FormGroupNode> {
}
export interface FormSchema {
    fieldSetClassName?: string;
    tabsClassName?: string;
    controls?: SchemaNode;
    tabs?: FormGroupNode;
    fieldSet?: FormGroupNode;
}
export interface FormHorizontal {
    leftFixed?: boolean | string;
    left: string | number;
    right: string | number;
    offset: string | number;
}
export interface FormProps extends RendererProps, FormSchema {
    store: IFormStore;
    wrapperComponent: React.ReactType;
    title?: string;
    submitText?: string;
    submitOnChange?: boolean;
    submitOnInit?: boolean;
    resetAfterSubmit?: boolean;
    initApi?: Api;
    initAsyncApi?: Api;
    initCheckInterval?: number;
    initFinishedField?: string;
    interval?: number;
    silentPolling?: boolean;
    stopAutoRefreshWhen?: string;
    api?: Api;
    asyncApi?: Api;
    checkInterval?: number;
    finishedField?: string;
    initFetch?: boolean;
    initFetchOn?: string;
    className?: string;
    body?: SchemaNode;
    wrapWithPanel?: boolean;
    panelClassName?: string;
    mode?: 'normal' | 'inline' | 'horizontal' | 'row';
    affixFooter?: boolean;
    collapsable?: boolean;
    debug?: boolean;
    autoFocus?: boolean;
    horizontal: FormHorizontal;
    canAccessSuperData: boolean;
    persistData: boolean;
    clearPersistDataAfterSubmit: boolean;
    trimValues?: boolean;
    onInit?: (values: object) => any;
    onReset?: (values: object) => void;
    onSubmit?: (values: object, action: any) => any;
    onChange?: (values: object, diff: object) => any;
    onFailed?: (reason: string, errors: any) => any;
    onFinished: (values: object, action: any) => any;
    onValidate: (values: object, form: any) => any;
    messages: {
        fetchSuccess?: string;
        fetchFailed?: string;
        saveSuccess?: string;
        saveFailed?: string;
        validateFailed?: string;
    };
}
export default class Form extends React.Component<FormProps, object> {
    static defaultProps: {
        title: string;
        submitText: string;
        initFetch: boolean;
        wrapWithPanel: boolean;
        mode: string;
        collapsable: boolean;
        controlWidth: string;
        horizontal: {
            left: number;
            right: number;
            offset: number;
        };
        panelClassName: string;
        messages: {
            fetchFailed: string;
            saveSuccess: string;
            saveFailed: string;
        };
        wrapperComponent: string;
        finishedField: string;
        initFinishedField: string;
    };
    static propsList: Array<string>;
    hooks: {
        [propName: string]: Array<() => Promise<any>>;
    };
    asyncCancel: () => void;
    disposeOnValidate: () => void;
    shouldLoadInitApi: boolean;
    timer: NodeJS.Timeout;
    mounted: boolean;
    constructor(props: FormProps);
    componentWillMount(): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: FormProps): void;
    componentWillUnmount(): void;
    onInit(): Promise<void>;
    reload(query?: any, silent?: boolean): void;
    receive(values: object): void;
    silentReload(target?: string, query?: any): void;
    initInterval(value: any): any;
    isValidated(): boolean;
    validate(forceValidate?: boolean): Promise<boolean>;
    clearErrors(): void;
    submit(fn?: (values: object) => Promise<any>): Promise<any>;
    reset(): void;
    addHook(fn: () => any, type?: string): () => void;
    removeHook(fn: () => any, type?: string): void;
    handleChange(value: any, name: string, submit: boolean): void;
    handleFormSubmit(e: React.UIEvent<any>): any;
    handleAction(e: React.UIEvent<any> | void, action: Action, data: object, throwErrors?: boolean, delegate?: boolean): any;
    handleDialogConfirm(values: object[], action: Action, ctx: any, targets: Array<any>): void;
    handleDialogClose(): void;
    handleDrawerConfirm(values: object[], action: Action, ctx: any, targets: Array<any>): void;
    handleDrawerClose(): void;
    submitToTarget(target: string, values: object): void;
    reloadTarget(target: string, data?: any): void;
    openFeedback(dialog: any, ctx: any): Promise<{}>;
    buildActions(): any;
    renderFormItems(schema: FormSchema, region?: string, otherProps?: Partial<FormProps>): React.ReactNode;
    renderControls(controls: SchemaNode, region: string, otherProps?: Partial<FormProps>): React.ReactNode;
    renderControl(control: SchemaNode, key?: any, otherProps?: Partial<FormProps>, region?: string): React.ReactNode;
    renderBody(): React.ReactNode;
    render(): JSX.Element;
}
export declare class FormRenderer extends Form {
    static contextType: React.Context<IScopedContext>;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    doAction(action: Action, data: object, throwErrors?: boolean): any;
    handleAction(e: React.UIEvent<any> | undefined, action: Action, ctx: object, throwErrors?: boolean, delegate?: boolean): any;
    handleDialogConfirm(values: object[], action: Action, ctx: any, targets: Array<any>): void;
    submitToTarget(target: string, values: object): void;
    reloadTarget(target: string, data: any): void;
    reload(target?: string, query?: any, ctx?: any): void;
    receive(values: object, name?: string): void;
}
