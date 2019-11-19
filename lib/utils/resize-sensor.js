"use strict";
/**
 * @file resize-sensor.js.
 * @author fex
 */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
var EventQueue = /** @class */ (function () {
    function EventQueue() {
        this.q = [];
    }
    EventQueue.prototype.add = function (cb) {
        this.q.push(cb);
    };
    EventQueue.prototype.call = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.q.forEach(function (fn) {
            fn.apply(void 0, args);
        });
    };
    return EventQueue;
}());
function getComputedStyle(element, prop) {
    if (element.currentStyle) {
        return element.currentStyle[prop];
    }
    else if (window.getComputedStyle) {
        return window.getComputedStyle(element, undefined).getPropertyValue(prop);
    }
    else {
        return element.style[prop];
    }
}
function attachResizeEvent(element, resized) {
    if (!element.resizedAttached) {
        element.resizedAttached = new EventQueue();
        element.resizedAttached.add(resized);
    }
    else if (element.resizedAttached) {
        element.resizedAttached.add(resized);
        return;
    }
    element.resizeSensor = document.createElement('div');
    element.resizeSensor.className = 'resize-sensor';
    var style = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: scroll; z-index: -1; visibility: hidden;';
    var styleChild = 'position: absolute; left: 0; top: 0;';
    element.resizeSensor.style.cssText = style;
    element.resizeSensor.innerHTML =
        '<div class="resize-sensor-expand" style="' +
            style +
            '">' +
            '<div style="' +
            styleChild +
            '"></div>' +
            '</div>' +
            '<div class="resize-sensor-shrink" style="' +
            style +
            '">' +
            '<div style="' +
            styleChild +
            ' width: 200%; height: 200%"></div>' +
            '</div>';
    element.appendChild(element.resizeSensor);
    if (!~['fixed', 'absolute'].indexOf(getComputedStyle(element, 'position'))) {
        element.style.position = 'relative';
    }
    var expand = element.resizeSensor.childNodes[0];
    var expandChild = expand.childNodes[0];
    var shrink = element.resizeSensor.childNodes[1];
    var shrinkChild = shrink.childNodes[0];
    var lastWidth, lastHeight;
    var reset = function () {
        expandChild.style.width = expand.offsetWidth + 10 + 'px';
        expandChild.style.height = expand.offsetHeight + 10 + 'px';
        expand.scrollLeft = expand.scrollWidth;
        expand.scrollTop = expand.scrollHeight;
        shrink.scrollLeft = shrink.scrollWidth;
        shrink.scrollTop = shrink.scrollHeight;
        lastWidth = element.offsetWidth;
        lastHeight = element.offsetHeight;
    };
    reset();
    var changed = function () {
        if (element.resizedAttached) {
            element.resizedAttached.call();
        }
    };
    var addEvent = function (el, name, cb) {
        if (el.attachEvent) {
            el.attachEvent('on' + name, cb);
        }
        else {
            el.addEventListener(name, cb);
        }
    };
    var onScroll = function () {
        if (element.offsetWidth != lastWidth ||
            element.offsetHeight != lastHeight) {
            changed();
        }
        reset();
    };
    addEvent(expand, 'scroll', onScroll);
    addEvent(shrink, 'scroll', onScroll);
}
function detach(element) {
    if (element.resizeSensor) {
        try {
            element.removeChild(element.resizeSensor);
        }
        catch (e) { }
        delete element.resizeSensor;
        delete element.resizedAttached;
    }
}
function resizeSensor(element, callback) {
    attachResizeEvent(element, callback);
    var detached = false;
    return function () {
        if (detached)
            return;
        detached = true;
        detach(element);
    };
}
exports.resizeSensor = resizeSensor;
//# sourceMappingURL=./utils/resize-sensor.js.map
