import * as mongoose from 'mongoose';

export const usersShema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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
    enum: ['free', 'premium', 'ultra'],
  },
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
  associated_accounts: [];
  associated_accounts_allowed: number;
  account_type: string;
  standard_values: IStandardValues;
  user_details: IUserDetails;
}
