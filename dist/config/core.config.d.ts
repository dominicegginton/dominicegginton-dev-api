export interface CoreConfig {
    ENV: string;
    PORT?: number;
    CORS_ORIGIN: string;
}
declare const _default: (() => CoreConfig) & import("@nestjs/config").ConfigFactoryKeyHost<CoreConfig>;
export default _default;
