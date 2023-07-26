import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('subscription')
  async getSubscription(@Query() query) {
    const { plan, email } = query;
    return this.stripeService.getSubscription(plan, email);
  }

  @Post('webhook')
  async webhook(@Body() body) {
    return this.stripeService.webhook(body);
  }
}
