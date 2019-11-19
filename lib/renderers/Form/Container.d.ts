/// <reference types="react" />
import Container from '../Container';
import { FormControlProps } from './Item';
export interface ContainerProps extends FormControlProps {
}
export declare class ContainerControlRenderer extends Container<ContainerProps> {
    renderBody(): JSX.Element | null;
}
