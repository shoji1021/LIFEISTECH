"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/router/index.ts
var vue_router_1 = require("vue-router");
// コンポーネントのインポート（まだ作成していない場合はコメントアウトしておいてください）
var Home_vue_1 = require("../views/Home.vue");
var About_vue_1 = require("../views/About.vue");
var Guide_vue_1 = require("../views/Guide.vue");
var AppTool_vue_1 = require("../views/AppTool.vue");
// ルートの定義に型をつける
var routes = [
    {
        path: '/',
        name: 'Home',
        component: Home_vue_1.default
    },
    {
        path: '/about',
        name: 'About',
        component: About_vue_1.default
    },
    {
        path: '/guide',
        name: 'Guide',
        component: Guide_vue_1.default
    },
    {
        path: '/app',
        name: 'AppTool',
        component: AppTool_vue_1.default
    }
];
var router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)(),
    routes: routes
});
export default router
