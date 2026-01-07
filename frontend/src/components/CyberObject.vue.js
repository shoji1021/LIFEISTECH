"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var mouseX = (0, vue_1.ref)(0);
var mouseY = (0, vue_1.ref)(0);
var velocity = (0, vue_1.ref)(0);
var lastMouseX = 0;
var lastMouseY = 0;
var animationId = null;
// マウスイベント処理
var handleMouseMove = function (e) {
    var currentX = e.clientX;
    var currentY = e.clientY;
    // 画面中心からの距離（回転用）
    mouseX.value = (currentX - window.innerWidth / 2);
    mouseY.value = (currentY - window.innerHeight / 2);
    // マウスの移動速度（激しさ用）
    var deltaX = Math.abs(currentX - lastMouseX);
    var deltaY = Math.abs(currentY - lastMouseY);
    velocity.value = deltaX + deltaY;
    lastMouseX = currentX;
    lastMouseY = currentY;
};
// アニメーションループ
var updateLoop = function () {
    // 速度の減衰
    velocity.value *= 0.9;
    if (velocity.value < 0.1)
        velocity.value = 0;
    animationId = requestAnimationFrame(updateLoop);
};
// スタイルの動的計算
var cubeStyle = (0, vue_1.computed)(function () {
    // 基本回転
    var rotateY = mouseX.value / 10; // 感度調整
    var rotateX = -(mouseY.value / 10);
    // 激しい動き（シェイク）
    var shakeX = 0;
    var shakeY = 0;
    var scale = 1;
    if (velocity.value > 50) {
        shakeX = (Math.random() - 0.5) * velocity.value * 0.2;
        shakeY = (Math.random() - 0.5) * velocity.value * 0.2;
        scale = 1.1;
    }
    return {
        transform: "\n      rotateX(".concat(rotateX, "deg) \n      rotateY(").concat(rotateY, "deg) \n      translate3d(").concat(shakeX, "px, ").concat(shakeY, "px, 0)\n      scale(").concat(scale, ")\n    "),
        // 激しく動くと赤、普段は水色（大人っぽい色に変更）
        borderColor: velocity.value > 50 ? '#ff0055' : '#38bdf8',
        boxShadow: velocity.value > 50 ? '0 0 20px #ff0055' : '0 0 10px rgba(56, 189, 248, 0.5)'
    };
});
(0, vue_1.onMounted)(function () {
    window.addEventListener('mousemove', handleMouseMove);
    updateLoop();
});
(0, vue_1.onUnmounted)(function () {
    window.removeEventListener('mousemove', handleMouseMove);
    cancelAnimationFrame(animationId);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "scene-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "scene" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "cube" }, { style: (__VLS_ctx.cubeStyle) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "face front" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "face back" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "face right" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "face left" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "face top" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "face bottom" }));
/** @type {__VLS_StyleScopedClasses['scene-container']} */ ;
/** @type {__VLS_StyleScopedClasses['scene']} */ ;
/** @type {__VLS_StyleScopedClasses['cube']} */ ;
/** @type {__VLS_StyleScopedClasses['face']} */ ;
/** @type {__VLS_StyleScopedClasses['front']} */ ;
/** @type {__VLS_StyleScopedClasses['face']} */ ;
/** @type {__VLS_StyleScopedClasses['back']} */ ;
/** @type {__VLS_StyleScopedClasses['face']} */ ;
/** @type {__VLS_StyleScopedClasses['right']} */ ;
/** @type {__VLS_StyleScopedClasses['face']} */ ;
/** @type {__VLS_StyleScopedClasses['left']} */ ;
/** @type {__VLS_StyleScopedClasses['face']} */ ;
/** @type {__VLS_StyleScopedClasses['top']} */ ;
/** @type {__VLS_StyleScopedClasses['face']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom']} */ ;
var __VLS_dollars;
var __VLS_self = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {
            cubeStyle: cubeStyle,
        };
    },
});
exports.default = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
