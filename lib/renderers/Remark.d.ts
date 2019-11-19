import React from 'react';
import { RendererProps } from '../factory';
export declare function filterContents(tooltip: string | undefined | {
    title?: string;
    content?: string;
    body?: string;
}, data: any): string | {
    title: string;
    content: string | undefined;
} | undefined;
declare type RemarkProps = {
    icon: string;
    className?: string;
    trigger: Array<string>;
    title?: string;
    content: string;
    placement?: string;
} & RendererProps;
export default class Remark extends React.Component<RemarkProps> {
    static propsList: Array<string>;
    static defaultProps: {
        icon: string;
        trigger: string[];
    };
    render(): JSX.Element;
}
export declare class RemarkRenderer extends Remark {
}
export {};
