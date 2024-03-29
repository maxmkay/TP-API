import { Body, Headers, Controller, Post, Patch, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Headers() header) {
    const { email } = header;
    return await this.userService.getUser(email)
  }

  @Post()
  async addUser(@Body() body) {
    return await this.userService.addUser(body);
  }

  @Patch()
  async updateUser(@Body() body) {
    const { old_email, email, standard_values, role, first_name, last_name, phone_number } = body;
    return await this.userService.updateUser(old_email, email, standard_values, role, first_name, last_name, phone_number);
  }

  @Post('authenticate')
  async authenticateUser(@Body() body) {
    const { email, password } = body;
    return await this.userService.authenticateUser(email, password);
  }

  @Get('membership')
  async getMembership(@Headers() header) {
    const { email } = header;
    return await this.userService.getMembership(email);
  }
}
