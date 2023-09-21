import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import Stripe from 'stripe';
import { UserService } from '../user/user.service';

@Injectable()
export class StripeService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async webhook(body) {
    if (body.type !== 'checkout.session.completed') {
      return '';
    }

    const response = await this.configService.getConfig();

    //@ts-ignore
    const stripe = new Stripe(response.stripe_key);

    const productToPlan = {
      [process.env.PRODUCT_FREE]: 'free',
      [process.env.PRODUCT_PREMIUM]: 'premium',
    };

    const subscription = await stripe.subscriptions.retrieve(
      body.data.object.subscription,
    );

    await this.userService.updateSubscription(
      subscription.customer,
      //@ts-ignore
      productToPlan[subscription.plan.product],
    );
  }

  async getSubscription(plan, email) {

    if (plan === 'free') {
      const customer = await this.userService.getCustomerId(email);
      await this.userService.updateSubscription(customer.customer, 'free');
      return { free: true };
    }

    const response = await this.configService.getConfig();

    //@ts-ignore
    const stripe = new Stripe(response.stripe_key);

    const plans = {
      free: "free",
      premium: process.env.MEMBERSHIP_PREMIUM,
      ultra: process.env.MEMBERSHIP_ULTRA,
    }

    try {
      const customer = await this.userService.getCustomerId(email);

      if (!customer.customer) {
        return { error: 'Invalid customer' };
      }

      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [{ price: plans[plan], quantity: 1 }],
        success_url:
          'http://ec2-54-175-15-188.compute-1.amazonaws.com:3000/api/stripe/complete',
        cancel_url:
          'http://ec2-54-175-15-188.compute-1.amazonaws.com:3000/api/stripe/complete',
        customer: customer.customer,
      });

      return { url: session.url };
    } catch (err) {
      console.log(err);
      return { error: 'failed to generate url' };
    }
  }
}
