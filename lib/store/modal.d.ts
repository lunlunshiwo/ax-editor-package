import { SnapshotIn } from 'mobx-state-tree';
export declare const ModalStore: import("mobx-state-tree").IModelType<{
    id: import("mobx-state-tree").ISimpleType<string>;
    path: import("mobx-state-tree").IType<string | undefined, string, string>;
    storeType: import("mobx-state-tree").ISimpleType<string>;
    hasRemoteData: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").ISimpleType<boolean>, [undefined]>;
    data: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IType<any, any, any>, [undefined]>;
    updatedAt: import("mobx-state-tree").IType<number | undefined, number, number>;
    pristine: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IType<any, any, any>, [undefined]>;
    parentId: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").ISimpleType<string>, [undefined]>;
    action: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IType<any, any, any>, [undefined]>;
    dialogOpen: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    dialogData: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IType<any, any, any>, [undefined]>;
    drawerOpen: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    drawerData: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IType<any, any, any>, [undefined]>;
} & {
    msg: import("mobx-state-tree").IType<string | undefined, string, string>;
    error: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    fetching: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    saving: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    busying: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    checking: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    initializing: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    schema: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IType<any, any, any>, [undefined]>;
    schemaKey: import("mobx-state-tree").IType<string | undefined, string, string>;
} & {
    form: import("mobx-state-tree").IType<any, any, any>;
}, {
    readonly parentStore: any;
} & {
    initData(data?: object): void;
    reset(): void;
    updateData(data?: object, tag?: object | undefined): void;
    setCurrentAction(action: object): void;
    openDialog(ctx: any, additonal?: object | undefined, callback?: ((ret: any) => void) | undefined): void;
    closeDialog(result?: any): void;
    openDrawer(ctx: any, additonal?: object | undefined, callback?: ((ret: any) => void) | undefined): void;
    closeDrawer(result?: any): void;
} & {
    readonly loading: boolean;
} & {
    markFetching: (fetching?: boolean) => void;
    markSaving: (saving?: boolean) => void;
    markBusying: (busying?: boolean) => void;
    fetchInitData: (api: import("../types").Api, data?: object | undefined, options?: import("../types").fetchOptions | undefined) => Promise<any>;
    fetchData: (api: import("../types").Api, data?: object | undefined, options?: import("../types").fetchOptions | undefined) => Promise<any>;
    reInitData: (data: object | undefined) => void;
    updateMessage: (msg?: string | undefined, error?: boolean) => void;
    clearMessage: () => void;
    saveRemote: (api: import("../types").Api, data?: object | undefined, options?: import("../types").fetchOptions | undefined) => Promise<any>;
    fetchSchema: (api: import("../types").Api, data?: object | undefined, options?: import("../types").fetchOptions | undefined) => Promise<any>;
    checkRemote: (api: import("../types").Api, data?: object | undefined, options?: import("../types").fetchOptions | undefined) => Promise<any>;
} & {
    readonly formData: object;
} & {
    setFormData(obj: any): void;
}, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>;
export declare type IModalStore = typeof ModalStore.Type;
export declare type SModalStore = SnapshotIn<typeof ModalStore>;
