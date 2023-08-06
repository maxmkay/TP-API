import * as mongoose from 'mongoose';
export declare const usersShema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    associated_accounts: mongoose.Types.DocumentArray<any> | any[] | {
        [x: string]: any;
    }[] | any[];
    account_type: string;
    membership: "none" | "free" | "premium" | "ultra";
    role?: string;
    associated_accounts_allowed?: number;
    customer_id?: string;
    user_details?: {
        number_properties?: number;
        reason_top_prop?: string;
        how_hear?: string;
    };
    standard_values?: {
        down_payment?: number;
        interest_rate?: number;
        closing_costs?: number;
        loan_period?: number;
        maintenance_percent?: number;
        vacancy_percent?: number;
        cap_ex_percent?: number;
    };
}, mongoose.Document<unknown, {}, {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    associated_accounts: mongoose.Types.DocumentArray<any> | any[] | {
        [x: string]: any;
    }[] | any[];
    account_type: string;
    membership: "none" | "free" | "premium" | "ultra";
    role?: string;
    associated_accounts_allowed?: number;
    customer_id?: string;
    user_details?: {
        number_properties?: number;
        reason_top_prop?: string;
        how_hear?: string;
    };
    standard_values?: {
        down_payment?: number;
        interest_rate?: number;
        closing_costs?: number;
        loan_period?: number;
        maintenance_percent?: number;
        vacancy_percent?: number;
        cap_ex_percent?: number;
    };
}> & {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    associated_accounts: mongoose.Types.DocumentArray<any> | any[] | {
        [x: string]: any;
    }[] | any[];
    account_type: string;
    membership: "none" | "free" | "premium" | "ultra";
    role?: string;
    associated_accounts_allowed?: number;
    customer_id?: string;
    user_details?: {
        number_properties?: number;
        reason_top_prop?: string;
        how_hear?: string;
    };
    standard_values?: {
        down_payment?: number;
        interest_rate?: number;
        closing_costs?: number;
        loan_period?: number;
        maintenance_percent?: number;
        vacancy_percent?: number;
        cap_ex_percent?: number;
    };
} & {
    _id: mongoose.Types.ObjectId;
}>;
interface IStandardValues {
    down_payment: number;
    interest_rate: number;
    loan_period: number;
    vacancy_percent: number;
    management_percent: number;
    cap_ex_percent: number;
    closing_costs: number;
}
interface IUserDetails {
    number_properties: string;
    reason_top_prop: string;
    how_hear: string;
}
export interface Users {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
    membership: string;
    associated_accounts: [];
    associated_accounts_allowed: number;
    account_type: string;
    standard_values: IStandardValues;
    user_details: IUserDetails;
    customer_id: string;
}
export {};
