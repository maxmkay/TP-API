/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { Users } from 'src/models/users.model';
import { ConfigService } from '../config/config.service';
export declare class UserService {
    private readonly usersShema;
    private readonly configService;
    constructor(usersShema: Model<Users>, configService: ConfigService);
    addUser(newUser: Users): Promise<import("mongoose").Document<unknown, {}, Users> & Users & Required<{
        _id: string;
    }>>;
    authenticateUser(email: string, password: string): Promise<any>;
    updateUser(email: string, standard_values: Users['standard_values'], role: string): Promise<import("mongoose").UpdateWriteOpResult>;
    getMembership(email: any): Promise<{
        membership: string;
        error?: undefined;
    } | {
        error: string;
        membership?: undefined;
    }>;
    getCustomerId(email: any): Promise<{
        customer: string;
        error?: undefined;
    } | {
        error: string;
        customer?: undefined;
    }>;
    updateSubscription(customer_id: any, plan: any): Promise<{
        message: string;
        error?: undefined;
    } | {
        error: string;
        message?: undefined;
    }>;
}
