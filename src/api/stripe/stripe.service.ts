import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import Stripe from 'stripe';
import { UserService } from '../user/user.service';

@Injectable()
export class StripeService {
  private stripeConfig: { stripeKey: string };
  private appConfig: any;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.getConfig();
  }

  private async getConfig() {
    this.appConfig = await this.configService.getConfig();
    this.stripeConfig = this.appConfig;
  }

  async webhook(body) {
    if (body.type !== 'checkout.session.completed') {
      return '';
    }

    //@ts-ignore
    const stripe = new Stripe(this.stripeConfig.stripeKey);

    const productToPlan = {
      [this.appConfig.freePlanKey]: 'free',
      [this.appConfig.premiumPlanKey]: 'premium',
    };

    const subscription = await stripe.subscriptions.retrieve(
      body.data.object.subscription,
    );

    await this.userService.updateSubscription(
      subscription.customer,
      //@ts-ignore
      productToPlan[subscription.plan.id],
    );
  }

  async getSubscription(plan, email) {
    if (plan === 'free') {
      const customer = await this.userService.getCustomerId(email);
      await this.userService.updateSubscription(customer.customer, 'free');
      return { free: true };
    }

    //@ts-ignore
    const stripe = new Stripe(this.stripeConfig.stripeKey);

    const plans = {
      free: 'free',
      premium: this.appConfig.premiumPlanKey,
      ultra: '',
    };

    try {
      const customer = await this.userService.getCustomerId(email);

      if (!customer.customer) {
        return { error: 'Invalid customer' };
      }

      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [{ price: plans[plan], quantity: 1 }],
        success_url: `${this.appConfig.apiUrl}/api/stripe/complete`,
        cancel_url: `${this.appConfig.apiUrl}/api/stripe/complete`,
        customer: customer.customer,
      });

      return { url: session.url };
    } catch (err) {
      return { error: 'failed to generate url' };
    }
  }
}
