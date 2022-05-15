"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
exports.ConfigService = void 0;
var typedi_1 = require("typedi");
var ConfigService = /** @class */ (function () {
    function ConfigService() {
        var _a;
        this.config = {
            APP_NAME: process.env.npm_package_name,
            PORT: +process.env.PORT,
            GITHUB_TOKEN: process.env.GITHUB_TOKEN,
            CORS_ORIGIN: process.env.CORS_ORIGIN,
            LOGGER_LEVEL: (_a = process.env.LOGGER_LEVEL) !== null && _a !== void 0 ? _a : 'warn'
        };
    }
    ConfigService = __decorate([
        (0, typedi_1.Service)(),
        __metadata("design:paramtypes", [])
    ], ConfigService);
    return ConfigService;
}());
exports.ConfigService = ConfigService;
