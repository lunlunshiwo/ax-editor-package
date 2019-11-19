"use strict";
/**
 * @file ModalManager
 * @description
 * @author fex
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var keycode_1 = tslib_1.__importDefault(require("keycode"));
var modals = [];
function current() {
    return modals.length;
}
exports.current = current;
function currentModal() {
    return modals[modals.length - 1];
}
exports.currentModal = currentModal;
function addModal(modal) {
    modals.push(modal);
}
exports.addModal = addModal;
function removeModal() {
    modals.pop();
}
exports.removeModal = removeModal;
window.addEventListener('keydown', handleWindowKeyDown);
function handleWindowKeyDown(e) {
    var code = keycode_1.default(e);
    if (code !== 'esc') {
        return;
    }
    var modal = currentModal();
    if (!modal) {
        return;
    }
    var _a = modal.props, disabled = _a.disabled, closeOnEsc = _a.closeOnEsc;
    if (closeOnEsc && !disabled) {
        modal.props.onHide();
    }
}
//# sourceMappingURL=./components/ModalManager.js.map
