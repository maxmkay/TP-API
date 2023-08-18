"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersShema = void 0;
const mongoose = require("mongoose");
exports.usersShema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: String },
    role: { type: String },
    associated_accounts: [],
    associated_accounts_allowed: { type: Number },
    account_type: {
        type: String,
        required: true,
    },
    membership: {
        type: String,
        required: true,
        enum: ['none', 'free', 'premium', 'ultra'],
    },
    customer_id: { type: String },
    user_details: {
        number_properties: { type: Number },
        reason_top_prop: { type: String },
        how_hear: { type: String },
    },
    standard_values: {
        down_payment: { type: Number },
        interest_rate: { type: Number },
        closing_costs: { type: Number },
        loan_period: { type: Number },
        maintenance_percent: { type: Number },
        vacancy_percent: { type: Number },
        cap_ex_percent: { type: Number },
    },
});
//# sourceMappingURL=users.model.js.map