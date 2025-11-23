import { Model } from "sequelize-typescript";
export declare class InviteToken extends Model<InviteToken> {
    id: string;
    email: string;
    token: string;
    used: boolean;
    createdAt: Date;
    updatedAt: Date;
}
