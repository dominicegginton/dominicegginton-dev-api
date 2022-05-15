"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const readme_controller_1 = require("./controllers/readme/readme.controller");
const repositories_controller_1 = require("./controllers/repositories/repositories.controller");
const github_service_1 = require("./services/github/github.service");
function createHttpModuleOptions(configService) {
    return {
        baseURL: configService.get('GITHUB.URL'),
        auth: {
            username: 'dominicegginton',
            password: configService.get('GITHUB.TOKEN'),
        },
    };
}
let GithubModule = class GithubModule {
};
GithubModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: createHttpModuleOptions,
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [readme_controller_1.ReadmeController, repositories_controller_1.RepositoriesController],
        providers: [github_service_1.GithubService],
    })
], GithubModule);
exports.GithubModule = GithubModule;
//# sourceMappingURL=github.module.js.map