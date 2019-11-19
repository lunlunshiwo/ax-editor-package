"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mobx_state_tree_1 = require("mobx-state-tree");
require("setimmediate");
var iRenderer_1 = require("./iRenderer");
exports.iRendererStore = iRenderer_1.iRendererStore;
exports.IIRendererStore = iRenderer_1.IIRendererStore;
var service_1 = require("./service");
var combo_1 = require("./combo");
var form_1 = require("./form");
var crud_1 = require("./crud");
var table_1 = require("./table");
var list_1 = require("./list");
var modal_1 = require("./modal");
mobx_state_tree_1.setLivelynessChecking(process.env.NODE_ENV === 'production' ? 'ignore' : 'error');
var allowedStoreList = [
    service_1.ServiceStore,
    form_1.FormStore,
    combo_1.ComboStore,
    crud_1.CRUDStore,
    table_1.TableStore,
    list_1.ListStore,
    modal_1.ModalStore
];
exports.RendererStore = mobx_state_tree_1.types
    .model('RendererStore', {
    storeType: 'RendererStore',
    stores: mobx_state_tree_1.types.map(mobx_state_tree_1.types.union.apply(mobx_state_tree_1.types, tslib_1.__spreadArrays([{
            eager: false,
            dispatcher: function (snapshort) {
                for (var _i = 0, allowedStoreList_1 = allowedStoreList; _i < allowedStoreList_1.length; _i++) {
                    var storeFactory = allowedStoreList_1[_i];
                    if (storeFactory.name === snapshort.storeType) {
                        return storeFactory;
                    }
                }
                return iRenderer_1.iRendererStore;
            }
        },
        iRenderer_1.iRendererStore], allowedStoreList)))
})
    .views(function (self) { return ({
    get fetcher() {
        return mobx_state_tree_1.getEnv(self).fetcher;
    },
    get notify() {
        return mobx_state_tree_1.getEnv(self).notify;
    },
    get isCancel() {
        return mobx_state_tree_1.getEnv(self).isCancel;
    }
}); })
    .views(function (self) { return ({
    getStoreById: function (id) {
        return self.stores.get(id);
    }
}); })
    .actions(function (self) { return ({
    addStore: function (store) {
        if (self.stores.has(store.id)) {
            return self.stores.get(store.id);
        }
        self.stores.put(store);
        return self.stores.get(store.id);
    },
    removeStore: function (store) {
        mobx_state_tree_1.detach(store);
    }
}); });
//# sourceMappingURL=./store/index.js.map
