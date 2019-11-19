/**
 * @file 404
 * @author fex
 */
import React from 'react';
import { ClassNamesFn } from '../theme';
interface NotFoundProps {
    code?: string | number;
    description?: string;
    links?: React.ReactNode;
    footerText?: React.ReactNode;
    classPrefix: string;
    classnames: ClassNamesFn;
}
export declare class NotFound extends React.Component<NotFoundProps, any> {
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<NotFoundProps, "code" | "description" | "links" | "footerText"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof NotFound;
};
export default _default;
