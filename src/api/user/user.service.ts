import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/models/users.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('users') private readonly usersShema: Model<Users>,
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
    } = newUser;

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAccount = new this.usersShema({
      first_name,
      last_name,
      email,
      password: hashedPassword, // Store hashed password
      role,
      associated_accounts,
      associated_accounts_allowed,
      account_type,
      standard_values,
    });

    const userResults = await newAccount.save();

    return userResults;
  }

  async authenticateUser(email: string, password: string): Promise<any> {
    const user = await this.usersShema.findOne({ email });
    return user && (await bcrypt.compare(password, user.password));
  }

  async updateUser(email: string, standard_values: Users['standard_values']) {
    const user = await this.usersShema.updateOne(
      { email },
      { standard_values },
    );
    return user;
  }
}
