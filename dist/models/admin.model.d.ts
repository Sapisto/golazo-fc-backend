import { Model } from "sequelize-typescript";
interface AdminCreationAttributes {
    name: string;
    username: string;
    email: string;
    password: string;
    isActive?: boolean;
}
export declare class Admin extends Model<Admin, AdminCreationAttributes> {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    isActive: boolean;
}
export {};
