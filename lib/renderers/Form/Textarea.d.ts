import React from 'react';
import { FormControlProps } from './Item';
export interface TextAreaProps extends FormControlProps {
    placeholder?: string;
    minRows?: number;
    maxRows?: number;
}
export default class TextAreaControl extends React.Component<TextAreaProps, any> {
    static defaultProps: Partial<TextAreaProps>;
    input?: HTMLInputElement;
    inputRef: (ref: any) => HTMLInputElement;
    focus(): void;
    handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
    handleFocus(e: React.FocusEvent<HTMLTextAreaElement>): void;
    handleBlur(e: React.FocusEvent<HTMLTextAreaElement>): void;
    render(): JSX.Element;
}
export declare class TextAreaControlRenderer extends TextAreaControl {
}
