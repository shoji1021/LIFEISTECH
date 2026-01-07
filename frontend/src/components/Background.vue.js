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
var canvas = (0, vue_1.ref)(null);
var ctx = null;
var animationFrameId = null;
// マトリックスの設定
var fontSize = 16;
var columns = (0, vue_1.ref)(0);
var drops = (0, vue_1.ref)([]); // 各列の「現在の文字のY位置」を管理
// 半角カナや数字、英字を混ぜて雰囲気を出します
var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var initMatrix = function () {
    if (!canvas.value)
        return;
    var el = canvas.value;
    el.width = window.innerWidth;
    el.height = window.innerHeight;
    ctx = el.getContext('2d');
    // 列数を計算
    columns.value = Math.floor(el.width / fontSize);
    // すべての列の初期Y位置を0（最上部）より少しランダムにずらして設定
    drops.value = [];
    for (var i = 0; i < columns.value; i++) {
        drops.value[i] = Math.random() * -100; // 最初から画面全体にバラつかせるなら 1、上から降らせるなら負の値
    }
};
var draw = function () {
    if (!ctx || !canvas.value)
        return;
    // 背景を完全に塗りつぶさず、半透明の黒を重ねることで「残像（トレーリング）」を作る
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);
    ctx.fillStyle = '#0F0'; // マトリックスグリーン
    ctx.font = "".concat(fontSize, "px monospace");
    for (var i = 0; i < drops.value.length; i++) {
        // ランダムな文字を選択
        var text = chars.charAt(Math.floor(Math.random() * chars.length));
        // 文字を描画
        // x座標 = 列インデックス * フォントサイズ
        // y座標 = 現在のドロップ数 * フォントサイズ
        var x = i * fontSize;
        var y = drops.value[i] * fontSize;
        // たまに文字を白く光らせる演出（任意）
        if (Math.random() > 0.98) {
            ctx.fillStyle = '#FFF';
            ctx.fillText(text, x, y);
            ctx.fillStyle = '#0F0';
        }
        else {
            ctx.fillText(text, x, y);
        }
        // 画面下端を超えたら、ランダムなタイミングで一番上に戻す
        if (y > canvas.value.height && Math.random() > 0.975) {
            drops.value[i] = 0;
        }
        // Y位置を進める
        drops.value[i]++;
    }
    animationFrameId = requestAnimationFrame(draw);
};
var handleResize = function () {
    initMatrix();
};
(0, vue_1.onMounted)(function () {
    initMatrix();
    draw();
    window.addEventListener('resize', handleResize);
});
(0, vue_1.onUnmounted)(function () {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', handleResize);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.canvas, __VLS_intrinsicElements.canvas)(__assign({ ref: "canvas" }, { class: "matrix-canvas" }));
/** @type {typeof __VLS_ctx.canvas} */ ;
/** @type {__VLS_StyleScopedClasses['matrix-canvas']} */ ;
var __VLS_dollars;
var __VLS_self = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {
            canvas: canvas,
        };
    },
});
exports.default = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
