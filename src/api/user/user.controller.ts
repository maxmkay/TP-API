import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  addUser(@Body() body) {
    console.log(body);
    return this.userService.addUser(body);
  }

  @Post('authenticate')
  authenticateUser(@Body() body) {
    const { email, password } = body;
    return this.userService.authenticateUser(email, password);
  }
}
