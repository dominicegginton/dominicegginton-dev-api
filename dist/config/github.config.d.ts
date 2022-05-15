export interface GithubConfig {
    URL: string;
    TOKEN: string;
    USERNAME: string;
}
declare const _default: (() => GithubConfig) & import("@nestjs/config").ConfigFactoryKeyHost<GithubConfig>;
export default _default;
