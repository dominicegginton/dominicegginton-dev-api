"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('GITHUB', () => ({
    URL: process.env.GITHUB_URL,
    TOKEN: process.env.GITHUB_TOKEN,
    USERNAME: process.env.GITHUB_USERNAME,
}));
//# sourceMappingURL=github.config.js.map