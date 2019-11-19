import React from 'react';
import { FormControlProps } from './Item';
export interface RatingProps extends FormControlProps {
    value: number;
    count: number;
    half: boolean;
    readOnly: boolean;
}
export default class RatingControl extends React.Component<RatingProps, any> {
    static defaultProps: Partial<RatingProps>;
    render(): JSX.Element;
}
export declare class RatingControlRenderer extends RatingControl {
}
