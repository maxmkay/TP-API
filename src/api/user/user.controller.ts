import { Body, Query, Controller, Post, Patch, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async addUser(@Body() body) {
    return this.userService.addUser(body);
  }

  @Patch()
  async updateUser(@Body() body) {
    const { email, standard_values, role } = body;
    return await this.userService.updateUser(email, standard_values, role);
  }

  @Post('authenticate')
  async authenticateUser(@Body() body) {
    const { email, password } = body;
    return await this.userService.authenticateUser(email, password);
  }

  @Get('membership')
  async getMembership(@Query() query) {
    const { email } = query;
    return await this.userService.getMembership(email);
  }
}
