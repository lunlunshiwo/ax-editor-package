import React from 'react';
import { RendererProps } from '../factory';
import { Api, Payload } from '../types';
import { IScopedContext } from '../Scoped';
export interface TaskProps extends RendererProps {
    className?: string;
    items: Array<TaskItem>;
    checkApi: Api;
    submitApi: Api;
    reSubmitApi: Api;
    tableClassName?: string;
    taskNameLabel?: string;
    operationLabel?: string;
    statusLabel?: string;
    remarkLabel?: string;
    btnText?: string;
    retryBtnText?: string;
    btnClassName?: string;
    retryBtnClassName?: string;
    statusLabelMap?: Array<string>;
    statusTextMap?: Array<string>;
    initialStatusCode?: any;
    readyStatusCode?: any;
    loadingStatusCode?: any;
    errorStatusCode?: any;
    finishStatusCode?: any;
    canRetryStatusCode?: any;
    interval?: number;
}
export interface TaskItem {
    label?: string;
    key?: string;
    remark?: string;
    status?: any;
}
export interface TaskState {
    error?: string;
    items: Array<TaskItem>;
}
export default class Task extends React.Component<TaskProps, TaskState> {
    static defaultProps: Partial<TaskProps>;
    timer: any;
    constructor(props: TaskProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: TaskProps): void;
    componentDidUpdate(prevProps: TaskProps): void;
    componentWillUnmount(): void;
    reload(): void;
    tick(force?: boolean): void;
    handleLoaded(ret: Payload): void;
    submitTask(item: TaskItem, index: number, retry?: boolean): void;
    render(): JSX.Element;
}
export declare class TaskRenderer extends Task {
    static contextType: React.Context<IScopedContext>;
    componentWillMount(): void;
    componentWillUnmount(): void;
}
