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
var particles = [];
// 設定
var particleCount = 60; // 粒子の数（減らすとよりスッキリします）
var connectionDistance = 150; // 線を結ぶ距離
var mouseDistance = 200; // マウスに反応する範囲
// マウス位置
var mouseX = -1000;
var mouseY = -1000;
// 粒子クラス
var Particle = /** @class */ (function () {
    function Particle(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // ゆっくり動くように速度をランダム設定
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
    }
    Particle.prototype.update = function (width, height) {
        this.x += this.vx;
        this.y += this.vy;
        // 画面端で跳ね返る
        if (this.x < 0 || this.x > width)
            this.vx *= -1;
        if (this.y < 0 || this.y > height)
            this.vy *= -1;
    };
    Particle.prototype.draw = function (context) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = 'rgba(100, 200, 255, 0.7)'; // 淡いブルー
        context.fill();
    };
    return Particle;
}());
var init = function () {
    if (!canvas.value)
        return;
    var el = canvas.value;
    el.width = window.innerWidth;
    el.height = window.innerHeight;
    ctx = el.getContext('2d');
    particles = [];
    for (var i = 0; i < particleCount; i++) {
        particles.push(new Particle(el.width, el.height));
    }
};
var animate = function () {
    if (!ctx || !canvas.value)
        return;
    var width = canvas.value.width;
    var height = canvas.value.height;
    // 背景クリア（完全なクリアではなく、グラデーションを描画）
    var gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0f172a'); // 深いネイビー（上）
    gradient.addColorStop(1, '#000000'); // 黒（下）
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    // 粒子の更新と描画
    particles.forEach(function (p) {
        p.update(width, height);
        p.draw(ctx);
    });
    // 線を結ぶ処理（ここが「大人っぽさ」のキモ）
    connectParticles();
    animationFrameId = requestAnimationFrame(animate);
};
var connectParticles = function () {
    for (var i = 0; i < particles.length; i++) {
        for (var j = i; j < particles.length; j++) {
            var p1 = particles[i];
            var p2 = particles[j];
            // 粒子同士の距離
            var dx = p1.x - p2.x;
            var dy = p1.y - p2.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < connectionDistance) {
                // 近いほど濃く、遠いほど薄く
                var opacity = 1 - (distance / connectionDistance);
                ctx.strokeStyle = "rgba(100, 200, 255, ".concat(opacity * 0.2, ")"); // 非常に薄い線
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
        // マウスとのインタラクション（マウス近くの粒子と線を結ぶ）
        var dxMouse = p1.x - mouseX;
        var dyMouse = p1.y - mouseY;
        var distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouseDistance) {
            var opacity = 1 - (distMouse / mouseDistance);
            ctx.strokeStyle = "rgba(255, 255, 255, ".concat(opacity * 0.3, ")");
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
        }
    }
};
var handleMouseMove = function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
};
var handleResize = function () {
    init();
};
(0, vue_1.onMounted)(function () {
    init();
    animate();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
});
(0, vue_1.onUnmounted)(function () {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', handleResize);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.canvas, __VLS_intrinsicElements.canvas)(__assign({ ref: "canvas" }, { class: "particle-canvas" }));
/** @type {typeof __VLS_ctx.canvas} */ ;
/** @type {__VLS_StyleScopedClasses['particle-canvas']} */ ;
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
