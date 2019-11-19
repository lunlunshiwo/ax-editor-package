import React from 'react';
import { RendererProps } from '../factory';
import { IServiceStore } from '../store/service';
import { Api, Action } from '../types';
import { IScopedContext } from '../Scoped';
export interface ChartProps extends RendererProps {
    chartRef?: (echart: any) => void;
    onDataFilter?: (config: any) => any;
    api?: Api;
    source?: string;
    config?: object;
    initFetch?: boolean;
    store: IServiceStore;
    clickAction?: Action;
    replaceChartOption: boolean;
}
export declare class Chart extends React.Component<ChartProps> {
    static defaultProps: Partial<ChartProps>;
    static propsList: Array<string>;
    ref: any;
    echarts: any;
    unSensor: Function;
    pending?: object;
    timer: number;
    mounted: boolean;
    reloadCancel: Function;
    constructor(props: ChartProps);
    componentWillMount(): void;
    componentDidUpdate(prevProps: ChartProps): void;
    componentWillUnmount(): void;
    handleClick(ctx: object): void;
    refFn(ref: any): void;
    reload(query?: any): void;
    receive(data: object): void;
    renderChart(config?: object): void;
    render(): JSX.Element;
}
export declare class ChartRenderer extends Chart {
    static contextType: React.Context<IScopedContext>;
    componentWillMount(): void;
    componentWillUnmount(): void;
}
