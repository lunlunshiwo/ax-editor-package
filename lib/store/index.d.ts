import 'setimmediate';
import { iRendererStore, IIRendererStore } from './iRenderer';
export declare const RendererStore: import("mobx-state-tree").IModelType<{
    storeType: import("mobx-state-tree").IType<string | undefined, string, string>;
    stores: import("mobx-state-tree").IMapType<import("mobx-state-tree").IAnyType>;
}, {
    readonly fetcher: any;
    readonly notify: any;
    readonly isCancel: (value: any) => boolean;
} & {
    getStoreById(id: string): any;
} & {
    addStore(store: import("mobx-state-tree").ModelSnapshotType<{
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
    }>): import("mobx-state-tree").ModelInstanceTypeProps<{
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
    }> & {
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
    } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
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
    }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>;
    removeStore(store: import("mobx-state-tree").ModelInstanceTypeProps<{
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
    }> & {
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
    } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
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
    }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>): void;
}, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>;
export declare type IRendererStore = typeof RendererStore.Type;
export { iRendererStore, IIRendererStore };
