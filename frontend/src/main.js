"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
require("./style.css");
var App_vue_1 = require("./App.vue");
var router_1 = require("./router"); // 追加
var app = (0, vue_1.createApp)(App_vue_1.default);
app.use(router_1.default);
app.mount('#app');
