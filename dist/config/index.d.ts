import { Sequelize } from "sequelize-typescript";
export declare const sequelize: Sequelize;
export declare function syncDatabase(): Promise<void>;
export declare function testConnection(): Promise<void>;
