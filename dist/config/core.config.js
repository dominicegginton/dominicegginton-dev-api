"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('CORE', () => {
    var _a;
    return ({
        ENV: (_a = process.env.ENV) !== null && _a !== void 0 ? _a : 'local',
        PORT: Number.isInteger(Number(process.env.PORT))
            ? Number(process.env.PORT)
            : undefined,
        CORS_ORIGIN: process.env.CORS_ORIGIN,
    });
});
//# sourceMappingURL=core.config.js.map