"use strict";
/**
 * @file video
 * @author fex
 */
/* eslint fecs-indent: [0, "space", 2, 2] */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var video_react_1 = require("video-react");
var helper_1 = require("../utils/helper");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var factory_1 = require("../factory");
var tpl_builtin_1 = require("../utils/tpl-builtin");
var tpl_1 = require("../utils/tpl");
// import css
/*@require video-react/dist/video-react.css*/;
var str2seconds = function (str) {
    return str
        .split(':')
        .reverse()
        .reduce(function (seconds, value, index) {
        return seconds + (parseInt(value, 10) || 0) * Math.pow(60, index);
    }, 0);
};
var currentPlaying = null;
var FlvSource = /** @class */ (function (_super) {
    tslib_1.__extends(FlvSource, _super);
    function FlvSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FlvSource.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, src = _a.src, video = _a.video, config = _a.config, manager = _a.manager, isLive = _a.isLive, autoPlay = _a.autoPlay, actions = _a.actions;
        require(['flv.js'], function (flvjs) {
            // load hls video source base on hls.js
            if (flvjs.isSupported()) {
                video = video || (manager.video && manager.video.video);
                var flvPlayer_1 = flvjs.createPlayer({
                    type: 'flv',
                    url: src,
                    isLive: isLive
                }, config);
                flvPlayer_1.attachMediaElement(video);
                _this.flvPlayer = flvPlayer_1;
                var loaded_1 = false;
                var timer_1;
                manager.subscribeToOperationStateChange(function (operation) {
                    var type = operation.operation.action;
                    if (type === 'play') {
                        clearTimeout(timer_1);
                        if (!loaded_1) {
                            loaded_1 = true;
                            flvPlayer_1.load();
                        }
                        flvPlayer_1.play();
                    }
                    else if (type === 'pause') {
                        flvPlayer_1.pause();
                        if (isLive) {
                            timer_1 = setTimeout(function () {
                                actions.seek(0);
                                flvPlayer_1.unload();
                                loaded_1 = false;
                            }, 30000);
                        }
                    }
                });
                flvPlayer_1.on(flvjs.Events.RECOVERED_EARLY_EOF, function () {
                    alert('直播已经结束');
                });
                flvPlayer_1.on(flvjs.Events.ERROR, function () {
                    alert('视频加载失败');
                });
                if (autoPlay) {
                    setTimeout(function () { return actions.play(); }, 200);
                }
            }
        });
    };
    FlvSource.prototype.componentWillUnmount = function () {
        if (this.flvPlayer) {
            this.flvPlayer.unload();
            this.flvPlayer.detachMediaElement();
        }
    };
    FlvSource.prototype.render = function () {
        return (react_1.default.createElement("source", { src: this.props.src, type: this.props.type || 'video/x-flv' }));
    };
    return FlvSource;
}(react_1.default.Component));
exports.FlvSource = FlvSource;
var HlsSource = /** @class */ (function (_super) {
    tslib_1.__extends(HlsSource, _super);
    function HlsSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HlsSource.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, src = _a.src, video = _a.video, config = _a.config, manager = _a.manager, isLive = _a.isLive, autoPlay = _a.autoPlay, actions = _a.actions;
        require(['hls.js'], function (Hls) {
            // load hls video source base on hls.js
            if (Hls.isSupported()) {
                video = video || (manager.video && manager.video.video);
                var hls_1 = (_this.hls = new Hls({
                    autoStartLoad: false
                }));
                hls_1.attachMedia(video);
                hls_1.loadSource(src);
                var loaded_2 = false;
                manager.subscribeToOperationStateChange(function (operation) {
                    var type = operation.operation.action;
                    if (type === 'play') {
                        if (!loaded_2) {
                            loaded_2 = true;
                            hls_1.startLoad();
                        }
                        video.play();
                    }
                    else if (type === 'pause') {
                        video.pause();
                        hls_1.stopLoad();
                        loaded_2 = false;
                    }
                });
                autoPlay && setTimeout(actions.play, 200);
            }
        });
    };
    HlsSource.prototype.componentWillUnmount = function () {
        if (this.hls) {
            this.hls.stopLoad();
            this.hls.detachMedia();
        }
    };
    HlsSource.prototype.render = function () {
        return (react_1.default.createElement("source", { src: this.props.src, type: this.props.type || 'application/x-mpegURL' }));
    };
    return HlsSource;
}(react_1.default.Component));
exports.HlsSource = HlsSource;
var Video = /** @class */ (function (_super) {
    tslib_1.__extends(Video, _super);
    function Video(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            posterInfo: null,
            videoState: {}
        };
        _this.frameRef = _this.frameRef.bind(_this);
        _this.cursorRef = _this.cursorRef.bind(_this);
        _this.playerRef = _this.playerRef.bind(_this);
        _this.onImageLoaded = _this.onImageLoaded.bind(_this);
        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }
    Video.prototype.onImageLoaded = function (e) {
        var _this = this;
        var image = new Image();
        image.onload = function () {
            _this.setState({
                posterInfo: {
                    width: image.width,
                    height: image.height
                }
            });
            image = image.onload = null;
        };
        image.src = e.target.getAttribute('src');
    };
    Video.prototype.frameRef = function (dom) {
        this.frameDom = dom;
    };
    Video.prototype.cursorRef = function (dom) {
        this.cursorDom = dom;
    };
    Video.prototype.playerRef = function (player) {
        var _this = this;
        this.player = player;
        if (!player) {
            return;
        }
        player.subscribeToStateChange(function (state) {
            _this.setState({
                videoState: state
            });
            if (!state.paused) {
                if (currentPlaying &&
                    currentPlaying.video &&
                    currentPlaying !== player) {
                    currentPlaying.pause();
                }
                currentPlaying = player;
            }
            if (!_this.frameDom || !_this.times) {
                return;
            }
            var index = 0;
            var times = _this.times;
            var len = times.length;
            while (index < len) {
                if (times[index - 1] &&
                    state.currentTime <=
                        times[index + 1] - (times[index + 1] - times[index]) / 2) {
                    break;
                }
                else if (state.currentTime <= times[index]) {
                    break;
                }
                index++;
            }
            if (_this.currentIndex !== index) {
                _this.moveCursorToIndex(index);
            }
        });
    };
    Video.prototype.moveCursorToIndex = function (index) {
        var ns = this.props.classPrefix;
        if (!this.frameDom || !this.cursorDom) {
            return;
        }
        var items = this.frameDom.querySelectorAll("." + ns + "Video-frame");
        if (items && items.length && items[index]) {
            this.currentIndex = index;
            var item = items[index];
            var frameRect = this.frameDom.getBoundingClientRect();
            var rect = item.getBoundingClientRect();
            this.cursorDom.setAttribute('style', "width: " + (rect.width - 4) + "px; height: " + (rect.height -
                4) + "px; left: " + (rect.left + 2 - frameRect.left) + "px; top: " + (rect.top +
                2 -
                frameRect.top) + "px;");
        }
    };
    Video.prototype.jumpToIndex = function (index) {
        if (!this.times || !this.player || !this.props.jumpFrame) {
            return;
        }
        var times = this.times;
        var player = this.player;
        player.seek(times[index] - (times[index] - (times[index - 1] || 0)) / 2);
        player.play();
    };
    Video.prototype.onClick = function (e) {
        // 避免把所在 form 给提交了。
        e.preventDefault();
    };
    Video.prototype.renderFrames = function () {
        var _this = this;
        var _a = this.props, frames = _a.frames, framesClassName = _a.framesClassName, columnsCount = _a.columnsCount, data = _a.data, jumpFrame = _a.jumpFrame, ns = _a.classPrefix;
        if (typeof frames === 'string' && frames[0] === '$') {
            frames = tpl_builtin_1.resolveVariable(frames, data);
        }
        if (!frames) {
            return null;
        }
        var items = [];
        var times = (this.times = []);
        Object.keys(frames).forEach(function (time) {
            if (!frames[time]) {
                return;
            }
            times.push(str2seconds(time));
            items.push({
                time: time,
                src: frames[time]
            });
        });
        if (!items.length) {
            return null;
        }
        return (react_1.default.createElement("div", { className: classnames_1.default("pos-rlt " + ns + "Video-frameList", framesClassName), ref: this.frameRef },
            helper_1.padArr(items, columnsCount).map(function (items, i) {
                var restCount = columnsCount - items.length;
                var blankArray = [];
                while (restCount--) {
                    blankArray.push('');
                }
                return (react_1.default.createElement("div", { className: "pull-in-xxs", key: i },
                    react_1.default.createElement("div", { className: ns + "Hbox " + ns + "Video-frameItem" },
                        items.map(function (item, key) { return (react_1.default.createElement("div", { className: ns + "Hbox-col Wrapper--xxs " + ns + "Video-frame", key: key, onClick: function () {
                                return _this.jumpToIndex(i * columnsCount + key);
                            } },
                            react_1.default.createElement("img", { className: "w-full", alt: "poster", src: item.src }),
                            react_1.default.createElement("div", { className: ns + "Text--center" }, item.time))); }),
                        restCount
                            ? blankArray.map(function (_, index) { return (react_1.default.createElement("div", { className: ns + "Hbox-col Wrapper--xxs", key: "blank_" + index })); })
                            : null)));
            }),
            jumpFrame ? (react_1.default.createElement("span", { ref: this.cursorRef, className: ns + "Video-cursor" })) : null));
    };
    Video.prototype.renderPlayer = function () {
        var _a = this.props, poster = _a.poster, autoPlay = _a.autoPlay, muted = _a.muted, name = _a.name, data = _a.data, amisConfig = _a.amisConfig, locals = _a.locals, isLive = _a.isLive, minVideoDuration = _a.minVideoDuration, videoType = _a.videoType, playerClassName = _a.playerClassName, ns = _a.classPrefix, aspectRatio = _a.aspectRatio, rates = _a.rates;
        var source = this.props.src ||
            (name && data && data[name]) ||
            (amisConfig && amisConfig.value);
        var videoState = this.state.videoState;
        var highlight = videoState.duration &&
            minVideoDuration &&
            videoState.duration < minVideoDuration;
        var src = tpl_1.filter(source, data, '| raw');
        var sourceNode;
        if ((src && /\.flv(?:$|\?)/.test(src) && isLive) ||
            videoType === 'video/x-flv') {
            sourceNode = (react_1.default.createElement(FlvSource, { autoPlay: autoPlay, order: 999.0, isLive: isLive, src: src }));
        }
        else if ((src && /\.m3u8(?:$|\?)/.test(src)) ||
            videoType === 'application/x-mpegURL') {
            sourceNode = react_1.default.createElement(HlsSource, { autoPlay: autoPlay, order: 999.0, src: src });
        }
        else {
            sourceNode = react_1.default.createElement("source", { src: src });
        }
        return (react_1.default.createElement("div", { className: playerClassName },
            react_1.default.createElement(video_react_1.Player, { ref: this.playerRef, poster: tpl_1.filter(poster, data, '| raw'), src: src, autoPlay: autoPlay, muted: muted, aspectRatio: aspectRatio },
                rates && rates.length ? (react_1.default.createElement(video_react_1.ControlBar, null,
                    react_1.default.createElement(video_react_1.PlaybackRateMenuButton, { rates: rates, order: 7.1 }))) : null,
                react_1.default.createElement(video_react_1.BigPlayButton, { position: "center" }),
                sourceNode,
                react_1.default.createElement(video_react_1.Shortcut, { disabled: true })),
            highlight ? (react_1.default.createElement("p", { className: "m-t-xs " + ns + "Text--danger" },
                "\u89C6\u9891\u65F6\u957F\u5C0F\u4E8E ",
                minVideoDuration,
                " \u79D2")) : null));
    };
    Video.prototype.renderPosterAndPlayer = function () {
        var _a = this.props, poster = _a.poster, data = _a.data, locals = _a.locals, minPosterDimension = _a.minPosterDimension, cx = _a.classnames;
        var posterInfo = this.state.posterInfo || {};
        var dimensionClassName = '';
        if (posterInfo &&
            minPosterDimension &&
            (minPosterDimension.width || minPosterDimension.height) &&
            (minPosterDimension.width > posterInfo.width ||
                minPosterDimension.height > posterInfo.height)) {
            dimensionClassName = "Text--danger";
        }
        return (react_1.default.createElement("div", { className: "pull-in-xs" },
            react_1.default.createElement("div", { className: cx('Hbox') },
                react_1.default.createElement("div", { className: cx('Hbox-col') },
                    react_1.default.createElement("div", { className: cx('Wrapper Wrapper--xs') },
                        react_1.default.createElement("img", { onLoad: this.onImageLoaded, className: "w-full", alt: "poster", src: tpl_1.filter(poster, data, '| raw') }),
                        react_1.default.createElement("p", { className: "m-t-xs" },
                            "\u5C01\u9762",
                            ' ',
                            react_1.default.createElement("span", { className: dimensionClassName },
                                posterInfo.width || '-',
                                " x ",
                                posterInfo.height || '-'),
                            dimensionClassName ? (react_1.default.createElement("span", null,
                                ' ',
                                "\u5C01\u9762\u5C3A\u5BF8\u5C0F\u4E8E",
                                ' ',
                                react_1.default.createElement("span", { className: cx('Text--danger') },
                                    minPosterDimension.width || '-',
                                    " x",
                                    ' ',
                                    minPosterDimension.height || '-'))) : null))),
                react_1.default.createElement("div", { className: cx('Hbox-col') },
                    react_1.default.createElement("div", { className: cx('Wrapper Wrapper--xs') }, this.renderPlayer())))));
    };
    Video.prototype.render = function () {
        var _a = this.props, splitPoster = _a.splitPoster, className = _a.className, ns = _a.classPrefix;
        return (react_1.default.createElement("div", { className: classnames_1.default(ns + "Video", className), onClick: this.onClick },
            this.renderFrames(),
            splitPoster ? this.renderPosterAndPlayer() : this.renderPlayer()));
    };
    Video.defaultProps = {
        columnsCount: 8,
        isLive: false,
        jumpFrame: true,
        aspectRatio: 'auto'
    };
    return Video;
}(react_1.default.Component));
exports.default = Video;
var VideoRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(VideoRenderer, _super);
    function VideoRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VideoRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)video$/,
            name: 'video'
        })
    ], VideoRenderer);
    return VideoRenderer;
}(Video));
exports.VideoRenderer = VideoRenderer;
//# sourceMappingURL=./renderers/Video.js.map
