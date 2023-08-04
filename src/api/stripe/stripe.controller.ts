import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('subscription')
  async getSubscription(@Headers() header) {
    const { plan, email } = header;
    return this.stripeService.getSubscription(plan, email);
  }

  @Post('webhook')
  async webhook(@Body() body) {
    return this.stripeService.webhook(body);
  }

  @Get('complete')
  async complete () {
    return `<script>window.close()</script>`
  }
}
