"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Item_1 = require("./Item");
// @require 'cropperjs/dist/cropper.css';
var react_cropper_1 = tslib_1.__importDefault(require("react-cropper"));
var react_dropzone_1 = tslib_1.__importDefault(require("react-dropzone"));
require("blueimp-canvastoblob");
var find = require("lodash/find");
var qs_1 = tslib_1.__importDefault(require("qs"));
var api_1 = require("../../utils/api");
var helper_1 = require("../../utils/helper");
var icons_1 = require("../../components/icons");
var Button_1 = tslib_1.__importDefault(require("../../components/Button"));
// @ts-ignore
var attr_accept_1 = tslib_1.__importDefault(require("attr-accept"));
var id = 1;
function gennerateId() {
    return id++;
}
var preventEvent = function (e) { return e.stopPropagation(); };
var ImageControl = /** @class */ (function (_super) {
    tslib_1.__extends(ImageControl, _super);
    function ImageControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            uploading: false,
            locked: false,
            files: []
        };
        _this.cropper = react_1.default.createRef();
        _this.dropzone = react_1.default.createRef();
        _this.current = null;
        var value = props.value;
        var multiple = props.multiple;
        var joinValues = props.joinValues;
        var delimiter = props.delimiter;
        var files = [];
        if (value) {
            // files = (multiple && Array.isArray(value) ? value : joinValues ? (value as string).split(delimiter) : [value])
            files = (Array.isArray(value)
                ? value
                : joinValues && typeof value === 'string' && multiple
                    ? value.split(delimiter)
                    : [value])
                .map(function (item) { return ImageControl.valueToFile(item); })
                .filter(function (item) { return item; });
        }
        _this.state = tslib_1.__assign(tslib_1.__assign({}, _this.state), { files: files, crop: _this.buildCrop(props) });
        _this.sendFile = _this.sendFile.bind(_this);
        _this.removeFile = _this.removeFile.bind(_this);
        _this.handleDrop = _this.handleDrop.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleCrop = _this.handleCrop.bind(_this);
        _this.handleDropRejected = _this.handleDropRejected.bind(_this);
        _this.cancelCrop = _this.cancelCrop.bind(_this);
        _this.handleImageLoaded = _this.handleImageLoaded.bind(_this);
        _this.startUpload = _this.startUpload.bind(_this);
        _this.stopUpload = _this.stopUpload.bind(_this);
        _this.toggleUpload = _this.toggleUpload.bind(_this);
        _this.tick = _this.tick.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        _this.addFiles = _this.addFiles.bind(_this);
        _this.handleSelect = _this.handleSelect.bind(_this);
        _this.handlePaste = _this.handlePaste.bind(_this);
        return _this;
    }
    ImageControl.formatFileSize = function (size, units) {
        if (units === void 0) { units = [' B', ' KB', ' M', ' G']; }
        size = parseInt(size, 10) || 0;
        while (size > 1024 && units.length > 1) {
            size /= 1024;
            units.shift();
        }
        return size.toFixed(2) + units[0];
    };
    ImageControl.valueToFile = function (value, props) {
        return value
            ? tslib_1.__assign(tslib_1.__assign({}, (typeof value === 'string'
                ? {
                    value: value,
                    url: value,
                    id: gennerateId()
                }
                : value)), { state: 'init' }) : undefined;
    };
    ImageControl.sizeInfo = function (width, height) {
        if (!width) {
            return "\u9AD8\u5EA6" + height + "px";
        }
        else if (!height) {
            return "\u5BBD\u5EA6" + width + "px";
        }
        return "\u5C3A\u5BF8\uFF08" + width + " x " + height + "\uFF09";
    };
    ImageControl.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        var props = this.props;
        if (props.value !== nextProps.value) {
            var value = nextProps.value;
            var multiple = nextProps.multiple;
            var joinValues = nextProps.joinValues;
            var delimiter = nextProps.delimiter;
            var files = [];
            if (value) {
                files = (Array.isArray(value)
                    ? value
                    : joinValues && typeof value === 'string'
                        ? value.split(delimiter)
                        : [value])
                    .map(function (item) {
                    var obj = ImageControl.valueToFile(item, nextProps);
                    var org;
                    if (obj &&
                        (org = find(_this.state.files, function (item) { return item.value === obj.value; }))) {
                        obj = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, org), obj), { id: org.id || obj.id });
                    }
                    return obj;
                })
                    .filter(function (item) { return item; });
            }
            this.setState({
                files: files
            });
        }
        if (props.crop !== nextProps.crop) {
            this.setState({
                crop: this.buildCrop(nextProps)
            });
        }
    };
    ImageControl.prototype.buildCrop = function (props) {
        var crop = props.crop;
        if (crop && props.multiple) {
            props.env &&
                props.env.alert &&
                props.env.alert('图片多选配置和裁剪配置冲突，目前不能二者都支持！');
            return null;
        }
        if (crop === true) {
            crop = {};
        }
        if (crop) {
            crop = tslib_1.__assign({ aspectRatio: 1, guides: true, dragMode: 'move', viewMode: 1, rotatable: false, scalable: false }, crop);
        }
        return crop;
    };
    ImageControl.prototype.handleDropRejected = function (rejectedFiles, evt) {
        if (evt.type !== 'change' && evt.type !== 'drop') {
            return;
        }
        var _a = this.props, multiple = _a.multiple, env = _a.env, accept = _a.accept;
        var files = rejectedFiles.map(function (file) { return (tslib_1.__assign(tslib_1.__assign({}, file), { state: 'invalid', id: gennerateId(), name: file.name })); });
        this.setState({
            files: multiple
                ? this.state.files.concat(files)
                : this.state.files.length
                    ? this.state.files
                    : files.slice(0, 1)
        });
        env.alert("\u60A8\u6DFB\u52A0\u7684\u6587\u4EF6" + files.map(function (item) { return "\u3010" + item.name + "\u3011"; }) + "\u4E0D\u7B26\u5408\u7C7B\u578B\u7684`" + accept + "`\u8BBE\u5B9A\uFF0C\u8BF7\u4ED4\u7EC6\u68C0\u67E5\u3002");
    };
    ImageControl.prototype.startUpload = function () {
        if (this.state.uploading) {
            return;
        }
        this.setState({
            uploading: true,
            locked: true,
            files: this.state.files.map(function (file) {
                if (file.state === 'error') {
                    file.state = 'pending';
                }
                return file;
            })
        }, this.tick);
    };
    ImageControl.prototype.toggleUpload = function () {
        return this.state.uploading ? this.stopUpload() : this.startUpload();
    };
    ImageControl.prototype.stopUpload = function () {
        if (!this.state.uploading) {
            return;
        }
        this.setState({
            uploading: false
        });
    };
    ImageControl.prototype.tick = function () {
        var _this = this;
        if (this.current || !this.state.uploading) {
            return;
        }
        var file = find(this.state.files, function (item) { return item.state === 'pending'; });
        if (file) {
            this.current = file;
            file.state = 'uploading';
            this.setState({
                files: this.state.files.concat()
            }, function () {
                return _this.sendFile(file, function (error, file, obj) {
                    var files = _this.state.files.concat();
                    var idx = files.indexOf(file);
                    if (!~idx) {
                        return;
                    }
                    var newFile = file;
                    if (error) {
                        newFile.state =
                            file.state !== 'uploading' ? file.state : 'error';
                        newFile.error = error;
                        if (!_this.props.multiple && newFile.state === 'invalid') {
                            files.splice(idx, 1);
                            _this.current = null;
                            return _this.setState({
                                files: files,
                                error: error
                            }, _this.tick);
                        }
                    }
                    else {
                        newFile = obj;
                    }
                    files.splice(idx, 1, newFile);
                    _this.current = null;
                    _this.setState({
                        files: files
                    }, _this.tick);
                }, function (progress) {
                    var files = _this.state.files.concat();
                    var idx = files.indexOf(file);
                    if (!~idx) {
                        return;
                    }
                    // file 是个非 File 对象，先不copy了直接改。
                    file.progress = progress;
                    _this.setState({
                        files: files
                    });
                });
            });
        }
        else {
            this.setState({
                uploading: false,
                locked: false
            }, function () {
                _this.onChange();
                if (_this.resolve) {
                    _this.resolve(_this.state.files.some(function (file) { return file.state === 'error'; })
                        ? '文件上传失败请重试'
                        : null);
                    _this.resolve = undefined;
                }
            });
        }
    };
    ImageControl.prototype.removeFile = function (file, index) {
        var files = this.state.files.concat();
        files.splice(index, 1);
        this.setState({
            files: files
        }, this.onChange);
    };
    ImageControl.prototype.editImage = function (index) {
        var multiple = this.props.multiple;
        var files = this.state.files;
        this.setState({
            cropFile: {
                preview: files[index].url,
                state: 'init'
            }
        });
    };
    ImageControl.prototype.onChange = function () {
        var _a = this.props, multiple = _a.multiple, onChange = _a.onChange, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, valueField = _a.valueField;
        var files = this.state.files.filter(function (file) { return file.state == 'uploaded' || file.state == 'init'; });
        var newValue = files.length
            ? joinValues
                ? files[0].value
                : files[0]
            : '';
        if (multiple) {
            newValue = joinValues
                ? files.map(function (item) { return item.value; }).join(delimiter)
                : extractValue
                    ? files.map(function (item) { return item.value; })
                    : files;
        }
        else {
            newValue = joinValues
                ? newValue.value || newValue
                : extractValue
                    ? newValue[valueField || 'value']
                    : newValue;
        }
        onChange(newValue);
    };
    ImageControl.prototype.handleSelect = function () {
        this.dropzone.current && this.dropzone.current.open();
    };
    ImageControl.prototype.handleDrop = function (files) {
        var _a = this.props, multiple = _a.multiple, crop = _a.crop;
        if (crop && !multiple) {
            var file = files[0];
            if (!file.preview || !file.url) {
                file.preview = window.URL.createObjectURL(file);
            }
            return this.setState({
                locked: true,
                lockedReason: '请选择放弃或者应用',
                cropFile: file
            });
        }
        this.addFiles(files);
    };
    ImageControl.prototype.handlePaste = function (e) {
        var event = e.nativeEvent;
        var files = [];
        var items = event.clipboardData.items;
        var accept = this.props.accept;
        [].slice.call(items).forEach(function (item) {
            var blob;
            if (item.kind !== 'file' ||
                !(blob = item.getAsFile()) ||
                !attr_accept_1.default(blob, accept)) {
                return;
            }
            blob.id = gennerateId();
            files.push(blob);
        });
        this.handleDrop(files);
    };
    ImageControl.prototype.handleCrop = function () {
        var _this = this;
        this.cropper.current.getCroppedCanvas().toBlob(function (file) {
            _this.addFiles([file]);
            _this.setState({
                cropFile: undefined,
                locked: false,
                lockedReason: ''
            });
        });
    };
    ImageControl.prototype.cancelCrop = function () {
        this.setState({
            cropFile: undefined,
            locked: false,
            lockedReason: ''
        }, this.onChange);
    };
    ImageControl.prototype.addFiles = function (files) {
        var _this = this;
        if (!files.length) {
            return;
        }
        var _a = this.props, multiple = _a.multiple, maxLength = _a.maxLength, maxSize = _a.maxSize, accept = _a.accept;
        var currentFiles = this.state.files;
        if (!multiple && currentFiles.length) {
            currentFiles = [];
        }
        var allowed = (multiple
            ? maxLength
                ? maxLength
                : files.length + currentFiles.length
            : 1) - currentFiles.length;
        var inputFiles = [];
        [].slice.call(files, 0, allowed).forEach(function (file) {
            if (maxSize && file.size > maxSize) {
                alert("\u60A8\u9009\u62E9\u7684\u6587\u4EF6 " + file.name + " \u5927\u5C0F\u4E3A " + ImageControl.formatFileSize(file.size) + " \u8D85\u51FA\u4E86\u6700\u5927\u4E3A " + ImageControl.formatFileSize(maxSize) + " \u7684\u9650\u5236\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9");
                return;
            }
            file.state = 'pending';
            file.id = gennerateId();
            if (!file.preview || !file.url) {
                file.preview = window.URL.createObjectURL(file);
            }
            inputFiles.push(file);
        });
        if (!inputFiles.length) {
            return;
        }
        this.setState({
            error: undefined,
            files: currentFiles.concat(inputFiles),
            locked: true
        }, function () {
            var autoUpload = _this.props.autoUpload;
            if (autoUpload) {
                _this.startUpload();
            }
        });
    };
    ImageControl.prototype.sendFile = function (file, cb, onProgress) {
        var _this = this;
        var limit = this.props.limit;
        if (!limit) {
            return this._upload(file, cb, onProgress);
        }
        var image = new Image();
        image.onload = function () {
            var width = image.width;
            var height = image.height;
            var error = '';
            if ((limit.width && limit.width != width) ||
                (limit.height && limit.height != height)) {
                error = "\u60A8\u9009\u62E9\u7684\u56FE\u7247\u4E0D\u7B26\u5408\u5C3A\u5BF8\u8981\u6C42, \u8BF7\u4E0A\u4F20" + ImageControl.sizeInfo(limit.width, limit.height) + "\u7684\u56FE\u7247";
            }
            else if ((limit.maxWidth && limit.maxWidth < width) ||
                (limit.maxHeight && limit.maxHeight < height)) {
                error = "\u60A8\u9009\u62E9\u7684\u56FE\u7247\u4E0D\u7B26\u5408\u5C3A\u5BF8\u8981\u6C42, \u8BF7\u4E0A\u4F20\u4E0D\u8981\u8D85\u8FC7" + ImageControl.sizeInfo(limit.maxWidth, limit.maxHeight) + "\u7684\u56FE\u7247";
            }
            else if ((limit.minWidth && limit.minWidth > width) ||
                (limit.minHeight && limit.minHeight > height)) {
                error = "\u60A8\u9009\u62E9\u7684\u56FE\u7247\u4E0D\u7B26\u5408\u5C3A\u5BF8\u8981\u6C42, \u8BF7\u4E0A\u4F20\u4E0D\u8981\u5C0F\u4E8E" + ImageControl.sizeInfo(limit.minWidth, limit.minHeight) + "\u7684\u56FE\u7247";
            }
            else if (limit.aspectRatio &&
                Math.abs(width / height - limit.aspectRatio) > 0.01) {
                error = "\u60A8\u9009\u62E9\u7684\u56FE\u7247\u4E0D\u7B26\u5408\u5C3A\u5BF8\u8981\u6C42, \u8BF7\u4E0A\u4F20\u5C3A\u5BF8\u6BD4\u7387\u4E3A " + (limit.aspectRatioLabel ||
                    limit.aspectRatio) + " \u7684\u56FE\u7247";
            }
            if (error) {
                file.state = 'invalid';
                cb(error, file);
            }
            else {
                _this._upload(file, cb, onProgress);
            }
        };
        image.src = (file.preview || file.url);
    };
    ImageControl.prototype._upload = function (file, cb, onProgress) {
        this._send(file, this.props.reciever, {}, onProgress)
            .then(function (ret) {
            if (ret.status) {
                throw new Error(ret.msg || '上传失败, 请重试');
            }
            var obj = tslib_1.__assign(tslib_1.__assign({}, ret.data), { state: 'uploaded' });
            obj.value = obj.value || obj.url;
            cb(null, file, obj);
        })
            .catch(function (error) { return cb(error.message || '上传失败，请重试', file); });
    };
    ImageControl.prototype._send = function (file, reciever, params, onProgress) {
        var fd = new FormData();
        var data = this.props.data;
        var api = api_1.buildApi(reciever, helper_1.createObject(data, params), {
            method: 'post'
        });
        var fileField = this.props.fileField || 'file';
        fd.append(fileField, file, file.name);
        var idx = api.url.indexOf('?');
        if (~idx && params) {
            params = tslib_1.__assign(tslib_1.__assign({}, qs_1.default.parse(reciever.substring(idx + 1))), params);
            api.url = api.url.substring(0, idx) + '?' + helper_1.qsstringify(params);
        }
        else if (params) {
            api.url += '?' + helper_1.qsstringify(params);
        }
        if (api.data) {
            helper_1.qsstringify(api.data)
                .split('&')
                .forEach(function (item) {
                var parts = item.split('=');
                fd.append(parts[0], parts[1]);
            });
        }
        var env = this.props.env;
        if (!env || !env.fetcher) {
            throw new Error('fetcher is required');
        }
        return env.fetcher(api, fd, {
            method: 'post',
            onUploadProgress: function (event) {
                return onProgress(event.loaded / event.total);
            }
        });
    };
    ImageControl.prototype.handleClick = function () {
        this.refs.dropzone.open();
    };
    ImageControl.prototype.handleImageLoaded = function (index, e) {
        var _this = this;
        var imgDom = e.currentTarget;
        var img = new Image();
        img.onload = function () {
            delete img.onload;
            var files = _this.state.files.concat();
            var file = files[index];
            if (!file) {
                return;
            }
            file.info = tslib_1.__assign(tslib_1.__assign({}, file.info), { width: img.width, height: img.height });
            files.splice(index, 1, file);
            var needUploading = !!(_this.current || find(files, function (file) { return file.state === 'pending'; }));
            _this.setState({
                files: files
            }, !needUploading ? _this.onChange : undefined);
        };
        img.src = imgDom.src;
    };
    ImageControl.prototype.validate = function () {
        var _this = this;
        if (this.state.locked && this.state.lockedReason) {
            return this.state.lockedReason;
        }
        else if (this.state.uploading ||
            this.state.files.some(function (item) { return item.state === 'pending'; })) {
            return new Promise(function (resolve) {
                _this.resolve = resolve;
                _this.startUpload();
            });
        }
        else if (this.state.files.some(function (item) { return item.state === 'error'; })) {
            return '文件上传失败请重试';
        }
    };
    ImageControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, cx = _a.classnames, placeholder = _a.placeholder, disabled = _a.disabled, multiple = _a.multiple, accept = _a.accept, maxLength = _a.maxLength, autoUpload = _a.autoUpload, hideUploadButton = _a.hideUploadButton;
        var _b = this.state, files = _b.files, error = _b.error, crop = _b.crop, uploading = _b.uploading, cropFile = _b.cropFile;
        var hasPending = files.some(function (file) { return file.state == 'pending'; });
        return (react_1.default.createElement("div", { className: cx("ImageControl", className) }, cropFile ? (react_1.default.createElement("div", { className: cx('ImageControl-cropperWrapper') },
            react_1.default.createElement(react_cropper_1.default, tslib_1.__assign({}, crop, { ref: this.cropper, src: cropFile.preview })),
            react_1.default.createElement("div", { className: cx('ImageControl-croperToolbar') },
                react_1.default.createElement("a", { className: cx('ImageControl-cropCancel'), onClick: this.cancelCrop, "data-tooltip": "\u53D6\u6D88", "data-position": "left" },
                    react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" })),
                react_1.default.createElement("a", { className: cx('ImageControl-cropConfirm'), onClick: this.handleCrop, "data-tooltip": "\u786E\u8BA4", "data-position": "left" },
                    react_1.default.createElement(icons_1.Icon, { icon: "check", className: "icon" }))))) : (react_1.default.createElement(react_dropzone_1.default, { key: "drop-zone", ref: this.dropzone, onDrop: this.handleDrop, onDropRejected: this.handleDropRejected, accept: accept, multiple: multiple }, function (_a) {
            var getRootProps = _a.getRootProps, getInputProps = _a.getInputProps, isDragActive = _a.isDragActive, isDragAccept = _a.isDragAccept, isDragReject = _a.isDragReject, isFocused = _a.isFocused;
            return (react_1.default.createElement("div", tslib_1.__assign({}, getRootProps({
                onClick: preventEvent,
                onPaste: _this.handlePaste,
                className: cx('ImageControl-dropzone', {
                    disabled: disabled,
                    'is-empty': !files.length,
                    'is-active': isDragActive
                })
            })),
                react_1.default.createElement("input", tslib_1.__assign({}, getInputProps())),
                isDragActive || isDragAccept || isDragReject ? (react_1.default.createElement("div", { className: cx('ImageControl-acceptTip', {
                        'is-accept': isDragAccept,
                        'is-reject': isDragReject
                    }) }, "\u628A\u56FE\u7247\u62D6\u5230\u8FD9\uFF0C\u7136\u540E\u677E\u5B8C\u6210\u6DFB\u52A0\uFF01")) : (react_1.default.createElement(react_1.default.Fragment, null,
                    files && files.length
                        ? files.map(function (file, key) { return (react_1.default.createElement("div", { key: file.id || key, className: cx('ImageControl-item', {
                                'is-uploaded': file.state !== 'uploading',
                                'is-invalid': file.state === 'error' ||
                                    file.state === 'invalid'
                            }) }, file.state === 'invalid' ||
                            file.state === 'error' ? (react_1.default.createElement("a", { className: cx('ImageControl-retryBtn', {
                                'is-disabled': disabled
                            }), onClick: _this.handleSelect },
                            react_1.default.createElement(icons_1.Icon, { icon: "retry", className: "icon" }),
                            react_1.default.createElement("p", { className: "ImageControl-itemInfoError" }, "\u91CD\u65B0\u4E0A\u4F20"))) : file.state === 'uploading' ? (react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement("a", { onClick: _this.removeFile.bind(_this, file, key), key: "clear", className: cx('ImageControl-itemClear'), "data-tooltip": "\u79FB\u9664" },
                                react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" })),
                            react_1.default.createElement("div", { key: "info", className: cx('ImageControl-itemInfo') },
                                react_1.default.createElement("p", null, "\u6587\u4EF6\u4E0A\u4F20\u4E2D"),
                                react_1.default.createElement("div", { className: cx('ImageControl-progress') },
                                    react_1.default.createElement("span", { style: {
                                            width: Math.round(file.progress * 100) + "%"
                                        }, className: cx('ImageControl-progressValue') }))))) : (react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement("div", { key: "image", className: cx('ImageControl-itemImageWrap') },
                                react_1.default.createElement("img", { onLoad: _this.handleImageLoaded.bind(_this, key), src: file.url || file.preview, alt: file.name })),
                            react_1.default.createElement("div", { key: "overlay", className: cx('ImageControl-itemOverlay') },
                                file.info ? ([
                                    react_1.default.createElement("div", { key: "1" },
                                        file.info.width,
                                        " x ",
                                        file.info.height),
                                    file.info.len ? (react_1.default.createElement("div", { key: "2" }, ImageControl.formatFileSize(file.info.len))) : null
                                ]) : (react_1.default.createElement("div", null, "...")),
                                !disabled ? (react_1.default.createElement("a", { "data-tooltip": "\u67E5\u770B\u5927\u56FE", "data-position": "bottom", target: "_blank", href: file.url || file.preview },
                                    react_1.default.createElement(icons_1.Icon, { icon: "view", className: "icon" }))) : null,
                                !!crop && !disabled ? (react_1.default.createElement("a", { "data-tooltip": "\u88C1\u526A\u56FE\u7247", "data-position": "bottom", onClick: _this.editImage.bind(_this, key) },
                                    react_1.default.createElement(icons_1.Icon, { icon: "pencil", className: "icon" }))) : null,
                                !disabled ? (react_1.default.createElement("a", { "data-tooltip": "\u79FB\u9664", "data-position": "bottom", onClick: _this.removeFile.bind(_this, file, key) },
                                    react_1.default.createElement(icons_1.Icon, { icon: "remove", className: "icon" }))) : null))))); })
                        : null,
                    (multiple && (!maxLength || files.length < maxLength)) ||
                        (!multiple && !files.length) ? (react_1.default.createElement("label", { className: cx('ImageControl-addBtn', {
                            'is-disabled': disabled
                        }), onClick: _this.handleSelect, "data-tooltip": placeholder, "data-position": "right" },
                        react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" }),
                        isFocused ? (react_1.default.createElement("span", { className: cx('ImageControl-pasteTip') }, "\u5F53\u524D\u72B6\u6001\u652F\u6301\u4ECE\u526A\u5207\u677F\u4E2D\u7C98\u8D34\u56FE\u7247\u6587\u4EF6\u3002")) : null)) : null,
                    !autoUpload && !hideUploadButton && files.length ? (react_1.default.createElement(Button_1.default, { level: "default", className: cx('ImageControl-uploadBtn'), disabled: !hasPending, onClick: _this.toggleUpload }, uploading ? '暂停上传' : '开始上传')) : null,
                    error ? (react_1.default.createElement("div", { className: cx('ImageControl-errorMsg') }, error)) : null))));
        }))));
    };
    ImageControl.defaultProps = {
        limit: undefined,
        accept: 'image/jpeg, image/jpg, image/png, image/gif',
        reciever: '/api/upload',
        hideUploadButton: false,
        placeholder: '点击选择图片或者将图片拖入该区域',
        joinValues: true,
        extractValue: false,
        delimiter: ',',
        autoUpload: true,
        multiple: false
    };
    return ImageControl;
}(react_1.default.Component));
exports.default = ImageControl;
var ImageControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ImageControlRenderer, _super);
    function ImageControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'image',
            sizeMutable: false
        })
    ], ImageControlRenderer);
    return ImageControlRenderer;
}(ImageControl));
exports.ImageControlRenderer = ImageControlRenderer;
//# sourceMappingURL=./renderers/Form/Image.js.map
