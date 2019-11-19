import React from 'react';
import { FormControlProps } from './Item';
import { ClassNamesFn } from '../../theme';
import { Option } from './Options';
export interface CityPickerProps {
    value: any;
    onChange: (value: any) => void;
    extractValue: boolean;
    joinValues?: boolean;
    delimiter: string;
    classnames: ClassNamesFn;
    classPrefix: string;
    className?: string;
    disabled?: boolean;
    allowCity: boolean;
    allowDistrict: boolean;
}
export interface CityPickerState {
    code: number;
    province: string;
    provinceCode: number;
    city: string;
    cityCode: number;
    district: string;
    districtCode: number;
    street: string;
}
export declare class CityPicker extends React.Component<CityPickerProps, CityPickerState> {
    static defaultProps: {
        joinValues: boolean;
        extractValue: boolean;
        delimiter: string;
        allowCity: boolean;
        allowDistrict: boolean;
    };
    state: {
        code: number;
        province: string;
        provinceCode: number;
        city: string;
        cityCode: number;
        district: string;
        districtCode: number;
        street: string;
    };
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: CityPickerProps): void;
    handleProvinceChange(option: Option): void;
    handleCityChange(option: Option): void;
    handleDistrictChange(option: Option, otherStates?: Partial<CityPickerState>): void;
    handleStreetChange(e: React.ChangeEvent<HTMLInputElement>): void;
    handleStreetEnd(): void;
    syncIn(props?: Readonly<CityPickerProps> & Readonly<{
        children?: React.ReactNode;
    }>): void;
    syncOut(): void;
    render(): JSX.Element;
}
declare const ThemedCity: React.ComponentClass<Pick<Pick<CityPickerProps, "disabled" | "value" | "className" | "classPrefix" | "classnames" | "onChange"> & Partial<Pick<CityPickerProps, "delimiter" | "joinValues" | "extractValue" | "allowCity" | "allowDistrict">> & Partial<Pick<{
    joinValues: boolean;
    extractValue: boolean;
    delimiter: string;
    allowCity: boolean;
    allowDistrict: boolean;
}, never>>, "disabled" | "value" | "delimiter" | "joinValues" | "extractValue" | "className" | "onChange" | "allowCity" | "allowDistrict"> & {
    theme?: string | undefined;
    classPrefix?: string | undefined;
    classnames?: ClassNamesFn | undefined;
}, any> & {
    ComposedComponent: typeof CityPicker;
};
export default ThemedCity;
export interface LocationControlProps extends FormControlProps {
    allowCity?: boolean;
    allowDistrict?: boolean;
    extractValue?: boolean;
    joinValues?: boolean;
}
export declare class LocationControl extends React.Component<LocationControlProps> {
    render(): JSX.Element;
}
export declare class CheckboxControlRenderer extends LocationControl {
}
