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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue"); // computed をインポート
var vue_router_1 = require("vue-router"); // useRoute をインポート
var Navbar_vue_1 = require("./components/Navbar.vue");
var Background_vue_1 = require("./components/Background.vue");
var CyberObject_vue_1 = require("./components/CyberObject.vue");
// 現在のルート（URL）情報を取得するための設定
var route = (0, vue_router_1.useRoute)();
// 「今いるページはアプリのページか？」を判定する計算式
// ※ router/index.ts で設定したパス（例: /app）に合わせてください
var isAppPage = (0, vue_1.computed)(function () {
    return route.path === '/app';
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "app-layout",
});
if (!__VLS_ctx.isAppPage) {
    /** @type {[typeof Background, ]} */ ;
    // @ts-ignore
    var __VLS_0 = __VLS_asFunctionalComponent(Background_vue_1.default, new Background_vue_1.default({}));
    var __VLS_1 = __VLS_0.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_0), false));
}
if (!__VLS_ctx.isAppPage) {
    /** @type {[typeof CyberObject, ]} */ ;
    // @ts-ignore
    var __VLS_3 = __VLS_asFunctionalComponent(CyberObject_vue_1.default, new CyberObject_vue_1.default({}));
    var __VLS_4 = __VLS_3.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_3), false));
}
/** @type {[typeof Navbar, ]} */ ;
// @ts-ignore
var __VLS_6 = __VLS_asFunctionalComponent(Navbar_vue_1.default, new Navbar_vue_1.default({}));
var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_6), false));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "content-wrapper" }));
var __VLS_9 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
var __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({}));
var __VLS_11 = __VLS_10.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_10), false));
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
var __VLS_dollars;
var __VLS_self = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {
            Navbar: Navbar_vue_1.default,
            Background: Background_vue_1.default,
            CyberObject: CyberObject_vue_1.default,
            isAppPage: isAppPage,
        };
    },
});
exports.default = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
