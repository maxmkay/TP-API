import { ConfigService } from '../config/config.service';
import { UserService } from '../user/user.service';
export declare class StripeService {
    private readonly configService;
    private readonly userService;
    constructor(configService: ConfigService, userService: UserService);
    webhook(body: any): Promise<string>;
    getSubscription(plan: any, email: any): Promise<{
        free: boolean;
        error?: undefined;
        url?: undefined;
    } | {
        error: string;
        free?: undefined;
        url?: undefined;
    } | {
        url: string;
        free?: undefined;
        error?: undefined;
    }>;
}
