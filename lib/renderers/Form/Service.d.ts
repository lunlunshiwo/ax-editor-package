import React from 'react';
import BasicService from '../Service';
import { IScopedContext } from '../../Scoped';
export declare class ServiceRenderer extends BasicService {
    static contextType: React.Context<IScopedContext>;
    componentWillMount(): void;
    componentWillUnmount(): void;
    renderBody(): JSX.Element;
}
