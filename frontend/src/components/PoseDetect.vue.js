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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var holistic_1 = require("@mediapipe/holistic");
var axios_1 = require("axios");
var video = (0, vue_1.ref)(null);
var canvas = (0, vue_1.ref)(null);
var prevPose = null;
var motionDetected = false;
var interval = 20 * 1000; // 20秒に1回メール送信判定
var lastCheck = Date.now();
var gmail = (0, vue_1.ref)('');
var appPassword = (0, vue_1.ref)('');
var userSettings = {};
function saveSettings() {
    userSettings = {
        gmail: gmail.value,
        app_password: appPassword.value
    };
    alert('設定を保存しました');
}
var holistic = new holistic_1.Holistic({
    locateFile: function (file) { return "https://cdn.jsdelivr.net/npm/@mediapipe/holistic/".concat(file); }
});
holistic.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: false,
    refineFaceLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});
holistic.onResults(onResults);
function getPoseVector(landmarks) {
    return landmarks.flatMap(function (lm) { return [lm.x, lm.y, lm.z]; });
}
function drawConnections(ctx, landmarks, connections, color, lineWidth) {
    if (color === void 0) { color = 'cyan'; }
    if (lineWidth === void 0) { lineWidth = 2; }
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    connections.forEach(function (_a) {
        var start = _a[0], end = _a[1];
        var s = landmarks[start];
        var e = landmarks[end];
        if (s && e) {
            ctx.beginPath();
            ctx.moveTo(s.x * ctx.canvas.width, s.y * ctx.canvas.height);
            ctx.lineTo(e.x * ctx.canvas.width, e.y * ctx.canvas.height);
            ctx.stroke();
        }
    });
}
function onResults(results) {
    var ctx = canvas.value.getContext('2d');
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    ctx.drawImage(results.image, 0, 0, canvas.value.width, canvas.value.height);
    // 顔を四角で囲む
    if (results.faceLandmarks && results.faceLandmarks.length > 0) {
        var w_1 = canvas.value.width;
        var h_1 = canvas.value.height;
        var xs = results.faceLandmarks.map(function (lm) { return lm.x * w_1; });
        var ys = results.faceLandmarks.map(function (lm) { return lm.y * h_1; });
        var xMin = Math.min.apply(Math, xs);
        var xMax = Math.max.apply(Math, xs);
        var yMin = Math.min.apply(Math, ys);
        var yMax = Math.max.apply(Math, ys);
        ctx.strokeStyle = 'lime';
        ctx.lineWidth = 2;
        ctx.strokeRect(xMin, yMin, xMax - xMin, yMax - yMin);
    }
    // 体の骨格を描画
    if (results.poseLandmarks) {
        var connections = [
            [11, 13], [13, 15], [12, 14], [14, 16],
            [11, 12], [23, 24], [11, 23], [12, 24],
            [23, 25], [25, 27], [24, 26], [26, 28]
        ];
        drawConnections(ctx, results.poseLandmarks, connections, 'cyan', 3);
        results.poseLandmarks.forEach(function (lm) {
            ctx.beginPath();
            ctx.arc(lm.x * ctx.canvas.width, lm.y * ctx.canvas.height, 4, 0, 2 * Math.PI);
            ctx.fillStyle = 'yellow';
            ctx.fill();
        });
    }
    // 手の骨格描画関数
    function drawHand(landmarks, color) {
        var fingers = [
            [0, 1], [1, 2], [2, 3], [3, 4],
            [0, 5], [5, 6], [6, 7], [7, 8],
            [0, 9], [9, 10], [10, 11], [11, 12],
            [0, 13], [13, 14], [14, 15], [15, 16],
            [0, 17], [17, 18], [18, 19], [19, 20]
        ];
        drawConnections(ctx, landmarks, fingers, color, 2);
        landmarks.forEach(function (lm) {
            ctx.beginPath();
            ctx.arc(lm.x * ctx.canvas.width, lm.y * ctx.canvas.height, 3, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
        });
    }
    if (results.leftHandLandmarks)
        drawHand(results.leftHandLandmarks, 'red');
    if (results.rightHandLandmarks)
        drawHand(results.rightHandLandmarks, 'blue');
    // 動き検知
    if (results.poseLandmarks) {
        var poseVec = getPoseVector(results.poseLandmarks);
        if (prevPose) {
            var diff = Math.sqrt(poseVec.reduce(function (sum, v, i) { return sum + Math.pow(v - prevPose[i], 2); }, 0));
            if (diff > 1)
                motionDetected = true;
        }
        prevPose = poseVec;
    }
    // 20秒に1回メール送信判定
    var now = Date.now();
    if (now - lastCheck > interval) {
        if (motionDetected && userSettings.gmail && userSettings.app_password) {
            axios_1.default.post(import.meta.env.VITE_API_URL + '/notify', userSettings)
                .then(function () {
                console.log('メール通知しました');
            })
                .catch(function (e) {
                console.error('メール通知エラー', e);
            });
            motionDetected = false;
        }
        lastCheck = now;
    }
}
(0, vue_1.onMounted)(function () { return __awaiter(void 0, void 0, void 0, function () {
    function detect() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, holistic.send({ image: video.value })];
                    case 1:
                        _a.sent();
                        requestAnimationFrame(detect);
                        return [2 /*return*/];
                }
            });
        });
    }
    var stream;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, navigator.mediaDevices.getUserMedia({ video: true })];
            case 1:
                stream = _a.sent();
                video.value.srcObject = stream;
                detect();
                return [2 /*return*/];
        }
    });
}); });
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "mail-pass" }, { style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)(__assign({ onSubmit: (__VLS_ctx.saveSettings) }, { style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ placeholder: "Gmailアドレス", required: true }, { style: {} }));
(__VLS_ctx.gmail);
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ placeholder: "アプリパスワード", type: "password", required: true }, { style: {} }));
(__VLS_ctx.appPassword);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ type: "submit" }, { style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.video, __VLS_intrinsicElements.video)(__assign({ ref: "video", autoplay: true, playsinline: true, width: "640", height: "480" }, { style: {} }));
/** @type {typeof __VLS_ctx.video} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.canvas, __VLS_intrinsicElements.canvas)(__assign({ ref: "canvas", width: "640", height: "480" }, { style: {} }));
/** @type {typeof __VLS_ctx.canvas} */ ;
/** @type {__VLS_StyleScopedClasses['mail-pass']} */ ;
var __VLS_dollars;
var __VLS_self = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {
            video: video,
            canvas: canvas,
            gmail: gmail,
            appPassword: appPassword,
            saveSettings: saveSettings,
        };
    },
});
exports.default = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
