import { SnapshotIn } from 'mobx-state-tree';
import { Api, Payload, fetchOptions } from '../types';
export declare const FormItemStore: import("mobx-state-tree").IModelType<{
    identifier: import("mobx-state-tree").ISimpleType<string>;
    isFocused: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    type: import("mobx-state-tree").IType<string | undefined, string, string>;
    unique: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    loading: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    required: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    rules: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IType<any, any, any>, [undefined]>;
    messages: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IType<any, any, any>, [undefined]>;
    errorData: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IArrayType<import("mobx-state-tree").IModelType<{
        msg: import("mobx-state-tree").IType<string | undefined, string, string>;
        tag: import("mobx-state-tree").IType<string | undefined, string, string>;
    }, {}, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>, [undefined]>;
    name: import("mobx-state-tree").ISimpleType<string>;
    id: import("mobx-state-tree").IType<string | undefined, string, string>;
    unsetValueOnInvisible: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    validated: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    validating: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    multiple: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    delimiter: import("mobx-state-tree").IType<string | undefined, string, string>;
    valueField: import("mobx-state-tree").IType<string | undefined, string, string>;
    labelField: import("mobx-state-tree").IType<string | undefined, string, string>;
    joinValues: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    extractValue: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    options: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IArrayType<import("mobx-state-tree").IType<any, any, any>>, [undefined]>;
    expressionsInOptions: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    selectedOptions: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IType<any, any, any>, [undefined]>;
    filteredOptions: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IType<any, any, any>, [undefined]>;
    dialogSchema: import("mobx-state-tree").IType<any, any, any>;
    dialogOpen: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    dialogData: import("mobx-state-tree").IType<any, any, any>;
}, {
    readonly form: any;
    readonly value: any;
    readonly prinstine: any;
    readonly errors: string[];
    readonly valid: boolean;
    readonly lastSelectValue: string;
    getSelectedOptions(value?: any): any;
} & {
    focus: () => void;
    blur: () => void;
    config: ({ required, unique, value, rules, messages, delimiter, multiple, valueField, labelField, joinValues, extractValue, type, id }: {
        required?: any;
        unique?: any;
        value?: any;
        rules?: string | {
            [propName: string]: any;
        } | undefined;
        messages?: {
            [propName: string]: string;
        } | undefined;
        multiple?: boolean | undefined;
        delimiter?: string | undefined;
        valueField?: string | undefined;
        labelField?: string | undefined;
        joinValues?: boolean | undefined;
        extractValue?: boolean | undefined;
        type?: string | undefined;
        id?: string | undefined;
    }) => void;
    changeValue: (value: any, isPrintine?: boolean) => void;
    validate: (hook?: any) => Promise<boolean>;
    setError: (msg: string | string[], tag?: string) => void;
    addError: (msg: string | string[], tag?: string) => void;
    clearError: (tag?: string | undefined) => void;
    setOptions: (options: object[]) => void;
    loadOptions: (api: Api, data?: object | undefined, options?: fetchOptions | undefined, clearValue?: boolean | undefined, onChange?: ((value: any) => void) | undefined) => Promise<Payload | null>;
    syncOptions: (originOptions?: any[] | undefined) => void;
    setLoading: (value: boolean) => void;
    setSubStore: (store: any) => void;
    reset: () => void;
    openDialog: (schema: any, data?: any, callback?: ((ret?: any) => void) | undefined) => void;
    closeDialog: (result?: any) => void;
}, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>;
export declare type IFormItemStore = typeof FormItemStore.Type;
export declare type SFormItemStore = SnapshotIn<typeof FormItemStore>;
