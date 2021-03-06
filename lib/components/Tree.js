"use strict";
/**
 * @file Tree
 * @description 树形组件
 * @author fex
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var helper_1 = require("../utils/helper");
var Checkboxes_1 = require("./Checkboxes");
var theme_1 = require("../theme");
var Options_1 = require("../renderers/Form/Options");
var icons_1 = require("./icons");
var Checkbox_1 = tslib_1.__importDefault(require("./Checkbox"));
var TreeSelector = /** @class */ (function (_super) {
    tslib_1.__extends(TreeSelector, _super);
    function TreeSelector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TreeSelector.prototype.componentWillMount = function () {
        var props = this.props;
        this.setState({
            value: Checkboxes_1.value2array(props.value, {
                joinValues: props.joinValues,
                extractValue: props.extractValue,
                multiple: props.multiple,
                delimiter: props.delimiter,
                valueField: props.valueField,
                options: props.options
            }),
            unfolded: this.syncUnFolded(props),
            inputValue: '',
            addingParent: null,
            isAdding: false,
            isEditing: false,
            editingItem: null
        });
    };
    TreeSelector.prototype.componentWillReceiveProps = function (nextProps) {
        var toUpdate = {};
        if (this.props.value !== nextProps.value ||
            this.props.options !== nextProps.options) {
            toUpdate.value = Checkboxes_1.value2array(nextProps.value, {
                joinValues: nextProps.joinValues,
                extractValue: nextProps.extractValue,
                multiple: nextProps.multiple,
                delimiter: nextProps.delimiter,
                valueField: nextProps.valueField,
                options: nextProps.options
            });
        }
        if (this.props.options !== nextProps.options) {
            toUpdate.unfolded = this.syncUnFolded(nextProps);
        }
        this.setState(toUpdate);
    };
    TreeSelector.prototype.syncUnFolded = function (props) {
        // 初始化树节点的展开状态
        var unfolded = {};
        var _a = this.props, foldedField = _a.foldedField, unfoldedField = _a.unfoldedField;
        helper_1.eachTree(props.options, function (node, index, level) {
            if (node.children && node.children.length) {
                var ret = true;
                if (unfoldedField && typeof node[unfoldedField] !== 'undefined') {
                    ret = !!node[unfoldedField];
                }
                else if (foldedField && typeof node[foldedField] !== 'undefined') {
                    ret = !node[foldedField];
                }
                else {
                    ret = !!props.initiallyOpen;
                    if (!ret && level <= props.unfoldedLevel) {
                        ret = true;
                    }
                }
                unfolded[node[props.valueField]] = ret;
            }
        });
        return unfolded;
    };
    TreeSelector.prototype.toggleUnfolded = function (node) {
        var _a;
        this.setState({
            unfolded: tslib_1.__assign(tslib_1.__assign({}, this.state.unfolded), (_a = {}, _a[node[this.props.valueField]] = !this.state.unfolded[node[this.props.valueField]], _a))
        });
    };
    TreeSelector.prototype.clearSelect = function () {
        var _this = this;
        this.setState({
            value: []
        }, function () {
            var _a = _this.props, joinValues = _a.joinValues, rootValue = _a.rootValue, onChange = _a.onChange;
            onChange(joinValues ? rootValue : []);
        });
    };
    TreeSelector.prototype.handleSelect = function (node, value) {
        var _this = this;
        this.setState({
            value: [node]
        }, function () {
            var _a = _this.props, joinValues = _a.joinValues, valueField = _a.valueField, onChange = _a.onChange;
            onChange(joinValues ? node[valueField] : node);
        });
    };
    TreeSelector.prototype.handleCheck = function (item, checked) {
        var _this = this;
        var props = this.props;
        var value = this.state.value.concat();
        var idx = value.indexOf(item);
        var onlyChildren = this.props.onlyChildren;
        if (checked) {
            ~idx || value.push(item);
            if (!props.cascade) {
                var children = item.children ? item.children.concat([]) : [];
                if (onlyChildren) {
                    // 父级选中的时候，子节点也都选中，但是自己不选中
                    !~idx && children.length && value.shift();
                    while (children.length) {
                        var child = children.shift();
                        var index = value.indexOf(child);
                        if (child.children) {
                            children.push.apply(children, child.children);
                        }
                        else {
                            ~index || value.push(child);
                        }
                    }
                }
                else {
                    // 只要父节点选择了,子节点就不需要了,全部去掉勾选.  withChildren时相反
                    while (children.length) {
                        var child = children.shift();
                        var index = value.indexOf(child);
                        if (~index) {
                            value.splice(index, 1);
                        }
                        if (props.withChildren) {
                            value.push(child);
                        }
                        if (child.children && child.children.length) {
                            children.push.apply(children, child.children);
                        }
                    }
                }
            }
        }
        else if (!checked) {
            ~idx && value.splice(idx, 1);
            if (!props.cascade && (props.withChildren || onlyChildren)) {
                var children = item.children ? item.children.concat([]) : [];
                while (children.length) {
                    var child = children.shift();
                    var index = value.indexOf(child);
                    if (~index) {
                        value.splice(index, 1);
                    }
                    if (child.children && child.children.length) {
                        children.push.apply(children, child.children);
                    }
                }
            }
        }
        this.setState({
            value: value
        }, function () {
            var _a = _this.props, joinValues = _a.joinValues, extractValue = _a.extractValue, valueField = _a.valueField, delimiter = _a.delimiter, onChange = _a.onChange;
            onChange(joinValues
                ? value.map(function (item) { return item[valueField]; }).join(delimiter)
                : extractValue
                    ? value.map(function (item) { return item[valueField]; })
                    : value);
        });
    };
    TreeSelector.prototype.handleAdd = function (parent) {
        if (parent === void 0) { parent = null; }
        var _a = this.props, bultinCUD = _a.bultinCUD, onAdd = _a.onAdd, options = _a.options;
        var idx = undefined;
        if (!bultinCUD) {
            idx = parent
                ? helper_1.findTreeIndex(options, function (item) { return item === parent; })
                : undefined;
            return onAdd && onAdd(idx);
        }
        else {
            this.setState({
                isEditing: false,
                isAdding: true,
                addingParent: parent
            });
        }
    };
    TreeSelector.prototype.handleEdit = function (item) {
        var labelField = this.props.labelField;
        this.setState({
            isEditing: true,
            isAdding: false,
            editingItem: item,
            inputValue: item[labelField]
        });
    };
    TreeSelector.prototype.handleRemove = function (item) {
        var onDelete = this.props.onDelete;
        onDelete && onDelete(item);
    };
    TreeSelector.prototype.handleInputChange = function (e) {
        this.setState({
            inputValue: e.currentTarget.value
        });
    };
    TreeSelector.prototype.handleConfirm = function () {
        var _a = this.state, value = _a.inputValue, isAdding = _a.isAdding, addingParent = _a.addingParent, editingItem = _a.editingItem, isEditing = _a.isEditing;
        if (!value) {
            return;
        }
        var _b = this.props, labelField = _b.labelField, onAdd = _b.onAdd, options = _b.options, onEdit = _b.onEdit;
        this.setState({
            inputValue: '',
            isAdding: false,
            isEditing: false
        }, function () {
            var _a, _b;
            if (isAdding && onAdd) {
                var idx = (addingParent &&
                    helper_1.findTreeIndex(options, function (item) { return item === addingParent; })) ||
                    [];
                onAdd(idx.concat(0), (_a = {}, _a[labelField] = value, _a), true);
            }
            else if (isEditing && onEdit) {
                onEdit(tslib_1.__assign(tslib_1.__assign({}, editingItem), (_b = {}, _b[labelField] = value, _b)), editingItem, true);
            }
        });
    };
    TreeSelector.prototype.handleCancel = function () {
        this.setState({
            inputValue: '',
            isAdding: false,
            isEditing: false
        });
    };
    TreeSelector.prototype.renderInput = function (prfix) {
        if (prfix === void 0) { prfix = null; }
        var cx = this.props.classnames;
        var inputValue = this.state.inputValue;
        return (react_1.default.createElement("div", { className: cx('Tree-itemLabel') },
            react_1.default.createElement("div", { className: cx('Tree-itemInput') },
                prfix,
                react_1.default.createElement("input", { onChange: this.handleInputChange, value: inputValue, placeholder: "\u8BF7\u8F93\u5165" }),
                react_1.default.createElement("a", { "data-tooltip": "\u53D6\u6D88", onClick: this.handleCancel },
                    react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" })),
                react_1.default.createElement("a", { "data-tooltip": "\u786E\u8BA4", onClick: this.handleConfirm },
                    react_1.default.createElement(icons_1.Icon, { icon: "check", className: "icon" })))));
    };
    TreeSelector.prototype.renderList = function (list, value, uncheckable) {
        var _this = this;
        var _a = this.props, itemClassName = _a.itemClassName, showIcon = _a.showIcon, showRadio = _a.showRadio, multiple = _a.multiple, disabled = _a.disabled, labelField = _a.labelField, valueField = _a.valueField, iconField = _a.iconField, disabledField = _a.disabledField, cascade = _a.cascade, selfDisabledAffectChildren = _a.selfDisabledAffectChildren, onlyChildren = _a.onlyChildren, cx = _a.classnames, highlightTxt = _a.highlightTxt, options = _a.options, maxLength = _a.maxLength, minLength = _a.minLength, creatable = _a.creatable, editable = _a.editable, removable = _a.removable;
        var _b = this.state, unfolded = _b.unfolded, stateValue = _b.value, isAdding = _b.isAdding, addingParent = _b.addingParent, editingItem = _b.editingItem, isEditing = _b.isEditing;
        var childrenChecked = 0;
        var ret = list.map(function (item, key) {
            if (!helper_1.isVisible(item, options)) {
                return null;
            }
            var checked = !!~value.indexOf(item);
            var selfDisabled = item[disabledField];
            var selfChecked = !!uncheckable || checked;
            var childrenItems = null;
            var tmpChildrenChecked = false;
            if (item.children && item.children.length) {
                childrenItems = _this.renderList(item.children, value, cascade
                    ? false
                    : uncheckable ||
                        (selfDisabledAffectChildren ? selfDisabled : false) ||
                        (multiple && checked));
                tmpChildrenChecked = !!childrenItems.childrenChecked;
                if (!selfChecked &&
                    onlyChildren &&
                    item.children.length === childrenItems.childrenChecked) {
                    selfChecked = true;
                }
                childrenItems = childrenItems.dom;
            }
            if (tmpChildrenChecked || checked) {
                childrenChecked++;
            }
            var nodeDisabled = !!uncheckable || !!disabled || selfDisabled;
            if (!nodeDisabled &&
                ((maxLength && !selfChecked && stateValue.length >= maxLength) ||
                    (minLength && selfChecked && stateValue.length <= minLength))) {
                nodeDisabled = true;
            }
            var checkbox = multiple ? (react_1.default.createElement(Checkbox_1.default, { size: "sm", disabled: nodeDisabled, checked: checked, onChange: _this.handleCheck.bind(_this, item) })) : showRadio ? (react_1.default.createElement(Checkbox_1.default, { size: "sm", disabled: nodeDisabled, checked: checked, onChange: _this.handleSelect.bind(_this, item) })) : null;
            var isLeaf = (!item.children || !item.children.length) && !item.placeholder;
            return (react_1.default.createElement("li", { key: key, className: cx("Tree-item " + (itemClassName || ''), {
                    'Tree-item--isLeaf': isLeaf
                }) },
                isEditing && editingItem === item ? (_this.renderInput(checkbox)) : (react_1.default.createElement("div", { className: cx('Tree-itemLabel', {
                        'is-children-checked': multiple && !cascade && tmpChildrenChecked && !nodeDisabled,
                        'is-checked': checked,
                        'is-disabled': nodeDisabled
                    }) },
                    !isLeaf ? (react_1.default.createElement("i", { onClick: function () { return _this.toggleUnfolded(item); }, className: cx('Tree-itemArrow', {
                            'is-folded': !unfolded[item[valueField]]
                        }) })) : (react_1.default.createElement("span", { className: cx('Tree-itemArrowPlaceholder') })),
                    checkbox,
                    react_1.default.createElement("span", { className: cx('Tree-itemText'), onClick: function () {
                            return !nodeDisabled &&
                                (multiple
                                    ? _this.handleCheck(item, !selfChecked)
                                    : _this.handleSelect(item));
                        } },
                        showIcon ? (react_1.default.createElement("i", { className: cx("Tree-itemIcon " + (item[iconField] ||
                                (childrenItems ? 'Tree-folderIcon' : 'Tree-leafIcon'))) })) : null,
                        highlightTxt
                            ? Options_1.highlight(item[labelField], highlightTxt)
                            : item[labelField]),
                    !nodeDisabled && !isAdding && !isEditing ? (react_1.default.createElement("div", { className: cx('Tree-item-icons') },
                        creatable && helper_1.hasAbility(item, 'creatable') ? (react_1.default.createElement("a", { onClick: _this.handleAdd.bind(_this, item), "data-tooltip": "\u6DFB\u52A0\u5B69\u5B50\u8282\u70B9" },
                            react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" }))) : null,
                        removable && helper_1.hasAbility(item, 'removable') ? (react_1.default.createElement("a", { onClick: _this.handleRemove.bind(_this, item), "data-tooltip": "\u79FB\u9664\u8BE5\u8282\u70B9" },
                            react_1.default.createElement(icons_1.Icon, { icon: "minus", className: "icon" }))) : null,
                        editable && helper_1.hasAbility(item, 'editable') ? (react_1.default.createElement("a", { onClick: _this.handleEdit.bind(_this, item), "data-tooltip": "\u7F16\u8F91\u8BE5\u8282\u70B9" },
                            react_1.default.createElement(icons_1.Icon, { icon: "pencil", className: "icon" }))) : null)) : null)),
                (childrenItems && unfolded[item[valueField]]) ||
                    (isAdding && addingParent === item) ? (react_1.default.createElement("ul", { className: cx('Tree-sublist') },
                    isAdding && addingParent === item ? (react_1.default.createElement("li", { className: cx('Tree-item') }, _this.renderInput(checkbox
                        ? react_1.default.cloneElement(checkbox, {
                            checked: false,
                            disabled: true
                        })
                        : null))) : null,
                    childrenItems)) : !childrenItems && item.placeholder && unfolded[item[valueField]] ? (react_1.default.createElement("ul", { className: cx('Tree-sublist') },
                    react_1.default.createElement("li", { className: cx('Tree-item') },
                        react_1.default.createElement("div", { className: cx('Tree-placeholder') }, item.placeholder)))) : null));
        });
        return {
            dom: ret,
            childrenChecked: childrenChecked
        };
    };
    TreeSelector.prototype.render = function () {
        var _a = this.props, className = _a.className, placeholder = _a.placeholder, hideRoot = _a.hideRoot, rootLabel = _a.rootLabel, showIcon = _a.showIcon, cx = _a.classnames, creatable = _a.creatable, rootCreatable = _a.rootCreatable, disabled = _a.disabled;
        var options = this.props.options;
        var _b = this.state, value = _b.value, isAdding = _b.isAdding, addingParent = _b.addingParent, isEditing = _b.isEditing, inputValue = _b.inputValue;
        var addBtn = null;
        if (creatable && rootCreatable !== false && hideRoot) {
            addBtn = (react_1.default.createElement("a", { className: cx('Tree-addTopBtn', {
                    'is-disabled': isAdding || isEditing
                }), onClick: this.handleAdd.bind(this, null) },
                react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" }),
                react_1.default.createElement("span", null, "\u6DFB\u52A0\u4E00\u7EA7\u8282\u70B9")));
        }
        return (react_1.default.createElement("div", { className: cx("Tree " + (className || '')) }, options && options.length ? (react_1.default.createElement("ul", { className: cx('Tree-list') }, hideRoot ? (react_1.default.createElement(react_1.default.Fragment, null,
            addBtn,
            isAdding && !addingParent ? (react_1.default.createElement("li", { className: cx('Tree-item') }, this.renderInput())) : null,
            this.renderList(options, value, false).dom)) : (react_1.default.createElement("li", { className: cx('Tree-rootItem', {
                'is-checked': !value || !value.length
            }) },
            react_1.default.createElement("div", { className: cx('Tree-itemLabel') },
                react_1.default.createElement("span", { className: cx('Tree-itemText') },
                    showIcon ? (react_1.default.createElement("i", { className: cx('Tree-itemIcon Tree-rootIcon') })) : null,
                    rootLabel),
                !disabled &&
                    creatable &&
                    rootCreatable !== false &&
                    !isAdding &&
                    !isEditing ? (react_1.default.createElement("div", { className: cx('Tree-item-icons') }, creatable ? (react_1.default.createElement("a", { onClick: this.handleAdd.bind(this, null), "data-tooltip": "\u6DFB\u52A0\u4E00\u7EA7\u8282\u70B9" },
                    react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" }))) : null)) : null),
            react_1.default.createElement("ul", { className: cx('Tree-sublist') },
                isAdding && !addingParent ? (react_1.default.createElement("li", { className: cx('Tree-item') }, this.renderInput())) : null,
                this.renderList(options, value, false).dom))))) : (react_1.default.createElement("div", { className: cx('Tree-placeholder') }, placeholder))));
    };
    var _a, _b, _c, _d, _e;
    TreeSelector.defaultProps = {
        showIcon: true,
        initiallyOpen: true,
        unfoldedLevel: 0,
        showRadio: false,
        multiple: false,
        disabled: false,
        withChildren: false,
        onlyChildren: false,
        labelField: 'label',
        valueField: 'value',
        iconField: 'icon',
        unfoldedField: 'unfolded',
        foldedField: 'foled',
        disabledField: 'disabled',
        joinValues: true,
        extractValue: false,
        delimiter: ',',
        hideRoot: true,
        rootLabel: '顶级',
        rootValue: 0,
        cascade: false,
        selfDisabledAffectChildren: true
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeSelector.prototype, "toggleUnfolded", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeSelector.prototype, "clearSelect", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeSelector.prototype, "handleSelect", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Boolean]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeSelector.prototype, "handleCheck", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Checkboxes_1.Option !== "undefined" && Checkboxes_1.Option) === "function" ? _a : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeSelector.prototype, "handleAdd", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof Checkboxes_1.Option !== "undefined" && Checkboxes_1.Option) === "function" ? _b : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeSelector.prototype, "handleEdit", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof Checkboxes_1.Option !== "undefined" && Checkboxes_1.Option) === "function" ? _c : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeSelector.prototype, "handleRemove", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof react_1.default !== "undefined" && react_1.default.ChangeEvent) === "function" ? _d : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeSelector.prototype, "handleInputChange", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeSelector.prototype, "handleConfirm", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeSelector.prototype, "handleCancel", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof Checkboxes_1.Options !== "undefined" && Checkboxes_1.Options) === "function" ? _e : Object, Array, Boolean]),
        tslib_1.__metadata("design:returntype", Object)
    ], TreeSelector.prototype, "renderList", null);
    return TreeSelector;
}(react_1.default.Component));
exports.TreeSelector = TreeSelector;
exports.default = theme_1.themeable(TreeSelector);
//# sourceMappingURL=./components/Tree.js.map
