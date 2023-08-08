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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("../config/config.service");
const stripe_1 = require("stripe");
const user_service_1 = require("../user/user.service");
let StripeService = class StripeService {
    constructor(configService, userService) {
        this.configService = configService;
        this.userService = userService;
    }
    async webhook(body) {
        if (body.type !== 'checkout.session.completed') {
            return '';
        }
        const response = await this.configService.getConfig();
        const stripe = new stripe_1.default(JSON.parse(response.Payload).body);
        const productToPlan = {
            prod_OJqpHLjTpWz2WU: 'free',
            prod_OKB7x4RFvG9AF7: 'premium',
        };
        const subscription = await stripe.subscriptions.retrieve(body.data.object.subscription);
        await this.userService.updateSubscription(subscription.customer, productToPlan[subscription.plan.product]);
    }
    async getSubscription(plan, email) {
        if (plan === 'free') {
            const customer = await this.userService.getCustomerId(email);
            await this.userService.updateSubscription(customer.customer, 'free');
            return { free: true };
        }
        const response = await this.configService.getConfig();
        const stripe = new stripe_1.default(JSON.parse(response.Payload).body);
        try {
            const customer = await this.userService.getCustomerId(email);
            if (!customer.customer) {
                return { error: 'Invalid customer' };
            }
            const session = await stripe.checkout.sessions.create({
                mode: 'subscription',
                line_items: [{ price: plan, quantity: 1 }],
                success_url: 'http://ec2-54-175-15-188.compute-1.amazonaws.com:3000/api/stripe/complete',
                cancel_url: 'http://ec2-54-175-15-188.compute-1.amazonaws.com:3000/api/stripe/complete',
                customer: customer.customer,
            });
            return { url: session.url };
        }
        catch (err) {
            console.log(err);
            return { error: 'failed to generate url' };
        }
    }
};
StripeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        user_service_1.UserService])
], StripeService);
exports.StripeService = StripeService;
//# sourceMappingURL=stripe.service.js.map