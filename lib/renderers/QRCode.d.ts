import React from 'react';
import { FormControlProps } from './Form/Item';
export interface QRCodeProps extends FormControlProps {
    codeSize?: number;
    backgroundColor?: string;
    foregroundColor?: string;
    level?: string;
    placeholder: string;
}
export default class QRCode extends React.Component<QRCodeProps, any> {
    static defaultProps: Partial<QRCodeProps>;
    render(): JSX.Element;
}
export declare class QRCodeRenderer extends QRCode {
}
export declare class QRCodeControlRenderer extends QRCode {
}
