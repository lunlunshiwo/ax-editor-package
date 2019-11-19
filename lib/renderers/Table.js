"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_dom_1 = require("react-dom");
var factory_1 = require("../factory");
var forEach = require("lodash/forEach");
var tpl_1 = require("../utils/tpl");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var DropDownButton_1 = tslib_1.__importDefault(require("./DropDownButton"));
var Checkbox_1 = tslib_1.__importDefault(require("../components/Checkbox"));
var Button_1 = tslib_1.__importDefault(require("../components/Button"));
var table_1 = require("../store/table");
var mobx_react_1 = require("mobx-react");
var helper_1 = require("../utils/helper");
var tpl_builtin_1 = require("../utils/tpl-builtin");
var api_1 = require("../utils/api");
var debounce = require("lodash/debounce");
var xor = require("lodash/xor");
var QuickEdit_1 = tslib_1.__importDefault(require("./QuickEdit"));
var PopOver_1 = tslib_1.__importDefault(require("../components/PopOver"));
var Copyable_1 = tslib_1.__importDefault(require("./Copyable"));
var Sortable = require("sortablejs");
var resize_sensor_1 = require("../utils/resize-sensor");
var find = require("lodash/find");
var Overlay_1 = tslib_1.__importDefault(require("../components/Overlay"));
var PopOver_2 = tslib_1.__importDefault(require("./PopOver"));
var Table = /** @class */ (function (_super) {
    tslib_1.__extends(Table, _super);
    function Table(props) {
        var _this = _super.call(this, props) || this;
        _this.lastScrollLeft = -1;
        _this.totalWidth = 0;
        _this.totalHeight = 0;
        _this.outterWidth = 0;
        _this.outterHeight = 0;
        _this.widths = {};
        _this.heights = {};
        _this.renderedToolbars = [];
        _this.subForms = {};
        _this.handleOutterScroll = _this.handleOutterScroll.bind(_this);
        _this.affixDetect = _this.affixDetect.bind(_this);
        _this.updateTableInfoLazy = debounce(_this.updateTableInfo.bind(_this), 250, {
            trailing: true,
            leading: false
        });
        _this.tableRef = _this.tableRef.bind(_this);
        _this.affxiedTableRef = _this.affxiedTableRef.bind(_this);
        _this.handleAction = _this.handleAction.bind(_this);
        _this.handleCheck = _this.handleCheck.bind(_this);
        _this.handleCheckAll = _this.handleCheckAll.bind(_this);
        _this.handleQuickChange = _this.handleQuickChange.bind(_this);
        _this.handleSave = _this.handleSave.bind(_this);
        _this.handleSaveOrder = _this.handleSaveOrder.bind(_this);
        _this.reset = _this.reset.bind(_this);
        _this.dragTipRef = _this.dragTipRef.bind(_this);
        _this.getPopOverContainer = _this.getPopOverContainer.bind(_this);
        _this.renderCell = _this.renderCell.bind(_this);
        _this.renderToolbar = _this.renderToolbar.bind(_this);
        _this.handleMouseMove = _this.handleMouseMove.bind(_this);
        _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
        _this.subFormRef = _this.subFormRef.bind(_this);
        return _this;
    }
    Table.syncRows = function (store, props, prevProps) {
        var source = props.source;
        var value = props.value || props.items;
        var rows = [];
        var updateRows = true;
        if (Array.isArray(value)) {
            rows = value;
        }
        else if (typeof source === 'string') {
            var resolved = tpl_builtin_1.resolveVariable(source, props.data);
            var prev = prevProps ? tpl_builtin_1.resolveVariable(source, prevProps.data) : null;
            if (prev && prev === resolved) {
                updateRows = false;
            }
            else if (Array.isArray(resolved)) {
                rows = resolved;
            }
        }
        updateRows && store.initRows(rows, props.getEntryId);
        typeof props.selected !== 'undefined' &&
            store.updateSelected(props.selected, props.valueField);
    };
    Table.prototype.componentWillMount = function () {
        var _a = this.props, store = _a.store, columns = _a.columns, selectable = _a.selectable, columnsTogglable = _a.columnsTogglable, draggable = _a.draggable, orderBy = _a.orderBy, orderDir = _a.orderDir, multiple = _a.multiple, footable = _a.footable, primaryField = _a.primaryField, itemCheckableOn = _a.itemCheckableOn, itemDraggableOn = _a.itemDraggableOn, hideCheckToggler = _a.hideCheckToggler, combineNum = _a.combineNum, expandConfig = _a.expandConfig;
        store.update({
            selectable: selectable,
            draggable: draggable,
            columns: columns,
            columnsTogglable: columnsTogglable,
            orderBy: orderBy,
            orderDir: orderDir,
            multiple: multiple,
            footable: footable,
            expandConfig: expandConfig,
            primaryField: primaryField,
            itemCheckableOn: itemCheckableOn,
            itemDraggableOn: itemDraggableOn,
            hideCheckToggler: hideCheckToggler,
            combineNum: combineNum
        });
        Table.syncRows(store, this.props);
        this.syncSelected();
    };
    Table.prototype.componentDidMount = function () {
        var parent = helper_1.getScrollParent(react_dom_1.findDOMNode(this));
        if (!parent || parent === document.body) {
            parent = window;
        }
        this.parentNode = parent;
        this.updateTableInfo();
        this.handleOutterScroll();
        var dom = react_dom_1.findDOMNode(this);
        if (dom.closest('.modal-body')) {
            return;
        }
        this.affixDetect();
        parent.addEventListener('scroll', this.affixDetect);
        window.addEventListener('resize', this.affixDetect);
    };
    Table.prototype.componentWillReceiveProps = function (nextProps) {
        var props = this.props;
        var store = nextProps.store;
        if (helper_1.anyChanged([
            'selectable',
            'columnsTogglable',
            'draggable',
            'orderBy',
            'orderDir',
            'multiple',
            'footable',
            'primaryField',
            'itemCheckableOn',
            'itemDraggableOn',
            'hideCheckToggler',
            'combineNum',
            'expandConfig'
        ], props, nextProps)) {
            store.update({
                selectable: nextProps.selectable,
                columnsTogglable: nextProps.columnsTogglable,
                draggable: nextProps.draggable,
                orderBy: nextProps.orderBy,
                orderDir: nextProps.orderDir,
                multiple: nextProps.multiple,
                primaryField: nextProps.primaryField,
                footable: nextProps.footable,
                itemCheckableOn: nextProps.itemCheckableOn,
                itemDraggableOn: nextProps.itemDraggableOn,
                hideCheckToggler: nextProps.hideCheckToggler,
                combineNum: nextProps.combineNum,
                expandConfig: nextProps.expandConfig
            });
        }
        if (props.columns !== nextProps.columns) {
            store.update({
                columns: nextProps.columns
            });
        }
        if (helper_1.anyChanged(['source', 'value', 'items'], props, nextProps) ||
            (!nextProps.value && !nextProps.items && nextProps.data !== props.data)) {
            Table.syncRows(store, nextProps, props);
            this.syncSelected();
        }
        else if (props.selected !== nextProps.selected) {
            store.updateSelected(nextProps.selected || [], nextProps.valueField);
            this.syncSelected();
        }
    };
    Table.prototype.componentDidUpdate = function () {
        this.updateTableInfo();
        this.handleOutterScroll();
    };
    Table.prototype.componentWillUnmount = function () {
        var parent = this.parentNode;
        parent && parent.removeEventListener('scroll', this.affixDetect);
        window.removeEventListener('resize', this.affixDetect);
        this.updateTableInfoLazy.cancel();
        this.unSensor && this.unSensor();
    };
    Table.prototype.subFormRef = function (form, x, y) {
        var quickEditFormRef = this.props.quickEditFormRef;
        quickEditFormRef && quickEditFormRef(form, x, y);
        this.subForms[x + "-" + y] = form;
    };
    Table.prototype.handleAction = function (e, action, ctx) {
        var onAction = this.props.onAction;
        // todo
        onAction(e, action, ctx);
    };
    Table.prototype.handleCheck = function (item) {
        item.toggle();
        this.syncSelected();
    };
    Table.prototype.handleCheckAll = function () {
        var store = this.props.store;
        store.toggleAll();
        this.syncSelected();
    };
    Table.prototype.handleQuickChange = function (item, values, saveImmediately, savePristine) {
        var onSave = this.props.onSave;
        item.change(values, savePristine);
        // 值发生变化了，需要通过 onSelect 通知到外面，否则会出现数据不同步的问题
        this.syncSelected();
        if (!saveImmediately || savePristine) {
            return;
        }
        if (saveImmediately && saveImmediately.api) {
            this.props.onAction(null, {
                actionType: 'ajax',
                api: saveImmediately.api
            }, values);
            return;
        }
        if (!onSave) {
            return;
        }
        onSave(item.data, helper_1.difference(item.data, item.pristine), item.index, undefined, item.pristine);
    };
    Table.prototype.handleSave = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, store, onSave, subForms, result, rows, rowIndexes, diff, unModifiedRows;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, store = _a.store, onSave = _a.onSave;
                        if (!onSave || !store.modifiedRows.length) {
                            return [2 /*return*/];
                        }
                        subForms = [];
                        Object.keys(this.subForms).forEach(function (key) { return _this.subForms[key] && subForms.push(_this.subForms[key]); });
                        if (!subForms.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(subForms.map(function (item) { return item.validate(); }))];
                    case 1:
                        result = _b.sent();
                        if (~result.indexOf(false)) {
                            return [2 /*return*/];
                        }
                        _b.label = 2;
                    case 2:
                        rows = store.modifiedRows.map(function (item) { return item.data; });
                        rowIndexes = store.modifiedRows.map(function (item) { return item.index; });
                        diff = store.modifiedRows.map(function (item) {
                            return helper_1.difference(item.data, item.pristine);
                        });
                        unModifiedRows = store.rows
                            .filter(function (item) { return !item.modified; })
                            .map(function (item) { return item.data; });
                        onSave(rows, diff, rowIndexes, unModifiedRows, store.modifiedRows.map(function (item) { return item.pristine; }));
                        return [2 /*return*/];
                }
            });
        });
    };
    Table.prototype.handleSaveOrder = function () {
        var _a = this.props, store = _a.store, onSaveOrder = _a.onSaveOrder;
        if (!onSaveOrder || !store.movedRows.length) {
            return;
        }
        onSaveOrder(store.movedRows.map(function (item) { return item.data; }), store.rows.map(function (item) { return item.getDataWithModifiedChilden(); }));
    };
    Table.prototype.syncSelected = function () {
        var _a = this.props, store = _a.store, onSelect = _a.onSelect;
        onSelect &&
            onSelect(store.selectedRows.map(function (item) { return item.data; }), store.unSelectedRows.map(function (item) { return item.data; }));
    };
    Table.prototype.reset = function () {
        var _this = this;
        var store = this.props.store;
        store.reset();
        var subForms = [];
        Object.keys(this.subForms).forEach(function (key) { return _this.subForms[key] && subForms.push(_this.subForms[key]); });
        subForms.forEach(function (item) { return item.clearErrors(); });
    };
    Table.prototype.bulkUpdate = function (value, items) {
        var _a = this.props, store = _a.store, primaryField = _a.primaryField;
        if (primaryField && value.ids) {
            var ids_1 = value.ids.split(',');
            var rows = store.rows.filter(function (item) {
                return find(ids_1, function (id) { return id && id == item.data[primaryField]; });
            });
            var newValue_1 = tslib_1.__assign(tslib_1.__assign({}, value), { ids: undefined });
            rows.forEach(function (row) { return row.change(newValue_1); });
        }
        else {
            var rows = store.rows.filter(function (item) { return ~items.indexOf(item.pristine); });
            rows.forEach(function (row) { return row.change(value); });
        }
    };
    Table.prototype.getSelected = function () {
        var store = this.props.store;
        return store.selectedRows.map(function (item) { return item.data; });
    };
    Table.prototype.affixDetect = function () {
        if (!this.props.affixHeader || !this.table) {
            return;
        }
        var ns = this.props.classPrefix;
        var dom = react_dom_1.findDOMNode(this);
        var clip = this.table.getBoundingClientRect();
        var offsetY = this.props.env.affixOffsetTop || 0;
        var affixed = clip.top < offsetY && clip.top + clip.height - 40 > offsetY;
        var afixedDom = dom.querySelector(":scope>." + ns + "Table-fixedTop");
        afixedDom.style.cssText += "top: " + offsetY + "px;width: " + this.table.parentNode.offsetWidth + "px";
        affixed ? afixedDom.classList.add('in') : afixedDom.classList.remove('in');
        // store.markHeaderAffix(clip.top < offsetY && (clip.top + clip.height - 40) > offsetY);
    };
    Table.prototype.updateTableInfo = function () {
        var _this = this;
        if (!this.table) {
            return;
        }
        var table = this.table;
        var outter = table.parentNode;
        var affixHeader = this.props.affixHeader;
        var ns = this.props.classPrefix;
        // 完成宽高都没有变化就直接跳过了。
        // if (this.totalWidth === table.scrollWidth && this.totalHeight === table.scrollHeight) {
        //     return;
        // }
        this.totalWidth = table.scrollWidth;
        this.totalHeight = table.scrollHeight;
        this.outterWidth = outter.offsetWidth;
        this.outterHeight = outter.offsetHeight;
        var widths = (this.widths = {});
        var heights = (this.heights = {});
        forEach(table.querySelectorAll('thead>tr:last-child>th'), function (item) {
            heights.header || (heights.header = item.offsetHeight);
            widths[item.getAttribute('data-index')] = item.offsetWidth;
        });
        forEach(table.querySelectorAll('tbody>tr>*:last-child'), function (item, index) { return (heights[index] = item.offsetHeight); });
        // 让 react 去更新非常慢，还是手动更新吧。
        var dom = react_dom_1.findDOMNode(this);
        forEach(dom.querySelectorAll(":scope>." + ns + "Table-fixedLeft, :scope>." + ns + "Table-fixedRight"), function (item) {
            return (item.style.cssText += "height:" + _this.totalHeight + "px;");
        });
        if (affixHeader) {
            dom.querySelector("." + ns + "Table-fixedTop>." + ns + "Table-wrapper").style.cssText += "width: " + this.outterWidth + "px";
            var affixedTable = dom.querySelector("." + ns + "Table-wrapper table");
            affixedTable.style.cssText += "width: " + this.totalWidth + "px";
        }
        forEach(dom.querySelectorAll("." + ns + "Table-fixedTop table, ." + ns + "Table-fixedLeft table, ." + ns + "Table-fixedRight table"), function (table) {
            forEach(table.querySelectorAll('thead>tr:last-child>th'), function (item) {
                // todo 这个 2 数值，应该从 dom 上读取，也有可能没有border 样式
                item.style.cssText += "width: " + (_this.widths[parseInt(item.getAttribute('data-index'), 10)] - 2) + "px";
            });
            forEach(table.querySelectorAll('tbody>tr'), function (item, index) {
                item.style.cssText += "height: " + _this.heights[index] + "px";
            });
        });
    };
    Table.prototype.handleOutterScroll = function () {
        var outter = this.table.parentNode;
        var scrollLeft = outter.scrollLeft;
        if (scrollLeft === this.lastScrollLeft) {
            return;
        }
        this.lastScrollLeft = scrollLeft;
        var leading = scrollLeft === 0;
        var trailing = scrollLeft + this.outterWidth === this.totalWidth;
        // console.log(scrollLeft, store.outterWidth, store.totalWidth, (scrollLeft + store.outterWidth) === store.totalWidth);
        // store.setLeading(leading);
        // store.setTrailing(trailing);
        var ns = this.props.classPrefix;
        var dom = react_dom_1.findDOMNode(this);
        var fixedLeft = dom.querySelectorAll("." + ns + "Table-fixedLeft");
        if (fixedLeft && fixedLeft.length) {
            for (var i = 0, len = fixedLeft.length; i < len; i++) {
                var node = fixedLeft[i];
                leading ? node.classList.remove('in') : node.classList.add('in');
            }
        }
        var fixedRight = dom.querySelectorAll("." + ns + "Table-fixedRight");
        if (fixedRight && fixedRight.length) {
            for (var i = 0, len = fixedRight.length; i < len; i++) {
                var node = fixedRight[i];
                trailing ? node.classList.remove('in') : node.classList.add('in');
            }
        }
        var table = this.affixedTable;
        if (table) {
            table.style.cssText += "transform: translateX(-" + scrollLeft + "px)";
        }
    };
    Table.prototype.tableRef = function (ref) {
        this.table = ref;
        if (ref) {
            this.unSensor = resize_sensor_1.resizeSensor(ref.parentNode, this.updateTableInfoLazy);
        }
        else {
            this.unSensor && this.unSensor();
            delete this.unSensor;
        }
    };
    Table.prototype.dragTipRef = function (ref) {
        if (!this.dragTip && ref) {
            this.initDragging();
        }
        else if (this.dragTip && !ref) {
            this.destroyDragging();
        }
        this.dragTip = ref;
    };
    Table.prototype.affxiedTableRef = function (ref) {
        this.affixedTable = ref;
    };
    Table.prototype.initDragging = function () {
        var store = this.props.store;
        var ns = this.props.classPrefix;
        this.sortable = new Sortable(this.table.querySelector('tbody'), {
            group: 'table',
            animation: 150,
            handle: "." + ns + "Table-dragCell",
            ghostClass: 'is-dragging',
            onEnd: function (e) {
                // 没有移动
                if (e.newIndex === e.oldIndex) {
                    return;
                }
                var parent = e.to;
                if (e.oldIndex < parent.childNodes.length - 1) {
                    parent.insertBefore(e.item, parent.childNodes[e.oldIndex]);
                }
                else {
                    parent.appendChild(e.item);
                }
                store.exchange(e.oldIndex, e.newIndex);
            }
        });
    };
    Table.prototype.destroyDragging = function () {
        this.sortable && this.sortable.destroy();
    };
    Table.prototype.getPopOverContainer = function () {
        return react_dom_1.findDOMNode(this);
    };
    Table.prototype.handleMouseMove = function (e) {
        var tr = e.target.closest('tr[data-index]');
        if (!tr) {
            return;
        }
        var store = this.props.store;
        var index = parseInt(tr.getAttribute('data-index'), 10);
        if (store.hoverIndex !== index) {
            store.rows.forEach(function (item, key) { return item.setIsHover(index === key); });
        }
    };
    Table.prototype.handleMouseLeave = function () {
        var store = this.props.store;
        if (~store.hoverIndex) {
            store.rows[store.hoverIndex].setIsHover(false);
        }
    };
    Table.prototype.handleDragStart = function (e) {
        var store = this.props.store;
        var target = e.currentTarget;
        var tr = (this.draggingTr = target.closest('tr'));
        var id = tr.getAttribute('data-id');
        var tbody = tr.parentNode;
        this.originIndex = Array.prototype.indexOf.call(tbody.childNodes, tr);
        tr.classList.add('is-dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', id);
        e.dataTransfer.setDragImage(tr, 0, 0);
        var item = store.getRowById(id);
        store.collapseAllAtDepth(item.depth);
        var siblings = store.rows;
        if (item.parentId) {
            var parent = store.getRowById(item.parentId);
            siblings = parent.children;
        }
        siblings = siblings.filter(function (sibling) { return sibling !== item; });
        tbody.addEventListener('dragover', this.handleDragOver);
        tbody.addEventListener('drop', this.handleDrop);
        this.draggingSibling = siblings.map(function (item) {
            var tr = tbody.querySelector("tr[data-id=\"" + item.id + "\"]");
            tr.classList.add('is-drop-allowed');
            return tr;
        });
        tr.addEventListener('dragend', this.handleDragEnd);
    };
    Table.prototype.handleDragOver = function (e) {
        if (!e.target) {
            return;
        }
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        var overTr = e.target.closest('tr');
        if (!overTr ||
            !~overTr.className.indexOf('is-drop-allowed') ||
            overTr === this.draggingTr) {
            return;
        }
        var tbody = overTr.parentElement;
        var dRect = this.draggingTr.getBoundingClientRect();
        var tRect = overTr.getBoundingClientRect();
        var ratio = dRect.top < tRect.top ? 0.1 : 0.9;
        var next = (e.clientY - tRect.top) / (tRect.bottom - tRect.top) > ratio;
        tbody.insertBefore(this.draggingTr, (next && overTr.nextSibling) || overTr);
    };
    Table.prototype.handleDrop = function () {
        var store = this.props.store;
        var tr = this.draggingTr;
        var tbody = tr.parentElement;
        var index = Array.prototype.indexOf.call(tbody.childNodes, tr);
        var item = store.getRowById(tr.getAttribute('data-id'));
        // destroy
        this.handleDragEnd();
        store.exchange(this.originIndex, index, item);
    };
    Table.prototype.handleDragEnd = function () {
        var tr = this.draggingTr;
        var tbody = tr.parentElement;
        var index = Array.prototype.indexOf.call(tbody.childNodes, tr);
        tbody.insertBefore(tr, tbody.childNodes[index < this.originIndex ? this.originIndex + 1 : this.originIndex]);
        tr.classList.remove('is-dragging');
        tr.removeEventListener('dragend', this.handleDragEnd);
        tbody.removeEventListener('dragover', this.handleDragOver);
        tbody.removeEventListener('drop', this.handleDrop);
        this.draggingSibling.forEach(function (item) {
            return item.classList.remove('is-drop-allowed');
        });
    };
    Table.prototype.renderHeading = function () {
        var _a = this.props, title = _a.title, store = _a.store, hideQuickSaveBtn = _a.hideQuickSaveBtn, data = _a.data, cx = _a.classnames;
        if (title || (store.modified && !hideQuickSaveBtn) || store.moved) {
            return (react_1.default.createElement("div", { className: cx('Table-heading'), key: "heading" }, store.modified && !hideQuickSaveBtn ? (react_1.default.createElement("span", null, "\u5F53\u524D\u6709 " + store.modified + " \u6761\u8BB0\u5F55\u4FEE\u6539\u4E86\u5185\u5BB9, \u4F46\u5E76\u6CA1\u6709\u63D0\u4EA4\u3002\u8BF7\u9009\u62E9:",
                react_1.default.createElement("button", { type: "button", className: cx('Button Button--xs Button--success m-l-sm'), onClick: this.handleSave },
                    react_1.default.createElement("i", { className: "fa fa-check m-r-xs" }),
                    "\u63D0\u4EA4"),
                react_1.default.createElement("button", { type: "button", className: cx('Button Button--xs Button--danger m-l-sm'), onClick: this.reset },
                    react_1.default.createElement("i", { className: "fa fa-times m-r-xs" }),
                    "\u653E\u5F03"))) : store.moved ? (react_1.default.createElement("span", null, "\u5F53\u524D\u6709 " + store.moved + " \u6761\u8BB0\u5F55\u4FEE\u6539\u4E86\u987A\u5E8F, \u4F46\u5E76\u6CA1\u6709\u63D0\u4EA4\u3002\u8BF7\u9009\u62E9:",
                react_1.default.createElement("button", { type: "button", className: cx('Button Button--xs Button--success m-l-sm'), onClick: this.handleSaveOrder },
                    react_1.default.createElement("i", { className: "fa fa-check m-r-xs" }),
                    "\u63D0\u4EA4"),
                react_1.default.createElement("button", { type: "button", className: cx('Button Button--xs Button--danger m-l-sm'), onClick: this.reset },
                    react_1.default.createElement("i", { className: "fa fa-times m-r-xs" }),
                    "\u653E\u5F03"))) : title ? (tpl_1.filter(title, data)) : ('')));
        }
        return null;
    };
    Table.prototype.renderHeadCell = function (column, props) {
        var _a = this.props, store = _a.store, query = _a.query, onQuery = _a.onQuery, multiple = _a.multiple, env = _a.env, render = _a.render, ns = _a.classPrefix, cx = _a.classnames;
        if (column.type === '__checkme') {
            return (react_1.default.createElement("th", tslib_1.__assign({}, props, { className: cx(column.pristine.className) }), store.rows.length && multiple ? (react_1.default.createElement(Checkbox_1.default, { classPrefix: ns, partial: !store.allChecked, checked: store.someChecked, onChange: this.handleCheckAll })) : null));
        }
        else if (column.type === '__dragme') {
            return react_1.default.createElement("th", tslib_1.__assign({}, props, { className: cx(column.pristine.className) }));
        }
        else if (column.type === '__expandme') {
            return (react_1.default.createElement("th", tslib_1.__assign({}, props, { className: cx(column.pristine.className) }), (store.footable &&
                (store.footable.expandAll === false || store.footable.accordion)) ||
                (store.expandConfig &&
                    (store.expandConfig.expandAll === false ||
                        store.expandConfig.accordion)) ? null : (react_1.default.createElement("a", { className: cx('Table-expandBtn', store.allExpanded ? 'is-active' : ''), 
                // data-tooltip="展开/收起全部"
                // data-position="top"
                onClick: store.toggleExpandAll },
                react_1.default.createElement("i", null)))));
        }
        var affix = null;
        if (column.searchable && column.name) {
            affix = (react_1.default.createElement(HeadCellSearchDropDown, tslib_1.__assign({}, this.props, { onQuery: onQuery, name: column.name, searchable: column.searchable, sortable: column.sortable, type: column.type, data: query, orderBy: store.orderBy, orderDir: store.orderDir, popOverContainer: this.getPopOverContainer })));
        }
        else if (column.sortable && column.name) {
            affix = (react_1.default.createElement("span", { className: cx('TableCell-sortBtn'), onClick: function () {
                    if (column.name === store.orderBy) {
                        store.setOrderByInfo(column.name, store.orderDir === 'desc' ? 'asc' : 'desc');
                    }
                    else {
                        store.setOrderByInfo(column.name, 'asc');
                    }
                    onQuery &&
                        onQuery({
                            orderBy: store.orderBy,
                            orderDir: store.orderDir
                        });
                } },
                react_1.default.createElement("i", { className: cx('TableCell-sortBtn--down', store.orderBy === column.name && store.orderDir === 'desc'
                        ? 'is-active'
                        : '') }),
                react_1.default.createElement("i", { className: cx('TableCell-sortBtn--up', store.orderBy === column.name && store.orderDir === 'asc'
                        ? 'is-active'
                        : '') }),
                react_1.default.createElement("i", { className: cx('TableCell-sortBtn--default', store.orderBy === column.name ? '' : 'is-active') })));
        }
        else if (column.filterable && column.name) {
            affix = (react_1.default.createElement(HeadCellFilterDropDown, tslib_1.__assign({}, this.props, { onQuery: onQuery, name: column.name, type: column.type, data: query, filterable: column.filterable, popOverContainer: this.getPopOverContainer })));
        }
        if (column.pristine.width) {
            props.style = props.style || {};
            props.style.width = column.pristine.width;
        }
        return (react_1.default.createElement("th", tslib_1.__assign({}, props, { className: cx(props ? props.className : '', column.pristine.className, {
                'TableCell--sortable': column.sortable,
                'TableCell--searchable': column.searchable,
                'TableCell--filterable': column.filterable,
                'Table-operationCell': column.type === 'operation'
            }) }),
            column.label,
            column.remark
                ? render('remark', {
                    type: 'remark',
                    tooltip: column.remark,
                    container: env && env.getModalContainer
                        ? env.getModalContainer
                        : undefined
                })
                : null,
            affix));
    };
    Table.prototype.renderCell = function (region, column, item, props) {
        var _a = this.props, render = _a.render, store = _a.store, multiple = _a.multiple, env = _a.env, ns = _a.classPrefix, cx = _a.classnames, checkOnItemClick = _a.checkOnItemClick;
        if (column.name && item.rowSpans[column.name] === 0) {
            return null;
        }
        if (column.type === '__checkme') {
            return (react_1.default.createElement("td", { key: props.key, className: cx(column.pristine.className) }, item.checkable ? (react_1.default.createElement(Checkbox_1.default, { classPrefix: ns, type: multiple ? 'checkbox' : 'radio', checked: item.checked, onChange: checkOnItemClick ? helper_1.noop : this.handleCheck.bind(this, item) })) : null));
        }
        else if (column.type === '__dragme') {
            return (react_1.default.createElement("td", { key: props.key, className: cx(column.pristine.className) }, item.draggable ? react_1.default.createElement("i", { className: "glyphicon glyphicon-sort" }) : null));
        }
        else if (column.type === '__expandme') {
            return (react_1.default.createElement("td", { key: props.key, className: cx(column.pristine.className) },
                item.depth > 2
                    ? Array.from({ length: item.depth - 2 }).map(function (_, index) { return (react_1.default.createElement("i", { key: index, className: cx('Table-divider-' + (index + 1)) })); })
                    : null,
                item.expandable ? (react_1.default.createElement("a", { className: cx('Table-expandBtn', item.expanded ? 'is-active' : ''), 
                    // data-tooltip="展开/收起"
                    // data-position="top"
                    onClick: item.toggleExpanded },
                    react_1.default.createElement("i", null))) : null));
        }
        var prefix = null;
        if (column.isPrimary &&
            store.isNested &&
            store.draggable &&
            item.draggable) {
            prefix = (react_1.default.createElement("a", { draggable: true, onDragStart: this.handleDragStart, className: cx('Table-dragBtn') },
                react_1.default.createElement("i", { className: "glyphicon glyphicon-sort" })));
        }
        var $$id = column.pristine.$$id ? column.pristine.$$id + "-column" : '';
        var subProps = tslib_1.__assign(tslib_1.__assign({}, props), { btnDisabled: store.dragging, data: item.locals, value: column.name ? tpl_builtin_1.resolveVariable(column.name, item.data) : undefined, popOverContainer: this.getPopOverContainer, rowSpan: item.rowSpans[column.name], quickEditFormRef: this.subFormRef, prefix: prefix });
        delete subProps.$$id;
        delete subProps.label;
        return render(region, tslib_1.__assign(tslib_1.__assign({}, column.pristine), { column: column.pristine, type: 'cell', $$id: $$id }), subProps);
    };
    Table.prototype.renderAffixHeader = function (tableClassName) {
        var _this = this;
        var _a = this.props, store = _a.store, affixHeader = _a.affixHeader, cx = _a.classnames;
        return affixHeader ? (react_1.default.createElement("div", { className: cx('Table-fixedTop') },
            this.renderHeader(false),
            react_1.default.createElement("div", { className: cx('Table-fixedLeft') }, store.leftFixedColumns.length
                ? this.renderFxiedColumns(store.leftFixedColumns, true, tableClassName)
                : null),
            react_1.default.createElement("div", { className: cx('Table-fixedRight') }, store.rightFixedColumns.length
                ? this.renderFxiedColumns(store.rightFixedColumns, true, tableClassName)
                : null),
            react_1.default.createElement("div", { className: cx('Table-wrapper') },
                react_1.default.createElement("table", { ref: this.affxiedTableRef, className: tableClassName },
                    react_1.default.createElement("thead", null,
                        store.columnGroup.length ? (react_1.default.createElement("tr", null, store.columnGroup.map(function (item, index) { return (react_1.default.createElement("th", { key: index, "data-index": item.index, colSpan: item.colSpan }, item.label)); }))) : null,
                        react_1.default.createElement("tr", null, store.filteredColumns.map(function (column) {
                            return _this.renderHeadCell(column, {
                                key: column.index,
                                'data-index': column.index
                            });
                        }))))))) : null;
    };
    Table.prototype.renderFxiedColumns = function (columns, headerOnly, tableClassName) {
        var _this = this;
        if (headerOnly === void 0) { headerOnly = false; }
        if (tableClassName === void 0) { tableClassName = ''; }
        var _a = this.props, rowClassName = _a.rowClassName, placeholder = _a.placeholder, store = _a.store, onAction = _a.onAction, buildItemProps = _a.buildItemProps, cx = _a.classnames, ns = _a.classPrefix, checkOnItemClick = _a.checkOnItemClick, render = _a.render, data = _a.data;
        return (react_1.default.createElement("table", { className: cx('Table-table', store.combineNum > 0 ? 'Table-table--withCombine' : '', tableClassName) },
            react_1.default.createElement("thead", null,
                store.columnGroup.length ? (react_1.default.createElement("tr", null, store.columnGroup.map(function (item, index) { return (react_1.default.createElement("th", { key: index, "data-index": item.index, colSpan: item.colSpan }, item.label)); }))) : null,
                react_1.default.createElement("tr", null, columns.map(function (column) {
                    return _this.renderHeadCell(column, {
                        key: column.index,
                        'data-index': column.index
                    });
                }))),
            headerOnly ? null : (react_1.default.createElement("tbody", null, store.rows.length ? (store.rows.map(function (item, rowIndex) {
                var itemProps = buildItemProps
                    ? buildItemProps(item, rowIndex)
                    : null;
                return (react_1.default.createElement(TableRow, tslib_1.__assign({}, itemProps, { classPrefix: ns, checkOnItemClick: checkOnItemClick, key: item.id, itemIndex: rowIndex, item: item, itemClassName: rowClassName, columns: columns, renderCell: _this.renderCell, regionPrefix: "fixed/", onCheck: _this.handleCheck, onAction: onAction, onQuickChange: store.dragging ? null : _this.handleQuickChange, "$$editable": false /* 为了编辑器特意加的 */ })));
            })) : (react_1.default.createElement("tr", { className: cx('Table-placeholder') },
                react_1.default.createElement("td", { colSpan: columns.length }, render('placeholder', placeholder, { data: data }))))))));
    };
    Table.prototype.renderToolbar = function (toolbar, index) {
        var type = toolbar.type || toolbar;
        if (type === 'columns-toggler') {
            this.renderedToolbars.push(type);
            return this.renderColumnsToggler(toolbar);
        }
        else if (type === 'drag-toggler') {
            this.renderedToolbars.push(type);
            return this.renderDragToggler();
        }
        return void 0;
    };
    Table.prototype.renderColumnsToggler = function (config) {
        var _a = this.props, store = _a.store, ns = _a.classPrefix, cx = _a.classnames, rest = tslib_1.__rest(_a, ["store", "classPrefix", "classnames"]);
        if (!store.columnsTogglable) {
            return null;
        }
        return (react_1.default.createElement(DropDownButton_1.default, tslib_1.__assign({}, rest, { iconOnly: true, align: config ? config.align : 'left', classnames: cx, classPrefix: ns, key: "columns-toggable", size: "sm", label: react_1.default.createElement("i", { className: "glyphicon glyphicon-th icon-th" }) }), store.toggableColumns.map(function (column) { return (react_1.default.createElement("li", { className: cx('DropDown-menuItem'), key: column.index },
            react_1.default.createElement(Checkbox_1.default, { classPrefix: ns, checked: column.toggled, onChange: column.toggleToggle }, column.label))); })));
    };
    Table.prototype.renderDragToggler = function () {
        var _a = this.props, store = _a.store, env = _a.env, draggable = _a.draggable, ns = _a.classPrefix, dragIcon = _a.dragIcon;
        if (!draggable || store.isNested) {
            return null;
        }
        return (react_1.default.createElement(Button_1.default, { disabled: !!store.modified, classPrefix: ns, key: "dragging-toggle", tooltip: "\u70B9\u51FB\u5F00\u59CB\u6392\u5E8F", tooltipContainer: env && env.getModalContainer ? env.getModalContainer : undefined, size: "sm", active: store.dragging, onClick: function (e) {
                e.preventDefault();
                store.toggleDragging();
                store.dragging && store.clear();
            }, iconOnly: true },
            react_1.default.createElement("i", { className: dragIcon })));
    };
    Table.prototype.renderActions = function (region) {
        var _this = this;
        var _a = this.props, actions = _a.actions, render = _a.render, store = _a.store, cx = _a.classnames, data = _a.data;
        actions = Array.isArray(actions) ? actions.concat() : [];
        if (store.toggable &&
            region === 'header' &&
            !~this.renderedToolbars.indexOf('columns-toggler')) {
            actions.push({
                type: 'button',
                children: this.renderColumnsToggler()
            });
        }
        if (store.draggable &&
            !store.isNested &&
            region === 'header' &&
            store.rows.length > 1 &&
            !~this.renderedToolbars.indexOf('drag-toggler')) {
            actions.push({
                type: 'button',
                children: this.renderDragToggler()
            });
        }
        return Array.isArray(actions) && actions.length ? (react_1.default.createElement("div", { className: cx('Table-actions') }, actions.map(function (action, key) {
            return render("action/" + key, tslib_1.__assign({ type: 'button' }, action), {
                onAction: _this.handleAction,
                key: key,
                btnDisabled: store.dragging,
                data: store.getData(data)
            });
        }))) : null;
    };
    Table.prototype.renderHeader = function (editable) {
        var _a = this.props, header = _a.header, headerClassName = _a.headerClassName, toolbarClassName = _a.toolbarClassName, headerToolbarRender = _a.headerToolbarRender, render = _a.render, showHeader = _a.showHeader, store = _a.store, cx = _a.classnames, data = _a.data;
        if (showHeader === false) {
            return null;
        }
        var otherProps = {};
        editable === false && (otherProps.$$editable = false);
        var child = headerToolbarRender
            ? headerToolbarRender(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, this.props), { selectedItems: store.selectedRows.map(function (item) { return item.data; }), items: store.rows.map(function (item) { return item.data; }), unSelectedItems: store.unSelectedRows.map(function (item) { return item.data; }) }), otherProps), this.renderToolbar)
            : null;
        var actions = this.renderActions('header');
        var toolbarNode = actions || child || store.dragging ? (react_1.default.createElement("div", { className: cx('Table-toolbar Table-headToolbar', toolbarClassName), key: "header-toolbar" },
            actions,
            child,
            store.dragging ? (react_1.default.createElement("div", { className: cx('Table-dragTip'), ref: this.dragTipRef }, "\u8BF7\u62D6\u52A8\u5DE6\u8FB9\u7684\u6309\u94AE\u8FDB\u884C\u6392\u5E8F")) : null)) : null;
        var headerNode = header && (!Array.isArray(header) || header.length) ? (react_1.default.createElement("div", { className: cx('Table-header', headerClassName), key: "header" }, render('header', header, tslib_1.__assign(tslib_1.__assign({}, (editable === false ? otherProps : null)), { data: store.getData(data) })))) : null;
        return headerNode && toolbarNode
            ? [headerNode, toolbarNode]
            : headerNode || toolbarNode || null;
    };
    Table.prototype.renderFooter = function () {
        var _a = this.props, footer = _a.footer, toolbarClassName = _a.toolbarClassName, footerClassName = _a.footerClassName, footerToolbarRender = _a.footerToolbarRender, render = _a.render, showFooter = _a.showFooter, store = _a.store, data = _a.data, cx = _a.classnames;
        if (showFooter === false) {
            return null;
        }
        var child = footerToolbarRender
            ? footerToolbarRender(tslib_1.__assign(tslib_1.__assign({}, this.props), { selectedItems: store.selectedRows.map(function (item) { return item.data; }), items: store.rows.map(function (item) { return item.data; }) }), this.renderToolbar)
            : null;
        var actions = this.renderActions('footer');
        var toolbarNode = actions || child ? (react_1.default.createElement("div", { className: cx('Table-toolbar Table-footToolbar', toolbarClassName), key: "footer-toolbar" },
            actions,
            child)) : null;
        var footerNode = footer && (!Array.isArray(footer) || footer.length) ? (react_1.default.createElement("div", { className: cx('Table-footer', footerClassName), key: "footer" }, render('footer', footer, {
            data: store.getData(data)
        }))) : null;
        return footerNode && toolbarNode
            ? [toolbarNode, footerNode]
            : footerNode || toolbarNode || null;
    };
    Table.prototype.renderRows = function (rows) {
        var _this = this;
        var _a = this.props, store = _a.store, rowClassName = _a.rowClassName, onAction = _a.onAction, buildItemProps = _a.buildItemProps, checkOnItemClick = _a.checkOnItemClick, ns = _a.classPrefix, cx = _a.classnames;
        return rows.map(function (item, rowIndex) {
            var itemProps = buildItemProps ? buildItemProps(item, rowIndex) : null;
            var doms = [
                react_1.default.createElement(TableRow, tslib_1.__assign({}, itemProps, { classPrefix: ns, checkOnItemClick: checkOnItemClick, key: item.id, itemIndex: rowIndex, item: item, itemClassName: cx(rowClassName, {
                        'is-last': item.depth > 1 && rowIndex === rows.length - 1,
                        'is-expanded': item.expanded,
                        'is-expandable': item.expandable
                    }), columns: store.filteredColumns, renderCell: _this.renderCell, onAction: onAction, onCheck: _this.handleCheck, 
                    // todo 先注释 quickEditEnabled={item.depth === 1}
                    onQuickChange: store.dragging ? null : _this.handleQuickChange }))
            ];
            if (item.expanded && !store.dragging) {
                if (store.footable && store.footableColumns.length) {
                    if (item.depth === 1) {
                        doms.push(react_1.default.createElement(TableRow, tslib_1.__assign({}, itemProps, { classPrefix: ns, checkOnItemClick: checkOnItemClick, key: "foot-" + item.id, itemIndex: rowIndex, item: item, itemClassName: rowClassName, columns: store.footableColumns, renderCell: _this.renderCell, onAction: onAction, onCheck: _this.handleCheck, footableMode: true, footableColSpan: store.filteredColumns.length, onQuickChange: store.dragging ? null : _this.handleQuickChange })));
                    }
                }
                else if (Array.isArray(item.data.children)) {
                    // 嵌套表格
                    doms.push.apply(doms, _this.renderRows(item.children));
                }
            }
            return doms;
        });
    };
    Table.prototype.renderItemActions = function () {
        var _a = this.props, itemActions = _a.itemActions, render = _a.render, store = _a.store, cx = _a.classnames;
        var rowIndex = store.hoverIndex;
        if (!~rowIndex || !itemActions || !itemActions.length) {
            return null;
        }
        var heights = this.heights;
        var height = 40;
        var top = 0;
        if (heights && heights[rowIndex]) {
            height = heights[rowIndex];
            top += heights.header;
            for (var i = rowIndex - 1; i >= 0; i--) {
                top += heights[i];
            }
        }
        return (react_1.default.createElement("div", { className: cx('Table-itemActions-wrap'), style: {
                top: top,
                height: height
            } },
            react_1.default.createElement("div", { className: cx('Table-itemActions') }, itemActions.map(function (action, index) {
                return action.hiddenOnHover
                    ? null
                    : render("itemAction/" + index, tslib_1.__assign(tslib_1.__assign({}, action), { isMenuItem: true }), {
                        key: index,
                        item: store.rows[rowIndex],
                        data: store.rows[rowIndex].locals,
                        rowIndex: rowIndex
                    });
            }))));
    };
    Table.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, store = _a.store, placeholder = _a.placeholder, cx = _a.classnames, data = _a.data, render = _a.render;
        this.renderedToolbars = []; // 用来记录哪些 toolbar 已经渲染了，已经渲染了就不重复渲染了。
        var heading = this.renderHeading();
        var header = this.renderHeader();
        var footer = this.renderFooter();
        var tableClassName = cx('Table-table', store.combineNum > 0 ? 'Table-table--withCombine' : '', this.props.tableClassName);
        return (react_1.default.createElement("div", { className: cx('Table', className, {
                'Table--unsaved': !!store.modified || !!store.moved
            }) },
            this.renderAffixHeader(tableClassName),
            heading,
            header,
            react_1.default.createElement("div", { className: cx('Table-contentWrap'), onMouseLeave: this.handleMouseLeave },
                react_1.default.createElement("div", { className: cx('Table-fixedLeft') }, store.leftFixedColumns.length
                    ? this.renderFxiedColumns(store.leftFixedColumns, false, tableClassName)
                    : null),
                react_1.default.createElement("div", { className: cx('Table-fixedRight') }, store.rightFixedColumns.length
                    ? this.renderFxiedColumns(store.rightFixedColumns, false, tableClassName)
                    : null),
                react_1.default.createElement("div", { onMouseMove: this.handleMouseMove, className: cx('Table-content'), onScroll: this.handleOutterScroll },
                    react_1.default.createElement("table", { ref: this.tableRef, className: tableClassName },
                        react_1.default.createElement("thead", null,
                            store.columnGroup.length ? (react_1.default.createElement("tr", null, store.columnGroup.map(function (item, index) { return (react_1.default.createElement("th", { key: index, "data-index": item.index, colSpan: item.colSpan }, item.label)); }))) : null,
                            react_1.default.createElement("tr", null, store.filteredColumns.map(function (column) {
                                return _this.renderHeadCell(column, {
                                    'data-index': column.index,
                                    key: column.index
                                });
                            }))),
                        react_1.default.createElement("tbody", null, store.rows.length ? (this.renderRows(store.rows)) : (react_1.default.createElement("tr", { className: cx('Table-placeholder') },
                            react_1.default.createElement("td", { colSpan: store.filteredColumns.length }, render('placeholder', placeholder, { data: data }))))))),
                ~store.hoverIndex ? this.renderItemActions() : null),
            footer));
    };
    var _a;
    Table.propsList = [
        'header',
        'headerToolbarRender',
        'footer',
        'footerToolbarRender',
        'footable',
        'expandConfig',
        'placeholder',
        'tableClassName',
        'source',
        'selectable',
        'columnsTogglable',
        'affixHeader',
        'headerClassName',
        'footerClassName',
        'selected',
        'multiple',
        'primaryField',
        'hideQuickSaveBtn',
        'itemCheckableOn',
        'itemDraggableOn',
        'checkOnItemClick',
        'hideCheckToggler',
        'itemActions',
        'combineNum',
        'items',
        'valueField'
    ];
    Table.defaultProps = {
        className: '',
        placeholder: '暂无数据',
        tableClassName: '',
        source: '$items',
        selectable: false,
        columnsTogglable: 'auto',
        affixHeader: true,
        headerClassName: '',
        footerClassName: '',
        toolbarClassName: '',
        primaryField: 'id',
        itemCheckableOn: '',
        itemDraggableOn: '',
        hideCheckToggler: false,
        dragIcon: 'glyphicon glyphicon-sort'
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.DragEvent) === "function" ? _a : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], Table.prototype, "handleDragStart", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], Table.prototype, "handleDragOver", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], Table.prototype, "handleDrop", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], Table.prototype, "handleDragEnd", null);
    return Table;
}(react_1.default.Component));
exports.default = Table;
var TableRow = /** @class */ (function (_super) {
    tslib_1.__extends(TableRow, _super);
    function TableRow(props) {
        var _this = _super.call(this, props) || this;
        _this.handleAction = _this.handleAction.bind(_this);
        _this.handleQuickChange = _this.handleQuickChange.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }
    TableRow.prototype.handleClick = function (e) {
        var target = e.target;
        var ns = this.props.classPrefix;
        var formItem;
        if (!e.currentTarget.contains(target) ||
            ~['INPUT', 'TEXTAREA'].indexOf(target.tagName) ||
            ((formItem = target.closest("button, a, ." + ns + "Form-item")) &&
                e.currentTarget.contains(formItem))) {
            return;
        }
        this.props.onCheck(this.props.item);
    };
    TableRow.prototype.handleAction = function (e, action, ctx) {
        var _a = this.props, onAction = _a.onAction, item = _a.item;
        onAction && onAction(e, action, ctx || item.data);
    };
    TableRow.prototype.handleQuickChange = function (values, saveImmediately, savePristine) {
        var _a = this.props, onQuickChange = _a.onQuickChange, item = _a.item;
        onQuickChange && onQuickChange(item, values, saveImmediately, savePristine);
    };
    TableRow.prototype.render = function () {
        var _a, _b;
        var _this = this;
        var _c = this.props, itemClassName = _c.itemClassName, itemIndex = _c.itemIndex, item = _c.item, columns = _c.columns, renderCell = _c.renderCell, children = _c.children, footableMode = _c.footableMode, footableColSpan = _c.footableColSpan, regionPrefix = _c.regionPrefix, checkOnItemClick = _c.checkOnItemClick, ns = _c.classPrefix, rest = tslib_1.__rest(_c, ["itemClassName", "itemIndex", "item", "columns", "renderCell", "children", "footableMode", "footableColSpan", "regionPrefix", "checkOnItemClick", "classPrefix"]);
        if (footableMode) {
            return (react_1.default.createElement("tr", { "data-id": item.id, "data-index": item.newIndex, onClick: checkOnItemClick ? this.handleClick : undefined, className: classnames_1.default(itemClassName, (_a = {
                        'is-hovered': item.isHover,
                        'is-checked': item.checked,
                        'is-modified': item.modified,
                        'is-moved': item.moved
                    },
                    _a[ns + "Table-tr--odd"] = itemIndex % 2 === 0,
                    _a[ns + "Table-tr--even"] = itemIndex % 2 === 1,
                    _a)) },
                react_1.default.createElement("td", { className: ns + "Table-foot", colSpan: footableColSpan },
                    react_1.default.createElement("table", { className: ns + "Table-footTable" },
                        react_1.default.createElement("tbody", null, columns.map(function (column) { return (react_1.default.createElement("tr", { key: column.index },
                            column.label !== false ? react_1.default.createElement("th", null, column.label) : null,
                            renderCell("" + regionPrefix + itemIndex + "/" + column.index, column, item, tslib_1.__assign(tslib_1.__assign({}, rest), { width: null, rowIndex: itemIndex, colIndex: column.rawIndex, key: column.index, onAction: _this.handleAction, onQuickChange: _this.handleQuickChange })))); }))))));
        }
        return (react_1.default.createElement("tr", { onClick: checkOnItemClick ? this.handleClick : undefined, "data-index": item.depth === 1 ? item.newIndex : undefined, "data-id": item.id, className: classnames_1.default(itemClassName, (_b = {
                    'is-hovered': item.isHover,
                    'is-checked': item.checked,
                    'is-modified': item.modified,
                    'is-moved': item.moved
                },
                _b[ns + "Table-tr--odd"] = itemIndex % 2 === 0,
                _b[ns + "Table-tr--even"] = itemIndex % 2 === 1,
                _b), ns + "Table-tr--" + item.depth + "th") }, columns.map(function (column) {
            return renderCell(itemIndex + "/" + column.index, column, item, tslib_1.__assign(tslib_1.__assign({}, rest), { rowIndex: itemIndex, colIndex: column.rawIndex, key: column.index, onAction: _this.handleAction, onQuickChange: _this.handleQuickChange }));
        })));
    };
    TableRow = tslib_1.__decorate([
        mobx_react_1.observer,
        tslib_1.__metadata("design:paramtypes", [Object])
    ], TableRow);
    return TableRow;
}(react_1.default.Component));
var TableRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TableRenderer, _super);
    function TableRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: function (path) {
                return /(^|\/)table$/.test(path);
            } /* && !/(^|\/)table$/.test(path)*/,
            storeType: table_1.TableStore.name,
            name: 'table'
        })
    ], TableRenderer);
    return TableRenderer;
}(Table));
exports.TableRenderer = TableRenderer;
var HeadCellSearchDropDown = /** @class */ (function (_super) {
    tslib_1.__extends(HeadCellSearchDropDown, _super);
    function HeadCellSearchDropDown(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isOpened: false
        };
        _this.open = _this.open.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleAction = _this.handleAction.bind(_this);
        return _this;
    }
    HeadCellSearchDropDown.prototype.buildSchema = function () {
        var _a = this.props, searchable = _a.searchable, sortable = _a.sortable, name = _a.name, label = _a.label;
        var schema;
        if (searchable === true) {
            schema = {
                title: '',
                controls: [
                    {
                        type: 'text',
                        name: name,
                        placeholder: label
                    }
                ]
            };
        }
        else if (searchable) {
            if (searchable.controls || searchable.tabs || searchable.fieldSet) {
                schema = tslib_1.__assign({ title: '' }, searchable);
            }
            else {
                schema = {
                    title: '',
                    className: searchable.formClassName,
                    controls: [
                        tslib_1.__assign({ type: searchable.type || 'text', name: searchable.name || name, placeholder: label }, searchable)
                    ]
                };
            }
        }
        if (schema && schema.controls && sortable) {
            schema.controls.unshift({
                type: 'hidden',
                name: 'orderBy',
                value: name
            }, {
                type: 'button-group',
                name: 'orderDir',
                label: '排序',
                options: [
                    {
                        label: '正序',
                        value: 'asc'
                    },
                    {
                        label: '降序',
                        value: 'desc'
                    }
                ]
            });
        }
        if (schema) {
            schema = tslib_1.__assign(tslib_1.__assign({}, schema), { type: 'form', wrapperComponent: 'div', actions: [
                    {
                        type: 'button',
                        label: '取消',
                        actionType: 'cancel'
                    },
                    {
                        label: '搜索',
                        type: 'submit',
                        primary: true
                    }
                ] });
        }
        return schema || 'error';
    };
    HeadCellSearchDropDown.prototype.handleClickOutside = function () {
        this.close();
    };
    HeadCellSearchDropDown.prototype.open = function () {
        this.setState({
            isOpened: true
        });
    };
    HeadCellSearchDropDown.prototype.close = function () {
        this.setState({
            isOpened: false
        });
    };
    HeadCellSearchDropDown.prototype.handleAction = function (e, action, ctx) {
        var onAction = this.props.onAction;
        if (action.actionType === 'cancel' || action.actionType === 'close') {
            this.close();
            return;
        }
        onAction && onAction(e, action, ctx);
    };
    HeadCellSearchDropDown.prototype.handleSubmit = function (values) {
        var _a = this.props, onQuery = _a.onQuery, name = _a.name;
        this.close();
        if (values.orderDir) {
            values = tslib_1.__assign(tslib_1.__assign({}, values), { orderBy: name });
        }
        onQuery(values);
    };
    HeadCellSearchDropDown.prototype.render = function () {
        var _this = this;
        var _a = this.props, render = _a.render, name = _a.name, data = _a.data, searchable = _a.searchable, store = _a.store, orderBy = _a.orderBy, popOverContainer = _a.popOverContainer, ns = _a.classPrefix;
        return (react_1.default.createElement("span", { className: classnames_1.default(ns + "TableCell-searchBtn") },
            react_1.default.createElement("i", { className: "fa fa-search", onClick: this.open }),
            this.state.isOpened ? (react_1.default.createElement(Overlay_1.default, { container: popOverContainer || (function () { return react_dom_1.findDOMNode(_this); }), placement: "left-bottom-left-top right-bottom-right-top", target: popOverContainer ? function () { return react_dom_1.findDOMNode(_this).parentNode; } : null, show: true },
                react_1.default.createElement(PopOver_1.default, { classPrefix: ns, onHide: this.close, className: classnames_1.default(ns + "TableCell-searchPopOver", searchable.className), overlay: true }, render('quick-search-form', this.buildSchema(), {
                    data: tslib_1.__assign(tslib_1.__assign({}, data), { orderBy: orderBy, orderDir: orderBy === name ? store.orderDir : '' }),
                    onSubmit: this.handleSubmit,
                    onAction: this.handleAction
                })))) : null));
    };
    return HeadCellSearchDropDown;
}(react_1.default.Component));
exports.HeadCellSearchDropDown = HeadCellSearchDropDown;
var HeadCellFilterDropDown = /** @class */ (function (_super) {
    tslib_1.__extends(HeadCellFilterDropDown, _super);
    function HeadCellFilterDropDown(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isOpened: false,
            filterOptions: []
        };
        _this.sourceInvalid = false;
        _this.open = _this.open.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleCheck = _this.handleCheck.bind(_this);
        return _this;
    }
    HeadCellFilterDropDown.prototype.componentDidMount = function () {
        var filterable = this.props.filterable;
        if (filterable.source) {
            this.fetchOptions();
        }
        else if (filterable.options.length > 0) {
            this.setState({
                filterOptions: this.alterOptions(filterable.options)
            });
        }
    };
    HeadCellFilterDropDown.prototype.componentWillReceiveProps = function (nextProps) {
        var props = this.props;
        if (props.name !== nextProps.name ||
            props.filterable !== nextProps.filterable ||
            props.data !== nextProps.data) {
            if (nextProps.filterable.source) {
                this.sourceInvalid = api_1.isApiOutdated(props.filterable.source, nextProps.filterable.source, props.data, nextProps.data);
            }
            else if (nextProps.filterable.options) {
                this.setState({
                    filterOptions: this.alterOptions(nextProps.filterable.options || [])
                });
            }
        }
    };
    HeadCellFilterDropDown.prototype.componentDidUpdate = function () {
        this.sourceInvalid && this.fetchOptions();
    };
    HeadCellFilterDropDown.prototype.fetchOptions = function () {
        var _this = this;
        var _a = this.props, env = _a.env, filterable = _a.filterable, data = _a.data;
        if (!api_1.isEffectiveApi(filterable.source, data)) {
            return;
        }
        var api = api_1.normalizeApi(filterable.source);
        api.cache = 3000; // 开启 3s 缓存，因为固顶位置渲染1次会额外多次请求。
        env.fetcher(api, data).then(function (ret) {
            var options = (ret.data && ret.data.options) || [];
            _this.setState({
                filterOptions: ret && ret.data && _this.alterOptions(options)
            });
        });
    };
    HeadCellFilterDropDown.prototype.alterOptions = function (options) {
        var _a = this.props, data = _a.data, filterable = _a.filterable, name = _a.name;
        var filterValue = (data && data[name]) || '';
        if (filterable.multiple) {
            options = options.map(function (option) { return (tslib_1.__assign(tslib_1.__assign({}, option), { selected: filterValue.split(',').indexOf(option.value) > -1 })); });
        }
        else {
            options = options.map(function (option) { return (tslib_1.__assign(tslib_1.__assign({}, option), { selected: option.value === filterValue })); });
        }
        return options;
    };
    HeadCellFilterDropDown.prototype.handleClickOutside = function () {
        this.close();
    };
    HeadCellFilterDropDown.prototype.open = function () {
        this.setState({
            isOpened: true
        });
    };
    HeadCellFilterDropDown.prototype.close = function () {
        this.setState({
            isOpened: false
        });
    };
    HeadCellFilterDropDown.prototype.handleClick = function (value) {
        var _a;
        var _b = this.props, onQuery = _b.onQuery, name = _b.name;
        onQuery((_a = {},
            _a[name] = value,
            _a));
        this.close();
    };
    HeadCellFilterDropDown.prototype.handleCheck = function (value) {
        var _a;
        var _b = this.props, data = _b.data, name = _b.name, onQuery = _b.onQuery;
        var query;
        if (data[name] && data[name] === value) {
            query = '';
        }
        else {
            query =
                (data[name] && xor(data[name].split(','), [value]).join(',')) || value;
        }
        onQuery((_a = {},
            _a[name] = query,
            _a));
    };
    HeadCellFilterDropDown.prototype.render = function () {
        var _this = this;
        var _a = this.state, isOpened = _a.isOpened, filterOptions = _a.filterOptions;
        var _b = this.props, filterable = _b.filterable, popOverContainer = _b.popOverContainer, ns = _b.classPrefix, cx = _b.classnames;
        return (react_1.default.createElement("span", { className: cx(ns + "TableCell-filterBtn") },
            react_1.default.createElement("i", { className: "fa fa-filter", onClick: this.open }),
            isOpened ? (react_1.default.createElement(Overlay_1.default, { container: popOverContainer || (function () { return react_dom_1.findDOMNode(_this); }), placement: "left-bottom-left-top right-bottom-right-top", target: popOverContainer ? function () { return react_dom_1.findDOMNode(_this).parentNode; } : null, show: true },
                react_1.default.createElement(PopOver_1.default, { classPrefix: ns, onHide: this.close, className: cx(ns + "TableCell-filterPopOver", filterable.className), overlay: true }, filterOptions && filterOptions.length > 0 ? (react_1.default.createElement("ul", { className: cx('DropDown-menu') }, !filterable.multiple
                    ? filterOptions.map(function (option, index) { return (react_1.default.createElement("li", { key: index, className: cx('DropDown-divider', {
                            'is-selected': option.selected
                        }), onClick: _this.handleClick.bind(_this, option.value) }, option.label)); })
                    : filterOptions.map(function (option, index) { return (react_1.default.createElement("li", { key: index, className: cx('DropDown-divider') },
                        react_1.default.createElement(Checkbox_1.default, { classPrefix: ns, onChange: _this.handleCheck.bind(_this, option.value), checked: option.selected }, option.label))); }))) : null))) : null));
    };
    return HeadCellFilterDropDown;
}(react_1.default.Component));
exports.HeadCellFilterDropDown = HeadCellFilterDropDown;
var TableCell = /** @class */ (function (_super) {
    tslib_1.__extends(TableCell, _super);
    function TableCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableCell.prototype.render = function () {
        var _a = this.props, className = _a.className, render = _a.render, style = _a.style, Component = _a.wrapperComponent, column = _a.column, value = _a.value, data = _a.data, children = _a.children, width = _a.width, innerClassName = _a.innerClassName, label = _a.label, tabIndex = _a.tabIndex, onKeyUp = _a.onKeyUp, rowSpan = _a.rowSpan, _body = _a.body, tpl = _a.tpl, remark = _a.remark, prefix = _a.prefix, affix = _a.affix, rest = tslib_1.__rest(_a, ["className", "render", "style", "wrapperComponent", "column", "value", "data", "children", "width", "innerClassName", "label", "tabIndex", "onKeyUp", "rowSpan", "body", "tpl", "remark", "prefix", "affix"]);
        var schema = tslib_1.__assign(tslib_1.__assign({}, column), { className: innerClassName, type: (column && column.type) || 'plain' });
        var body = children
            ? children
            : render('field', schema, tslib_1.__assign(tslib_1.__assign({}, rest), { value: value,
                data: data }));
        if (width) {
            style = tslib_1.__assign(tslib_1.__assign({}, style), { width: (style && style.width) || width });
            if (!/%$/.test(String(style.width))) {
                body = (react_1.default.createElement("div", { style: { width: style.width } },
                    prefix,
                    body,
                    affix));
                prefix = null;
                affix = null;
                // delete style.width;
            }
        }
        if (!Component) {
            return body;
        }
        return (react_1.default.createElement(Component, { rowSpan: rowSpan > 1 ? rowSpan : undefined, style: style, className: className, tabIndex: tabIndex, onKeyUp: onKeyUp },
            prefix,
            body,
            affix));
    };
    TableCell.defaultProps = {
        wrapperComponent: 'td'
    };
    TableCell.propsList = [
        'type',
        'label',
        'column',
        'body',
        'tpl',
        'rowSpan',
        'remark'
    ];
    return TableCell;
}(react_1.default.Component));
exports.TableCell = TableCell;
var TableCellRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TableCellRenderer, _super);
    function TableCellRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableCellRenderer.propsList = tslib_1.__spreadArrays([
        'quickEdit',
        'quickEditEnabledOn',
        'popOver',
        'copyable',
        'inline'
    ], TableCell.propsList);
    TableCellRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)table\/(?:.*\/)?cell$/,
            name: 'table-cell'
        }),
        QuickEdit_1.default(),
        PopOver_2.default(),
        Copyable_1.default(),
        mobx_react_1.observer
    ], TableCellRenderer);
    return TableCellRenderer;
}(TableCell));
exports.TableCellRenderer = TableCellRenderer;
var FieldRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(FieldRenderer, _super);
    function FieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, TableCell.defaultProps), { wrapperComponent: 'div' });
    FieldRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)field$/,
            name: 'field'
        }),
        PopOver_2.default(),
        Copyable_1.default()
    ], FieldRenderer);
    return FieldRenderer;
}(TableCell));
exports.FieldRenderer = FieldRenderer;
//# sourceMappingURL=./renderers/Table.js.map
