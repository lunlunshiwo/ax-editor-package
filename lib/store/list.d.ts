import { SnapshotIn } from 'mobx-state-tree';
export declare const Item: import("mobx-state-tree").IModelType<{
    id: import("mobx-state-tree").ISimpleType<string>;
    pristine: import("mobx-state-tree").IType<any, any, any>;
    data: import("mobx-state-tree").IType<any, any, any>;
    index: import("mobx-state-tree").ISimpleType<number>;
    newIndex: import("mobx-state-tree").ISimpleType<number>;
}, {
    readonly checked: boolean;
    readonly modified: boolean;
    readonly moved: boolean;
    readonly locals: any;
    readonly checkable: boolean;
    readonly draggable: boolean;
} & {
    toggle(): void;
    change(values: object, savePristine?: boolean | undefined): void;
    reset(): void;
}, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>;
export declare type IItem = typeof Item.Type;
export declare type SItem = SnapshotIn<typeof Item>;
export declare const ListStore: import("mobx-state-tree").IModelType<{
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
    items: import("mobx-state-tree").IArrayType<import("mobx-state-tree").IModelType<{
        id: import("mobx-state-tree").ISimpleType<string>;
        pristine: import("mobx-state-tree").IType<any, any, any>;
        data: import("mobx-state-tree").IType<any, any, any>;
        index: import("mobx-state-tree").ISimpleType<number>;
        newIndex: import("mobx-state-tree").ISimpleType<number>;
    }, {
        readonly checked: boolean;
        readonly modified: boolean;
        readonly moved: boolean;
        readonly locals: any;
        readonly checkable: boolean;
        readonly draggable: boolean;
    } & {
        toggle(): void;
        change(values: object, savePristine?: boolean | undefined): void;
        reset(): void;
    }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>;
    selectedItems: import("mobx-state-tree").IArrayType<import("mobx-state-tree").IReferenceType<import("mobx-state-tree").IModelType<{
        id: import("mobx-state-tree").ISimpleType<string>;
        pristine: import("mobx-state-tree").IType<any, any, any>;
        data: import("mobx-state-tree").IType<any, any, any>;
        index: import("mobx-state-tree").ISimpleType<number>;
        newIndex: import("mobx-state-tree").ISimpleType<number>;
    }, {
        readonly checked: boolean;
        readonly modified: boolean;
        readonly moved: boolean;
        readonly locals: any;
        readonly checkable: boolean;
        readonly draggable: boolean;
    } & {
        toggle(): void;
        change(values: object, savePristine?: boolean | undefined): void;
        reset(): void;
    }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>>;
    primaryField: import("mobx-state-tree").IType<string | undefined, string, string>;
    orderBy: import("mobx-state-tree").IType<string | undefined, string, string>;
    orderDir: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").ITypeUnion<"desc" | "asc", "desc" | "asc", "desc" | "asc">, [undefined]>;
    draggable: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    dragging: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    multiple: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    selectable: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    itemCheckableOn: import("mobx-state-tree").IType<string | undefined, string, string>;
    itemDraggableOn: import("mobx-state-tree").IType<string | undefined, string, string>;
    hideCheckToggler: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
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
    readonly allChecked: boolean;
    readonly checkableItems: (import("mobx-state-tree").ModelInstanceTypeProps<{
        id: import("mobx-state-tree").ISimpleType<string>;
        pristine: import("mobx-state-tree").IType<any, any, any>;
        data: import("mobx-state-tree").IType<any, any, any>;
        index: import("mobx-state-tree").ISimpleType<number>;
        newIndex: import("mobx-state-tree").ISimpleType<number>;
    }> & {
        readonly checked: boolean;
        readonly modified: boolean;
        readonly moved: boolean;
        readonly locals: any;
        readonly checkable: boolean;
        readonly draggable: boolean;
    } & {
        toggle(): void;
        change(values: object, savePristine?: boolean | undefined): void;
        reset(): void;
    } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
        id: import("mobx-state-tree").ISimpleType<string>;
        pristine: import("mobx-state-tree").IType<any, any, any>;
        data: import("mobx-state-tree").IType<any, any, any>;
        index: import("mobx-state-tree").ISimpleType<number>;
        newIndex: import("mobx-state-tree").ISimpleType<number>;
    }, {
        readonly checked: boolean;
        readonly modified: boolean;
        readonly moved: boolean;
        readonly locals: any;
        readonly checkable: boolean;
        readonly draggable: boolean;
    } & {
        toggle(): void;
        change(values: object, savePristine?: boolean | undefined): void;
        reset(): void;
    }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>)[];
    readonly unSelectedItems: (import("mobx-state-tree").ModelInstanceTypeProps<{
        id: import("mobx-state-tree").ISimpleType<string>;
        pristine: import("mobx-state-tree").IType<any, any, any>;
        data: import("mobx-state-tree").IType<any, any, any>;
        index: import("mobx-state-tree").ISimpleType<number>;
        newIndex: import("mobx-state-tree").ISimpleType<number>;
    }> & {
        readonly checked: boolean;
        readonly modified: boolean;
        readonly moved: boolean;
        readonly locals: any;
        readonly checkable: boolean;
        readonly draggable: boolean;
    } & {
        toggle(): void;
        change(values: object, savePristine?: boolean | undefined): void;
        reset(): void;
    } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
        id: import("mobx-state-tree").ISimpleType<string>;
        pristine: import("mobx-state-tree").IType<any, any, any>;
        data: import("mobx-state-tree").IType<any, any, any>;
        index: import("mobx-state-tree").ISimpleType<number>;
        newIndex: import("mobx-state-tree").ISimpleType<number>;
    }, {
        readonly checked: boolean;
        readonly modified: boolean;
        readonly moved: boolean;
        readonly locals: any;
        readonly checkable: boolean;
        readonly draggable: boolean;
    } & {
        toggle(): void;
        change(values: object, savePristine?: boolean | undefined): void;
        reset(): void;
    }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>)[];
    isSelected: (item: import("mobx-state-tree").ModelInstanceTypeProps<{
        id: import("mobx-state-tree").ISimpleType<string>;
        pristine: import("mobx-state-tree").IType<any, any, any>;
        data: import("mobx-state-tree").IType<any, any, any>;
        index: import("mobx-state-tree").ISimpleType<number>;
        newIndex: import("mobx-state-tree").ISimpleType<number>;
    }> & {
        readonly checked: boolean;
        readonly modified: boolean;
        readonly moved: boolean;
        readonly locals: any;
        readonly checkable: boolean;
        readonly draggable: boolean;
    } & {
        toggle(): void;
        change(values: object, savePristine?: boolean | undefined): void;
        reset(): void;
    } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
        id: import("mobx-state-tree").ISimpleType<string>;
        pristine: import("mobx-state-tree").IType<any, any, any>;
        data: import("mobx-state-tree").IType<any, any, any>;
        index: import("mobx-state-tree").ISimpleType<number>;
        newIndex: import("mobx-state-tree").ISimpleType<number>;
    }, {
        readonly checked: boolean;
        readonly modified: boolean;
        readonly moved: boolean;
        readonly locals: any;
        readonly checkable: boolean;
        readonly draggable: boolean;
    } & {
        toggle(): void;
        change(values: object, savePristine?: boolean | undefined): void;
        reset(): void;
    }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>) => boolean;
    readonly modified: number;
    readonly modifiedItems: (import("mobx-state-tree").ModelInstanceTypeProps<{
        id: import("mobx-state-tree").ISimpleType<string>;
        pristine: import("mobx-state-tree").IType<any, any, any>;
        data: import("mobx-state-tree").IType<any, any, any>;
        index: import("mobx-state-tree").ISimpleType<number>;
        newIndex: import("mobx-state-tree").ISimpleType<number>;
    }> & {
        readonly checked: boolean;
        readonly modified: boolean;
        readonly moved: boolean;
        readonly locals: any;
        readonly checkable: boolean;
        readonly draggable: boolean;
    } & {
        toggle(): void;
        change(values: object, savePristine?: boolean | undefined): void;
        reset(): void;
    } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
        id: import("mobx-state-tree").ISimpleType<string>;
        pristine: import("mobx-state-tree").IType<any, any, any>;
        data: import("mobx-state-tree").IType<any, any, any>;
        index: import("mobx-state-tree").ISimpleType<number>;
        newIndex: import("mobx-state-tree").ISimpleType<number>;
    }, {
        readonly checked: boolean;
        readonly modified: boolean;
        readonly moved: boolean;
        readonly locals: any;
        readonly checkable: boolean;
        readonly draggable: boolean;
    } & {
        toggle(): void;
        change(values: object, savePristine?: boolean | undefined): void;
        reset(): void;
    }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>)[];
    readonly moved: number;
    readonly movedItems: (import("mobx-state-tree").ModelInstanceTypeProps<{
        id: import("mobx-state-tree").ISimpleType<string>;
        pristine: import("mobx-state-tree").IType<any, any, any>;
        data: import("mobx-state-tree").IType<any, any, any>;
        index: import("mobx-state-tree").ISimpleType<number>;
        newIndex: import("mobx-state-tree").ISimpleType<number>;
    }> & {
        readonly checked: boolean;
        readonly modified: boolean;
        readonly moved: boolean;
        readonly locals: any;
        readonly checkable: boolean;
        readonly draggable: boolean;
    } & {
        toggle(): void;
        change(values: object, savePristine?: boolean | undefined): void;
        reset(): void;
    } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
        id: import("mobx-state-tree").ISimpleType<string>;
        pristine: import("mobx-state-tree").IType<any, any, any>;
        data: import("mobx-state-tree").IType<any, any, any>;
        index: import("mobx-state-tree").ISimpleType<number>;
        newIndex: import("mobx-state-tree").ISimpleType<number>;
    }, {
        readonly checked: boolean;
        readonly modified: boolean;
        readonly moved: boolean;
        readonly locals: any;
        readonly checkable: boolean;
        readonly draggable: boolean;
    } & {
        toggle(): void;
        change(values: object, savePristine?: boolean | undefined): void;
        reset(): void;
    }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>)[];
} & {
    update: (config: Partial<import("mobx-state-tree").ModelCreationType<import("mobx-state-tree/dist/internal").ExtractCFromProps<{
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
        items: import("mobx-state-tree").IArrayType<import("mobx-state-tree").IModelType<{
            id: import("mobx-state-tree").ISimpleType<string>;
            pristine: import("mobx-state-tree").IType<any, any, any>;
            data: import("mobx-state-tree").IType<any, any, any>;
            index: import("mobx-state-tree").ISimpleType<number>;
            newIndex: import("mobx-state-tree").ISimpleType<number>;
        }, {
            readonly checked: boolean;
            readonly modified: boolean;
            readonly moved: boolean;
            readonly locals: any;
            readonly checkable: boolean;
            readonly draggable: boolean;
        } & {
            toggle(): void;
            change(values: object, savePristine?: boolean | undefined): void;
            reset(): void;
        }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>;
        selectedItems: import("mobx-state-tree").IArrayType<import("mobx-state-tree").IReferenceType<import("mobx-state-tree").IModelType<{
            id: import("mobx-state-tree").ISimpleType<string>;
            pristine: import("mobx-state-tree").IType<any, any, any>;
            data: import("mobx-state-tree").IType<any, any, any>;
            index: import("mobx-state-tree").ISimpleType<number>;
            newIndex: import("mobx-state-tree").ISimpleType<number>;
        }, {
            readonly checked: boolean;
            readonly modified: boolean;
            readonly moved: boolean;
            readonly locals: any;
            readonly checkable: boolean;
            readonly draggable: boolean;
        } & {
            toggle(): void;
            change(values: object, savePristine?: boolean | undefined): void;
            reset(): void;
        }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>>;
        primaryField: import("mobx-state-tree").IType<string | undefined, string, string>;
        orderBy: import("mobx-state-tree").IType<string | undefined, string, string>;
        orderDir: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").ITypeUnion<"desc" | "asc", "desc" | "asc", "desc" | "asc">, [undefined]>;
        draggable: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
        dragging: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
        multiple: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
        selectable: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
        itemCheckableOn: import("mobx-state-tree").IType<string | undefined, string, string>;
        itemDraggableOn: import("mobx-state-tree").IType<string | undefined, string, string>;
        hideCheckToggler: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    }>>>) => void;
    initItems: (items: object[]) => void;
    updateSelected: (selected: any[], valueField?: string | undefined) => void;
    toggleAll: () => void;
    toggle: (item: import("mobx-state-tree").ModelInstanceTypeProps<{
        id: import("mobx-state-tree").ISimpleType<string>;
        pristine: import("mobx-state-tree").IType<any, any, any>;
        data: import("mobx-state-tree").IType<any, any, any>;
        index: import("mobx-state-tree").ISimpleType<number>;
        newIndex: import("mobx-state-tree").ISimpleType<number>;
    }> & {
        readonly checked: boolean;
        readonly modified: boolean;
        readonly moved: boolean;
        readonly locals: any;
        readonly checkable: boolean;
        readonly draggable: boolean;
    } & {
        toggle(): void;
        change(values: object, savePristine?: boolean | undefined): void;
        reset(): void;
    } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
        id: import("mobx-state-tree").ISimpleType<string>;
        pristine: import("mobx-state-tree").IType<any, any, any>;
        data: import("mobx-state-tree").IType<any, any, any>;
        index: import("mobx-state-tree").ISimpleType<number>;
        newIndex: import("mobx-state-tree").ISimpleType<number>;
    }, {
        readonly checked: boolean;
        readonly modified: boolean;
        readonly moved: boolean;
        readonly locals: any;
        readonly checkable: boolean;
        readonly draggable: boolean;
    } & {
        toggle(): void;
        change(values: object, savePristine?: boolean | undefined): void;
        reset(): void;
    }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>) => void;
    clear: () => void;
    setOrderByInfo: (key: string, direction: "desc" | "asc") => void;
    reset: () => void;
    toggleDragging: () => void;
    stopDragging: () => void;
    exchange: (fromIndex: number, toIndex: number) => void;
}, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>;
export declare type IListStore = typeof ListStore.Type;
export declare type SListStore = SnapshotIn<typeof ListStore>;
