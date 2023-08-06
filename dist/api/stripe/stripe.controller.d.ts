import { StripeService } from './stripe.service';
export declare class StripeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    getSubscription(header: any): Promise<{
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
    webhook(body: any): Promise<string>;
    complete(): Promise<string>;
}
