import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/models/users.model';
import { ConfigService } from '../config/config.service';
import Stripe from 'stripe';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('users') private readonly usersShema: Model<Users>,
    private readonly configService: ConfigService,
  ) {}

  async addUser(newUser: Users) {
    const {
      first_name,
      last_name,
      email,
      password,
      role,
      associated_accounts,
      associated_accounts_allowed,
      account_type,
      standard_values,
      user_details,
    } = newUser;

    const response = await this.configService.getConfig();

    //@ts-ignore
    const stripe = new Stripe(JSON.parse(response.Payload).body);
    const customer = await stripe.customers.create({
      name: first_name,
      email: email,
    });

    // Hash the password
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

  async authenticateUser(email: string, password: string): Promise<any> {
    const user = await this.usersShema.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return { error: 'Invalid email or password.' };
  }

  async updateUser(
    email: string,
    standard_values: Users['standard_values'],
    role: string,
  ) {
    const user = await this.usersShema.updateOne(
      { email },
      { standard_values, role },
    );
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
    const user = await this.usersShema.updateOne(
      { customer_id },
      { membership: plan },
    );

    if (user) {
      return { message: 'Successfully updated' };
    }
    return { error: 'Invalid customer or plan' };
  }
}
