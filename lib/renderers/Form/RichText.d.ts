import React from 'react';
import { FormControlProps } from './Item';
export interface RichTextProps extends FormControlProps {
    options?: any;
}
export default class RichTextControl extends React.Component<RichTextProps, any> {
    static defaultProps: Partial<RichTextProps>;
    state: {
        focused: boolean;
    };
    config: any;
    constructor(props: RichTextProps);
    handleFocus(): void;
    handleBlur(): void;
    render(): JSX.Element;
}
export declare class RichTextControlRenderer extends RichTextControl {
}
