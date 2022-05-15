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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let GithubService = class GithubService {
    constructor(configService, http) {
        this.configService = configService;
        this.http = http;
    }
    getProfileReadme() {
        return this.http
            .post('', {
            operationName: 'readme',
            query: `
          query readme {
            repository(owner: "${this.configService.get('GITHUB.USERNAME')}", name: "${this.configService.get('GITHUB.USERNAME')}") {
              object(expression: "HEAD:README.md") {
                ... on Blob {
                  text
                }
              }
            }
          }
        `,
        })
            .pipe((0, rxjs_1.map)((response) => response.data.data.repository.object));
    }
    getRepositories() {
        return this.http
            .post('', {
            operationName: 'repositories',
            query: `
          query repositories {
            viewer {
              repositories(first: 10, orderBy: {field: PUSHED_AT, direction: DESC}, privacy: PUBLIC) {
                nodes {
                  name
                  url
                  description
                  pushedAt
                  stargazerCount
                  languages(orderBy: {field: SIZE, direction: DESC}, first: 1) {
                    nodes {
                      color
                      name
                    }
                  }
                }
              }
            }
          }
        `,
        })
            .pipe((0, rxjs_1.map)((response) => response.data.data.viewer.repositories.nodes));
    }
};
GithubService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        axios_1.HttpService])
], GithubService);
exports.GithubService = GithubService;
//# sourceMappingURL=github.service.js.map