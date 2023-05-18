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
  updateUser(@Body() body) {
    console.log(body);
    const { email, standard_values } = body;
    return this.userService.updateUser(email, standard_values)
  }

  @Post('authenticate')
  authenticateUser(@Body() body) {
    const { email, password } = body;
    return this.userService.authenticateUser(email, password);
  }
}
