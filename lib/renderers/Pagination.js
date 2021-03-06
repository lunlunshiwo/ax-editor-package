"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var helper_1 = require("../utils/helper");
var Pagination = /** @class */ (function (_super) {
    tslib_1.__extends(Pagination, _super);
    function Pagination() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            pageNum: String(_this.props.activePage) || ''
        };
        return _this;
    }
    Pagination.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.activePage !== nextProps.activePage) {
            this.setState({
                pageNum: String(nextProps.activePage) || ''
            });
        }
    };
    Pagination.prototype.renderSimple = function () {
        var _a = this.props, activePage = _a.activePage, hasNext = _a.hasNext, onPageChange = _a.onPageChange, cx = _a.classnames;
        return (react_1.default.createElement("ul", { className: cx('Pagination', 'Pagination--sm') },
            react_1.default.createElement("li", { className: cx({
                    disabled: activePage < 2
                }), onClick: activePage < 2
                    ? function (e) { return e.preventDefault(); }
                    : function () { return onPageChange(activePage - 1); } },
                react_1.default.createElement("a", null,
                    react_1.default.createElement("i", { className: "fa fa-chevron-left" }))),
            react_1.default.createElement("li", { className: cx({
                    disabled: !hasNext
                }), onClick: !hasNext
                    ? function (e) { return e.preventDefault(); }
                    : function () { return onPageChange(activePage + 1); } },
                react_1.default.createElement("a", null,
                    react_1.default.createElement("i", { className: "fa fa-chevron-right" })))));
    };
    Pagination.prototype.handlePageChange = function (e) {
        var items = this.props.items;
        var value = e.currentTarget.value;
        if (/^\d+$/.test(value) && parseInt(value, 10) > items) {
            value = String(items);
        }
        this.setState({ pageNum: value });
    };
    Pagination.prototype.renderNormal = function () {
        var _a = this.props, activePage = _a.activePage, items = _a.items, maxButtons = _a.maxButtons, onPageChange = _a.onPageChange, cx = _a.classnames, showPageInput = _a.showPageInput;
        var pageNum = this.state.pageNum;
        var pageButtons = [];
        var startPage;
        var endPage;
        if (activePage < (maxButtons - 1) / 2 + 2) {
            maxButtons = activePage + (maxButtons - 1) / 2;
        }
        if (items - activePage < (maxButtons - 1) / 2 + 2) {
            maxButtons = items - activePage + (maxButtons - 1) / 2 + 1;
        }
        if (maxButtons && maxButtons < items) {
            startPage = Math.max(Math.min(activePage - Math.floor(maxButtons / 2), items - maxButtons + 1), 1);
            endPage = startPage + maxButtons - 1;
        }
        else {
            startPage = 1;
            endPage = items;
        }
        var _loop_1 = function (page) {
            pageButtons.push(react_1.default.createElement("li", { onClick: function () { return onPageChange(page); }, key: page, className: cx({
                    active: page === activePage
                }) },
                react_1.default.createElement("a", { role: "button" }, page)));
        };
        for (var page = startPage; page <= endPage; ++page) {
            _loop_1(page);
        }
        if (startPage > 1) {
            if (startPage > 2) {
                pageButtons.unshift(react_1.default.createElement("li", { onClick: function () { return onPageChange(startPage - 1); }, key: "prev-ellipsis" },
                    react_1.default.createElement("a", { role: "button" }, "...")));
            }
            pageButtons.unshift(react_1.default.createElement("li", { onClick: function () { return onPageChange(1); }, key: 1, className: cx({
                    active: 1 === activePage
                }) },
                react_1.default.createElement("a", { role: "button" }, 1)));
        }
        if (endPage < items) {
            if (items - endPage > 1) {
                pageButtons.push(react_1.default.createElement("li", { className: cx('Pagination-ellipsis'), onClick: function () { return onPageChange(endPage + 1); }, key: "next-ellipsis" },
                    react_1.default.createElement("a", { role: "button" },
                        react_1.default.createElement("span", null, "..."))));
            }
            pageButtons.push(react_1.default.createElement("li", { onClick: function () { return onPageChange(items); }, key: items, className: cx({
                    active: items === activePage
                }) },
                react_1.default.createElement("a", { role: "button" }, items)));
        }
        pageButtons.unshift(react_1.default.createElement("li", { className: cx('Pagination-prev', {
                disabled: activePage === 1
            }), onClick: activePage === 1
                ? function (e) { return e.preventDefault(); }
                : function () { return onPageChange(activePage - 1); }, key: "prev" },
            react_1.default.createElement("span", null)));
        pageButtons.push(react_1.default.createElement("li", { className: cx('Pagination-next', {
                disabled: activePage === items
            }), onClick: activePage === items
                ? function (e) { return e.preventDefault(); }
                : function () { return onPageChange(activePage + 1); }, key: "next" },
            react_1.default.createElement("span", null)));
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("ul", { className: cx('Pagination', 'Pagination--sm') }, pageButtons),
            items > 9 && showPageInput ? (react_1.default.createElement("div", { className: "inline m-l-xs w-xs", key: "toPage" },
                react_1.default.createElement("span", { className: cx('Pagination-inputGroup') },
                    react_1.default.createElement("input", { type: "text", className: cx('Pagination-input'), onChange: this.handlePageChange, onFocus: function (e) { return e.currentTarget.select(); }, onKeyUp: function (e) {
                            return e.keyCode == 13 &&
                                onPageChange(parseInt(e.currentTarget.value, 10));
                        }, value: pageNum }),
                    react_1.default.createElement("span", null,
                        react_1.default.createElement("button", { onClick: function () { return onPageChange(parseInt(pageNum, 10)); }, type: "submit", className: cx('Button', 'Button--default') }, "Go"))))) : null));
    };
    Pagination.prototype.render = function () {
        var mode = this.props.mode;
        return mode === 'simple' ? this.renderSimple() : this.renderNormal();
    };
    var _a;
    Pagination.defaultProps = {
        activePage: 1,
        items: 1,
        maxButtons: 5,
        mode: 'normal',
        hasNext: false,
        showPageInput: true
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.ChangeEvent) === "function" ? _a : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], Pagination.prototype, "handlePageChange", null);
    return Pagination;
}(react_1.default.Component));
exports.default = Pagination;
var PaginationRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(PaginationRenderer, _super);
    function PaginationRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaginationRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)pagination$/,
            name: 'pagination'
        })
    ], PaginationRenderer);
    return PaginationRenderer;
}(Pagination));
exports.PaginationRenderer = PaginationRenderer;
//# sourceMappingURL=./renderers/Pagination.js.map
