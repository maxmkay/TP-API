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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_service_1 = require("../config/config.service");
const stripe_1 = require("stripe");
let UserService = class UserService {
    constructor(usersShema, configService) {
        this.usersShema = usersShema;
        this.configService = configService;
    }
    async addUser(newUser) {
        const { first_name, last_name, email, password, role, associated_accounts, associated_accounts_allowed, account_type, standard_values, user_details, } = newUser;
        const response = await this.configService.getConfig();
        const stripe = new stripe_1.default(JSON.parse(response.Payload).body);
        const customer = await stripe.customers.create({
            name: first_name,
            email: email,
        });
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newAccount = new this.usersShema({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role,
            associated_accounts,
            associated_accounts_allowed,
            account_type,
            standard_values,
            user_details,
            membership: 'none',
            customer_id: customer.id
        });
        const userResults = await newAccount.save();
        return userResults;
    }
    async authenticateUser(email, password) {
        const user = await this.usersShema.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return { error: 'Invalid email or password.' };
    }
    async updateUser(email, standard_values, role) {
        const user = await this.usersShema.updateOne({ email }, { standard_values, role });
        return user;
    }
    async getMembership(email) {
        const user = await this.usersShema.findOne({ email });
        if (user) {
            return { membership: user.membership };
        }
        return { error: 'Invalid email address' };
    }
    async getCustomerId(email) {
        const user = await this.usersShema.findOne({ email });
        if (user) {
            return { customer: user.customer_id };
        }
        return { error: 'Invalid email address' };
    }
    async updateSubscription(customer_id, plan) {
        const user = await this.usersShema.updateOne({ customer_id }, { membership: plan });
        if (user) {
            return { message: 'Successfully updated' };
        }
        return { error: 'Invalid customer or plan' };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('users')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_service_1.ConfigService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map