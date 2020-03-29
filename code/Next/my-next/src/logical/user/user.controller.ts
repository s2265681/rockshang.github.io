// import { Controller } from '@nestjs/common';
import { Controller, Post, Body,Get } from '@nestjs/common';
import { UserService } from './user.service';
// import { AuthService } from'../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    // private readonly authService: AuthService, 
    private readonly usersService: UserService) {}
    // 查询
    @Post('getUser')
    findOne(@Body() body: any) {
      return this.usersService.findOne(body.username)
    }
     // JWT验证 登录
  // @Post('login')
  // async login(@Body() loginParmas: any) {
  //   console.log('JWT验证 - Step 1: 用户请求登录');
  //   const authResult = await this.authService.validateUser(loginParmas.username, loginParmas.password);
  //   switch (authResult.code) {
  //     case 1:
  //       return this.authService.certificate(authResult.user);
  //     case 2:
  //       return {
  //         code: 600,
  //         msg: `账号或密码不正确`,
  //       };
  //     default:
  //       return {
  //         code: 600,
  //         msg: `查无此人`,
  //       };
  //   }
  // }
    // 注册
    @Post('register')
    async register(@Body() body: any) {
      return await this.usersService.register(body)
    }
}
