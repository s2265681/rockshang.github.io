import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthService } from './logical/auth/auth.service';
// import { AuthModule } from './logical/auth/auth.module';
// import { AuthService } from './logical/auth/auth.service';
// import { AuthModule } from './logical/auth/auth.module';
// import { UserService } from'./logical/user/user.service';
import { UserModule } from'./logical/user/user.module';
import { UserController } from'./logical/user/user.controller';

@Module({
  imports: [UserModule],
  controllers: [AppController,UserController],
  providers: [AppService],
})
export class AppModule {}
