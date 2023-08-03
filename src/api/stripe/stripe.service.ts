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
    const stripe = new Stripe(JSON.parse(response.Payload).body);

    const productToPlan = {
      prod_OJqpHLjTpWz2WU: 'free',
      prod_OKB7x4RFvG9AF7: 'premium',
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
    const response = await this.configService.getConfig();

    //@ts-ignore
    const stripe = new Stripe(JSON.parse(response.Payload).body);

    // const customer = await this.userService.getCustomerId(email);
    // const intent = await stripe.paymentIntents.create({
    //   amount: 1000,
    //   currency: 'usd',
    //   customer: customer.customer,
    // });
    // console.log(intent);
    // return { clientSecret: intent.client_secret };

    try {
      const customer = await this.userService.getCustomerId(email);

      if (!customer.customer) {
        return { error: 'Invalid customer' };
      }

      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [{ price: plan, quantity: 1 }],
        success_url: 'ec2-35-172-182-131.compute-1.amazonaws.com:3000/api/stripe/complete',
        cancel_url: 'ec2-35-172-182-131.compute-1.amazonaws.com:3000/api/stripe/complete',
        customer: customer.customer,
      });

      return { url: session.url };
    } catch (err) {
      console.log(err);
      return { error: 'failed to generate url' };
    }
  }
}
