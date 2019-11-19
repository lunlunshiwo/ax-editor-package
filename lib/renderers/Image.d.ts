import React from 'react';
import { RendererProps } from '../factory';
export interface ImageProps extends RendererProps {
    className?: string;
    imageClassName?: string;
    placeholder?: string;
    description?: string;
}
export declare class ImageField extends React.Component<ImageProps, object> {
    static defaultProps: Partial<ImageProps>;
    render(): JSX.Element;
}
export declare class ImageFieldRenderer extends ImageField {
}
export declare class ImagesFieldRenderer extends ImageField {
    static defaultProps: Partial<ImageProps>;
    render(): JSX.Element;
}
