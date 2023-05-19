import { Body, Param, Controller, Post, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  addUser(@Body() body) {
    console.log(body);
    return this.userService.addUser(body);
  }

  @Patch()
  async updateUser(@Body() body) {
    console.log(body);
    const { email, standard_values, role } = body;
    return await this.userService.updateUser(email, standard_values, role);
  }

  @Post('authenticate')
  async authenticateUser(@Body() body) {
    const { email, password } = body;
    return await this.userService.authenticateUser(email, password);
  }
}
