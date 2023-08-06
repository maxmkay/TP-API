"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeModule = void 0;
const common_1 = require("@nestjs/common");
const stripe_service_1 = require("./stripe.service");
const stripe_controller_1 = require("./stripe.controller");
const config_service_1 = require("../config/config.service");
const user_service_1 = require("../user/user.service");
const mongoose_1 = require("@nestjs/mongoose");
const users_model_1 = require("../../models/users.model");
let StripeModule = class StripeModule {
};
StripeModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'users', schema: users_model_1.usersShema }])],
        providers: [stripe_service_1.StripeService, config_service_1.ConfigService, user_service_1.UserService],
        controllers: [stripe_controller_1.StripeController],
    })
], StripeModule);
exports.StripeModule = StripeModule;
//# sourceMappingURL=stripe..module.js.map