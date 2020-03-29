import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from'./middleware/logger.middleware';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // 监听所有的请求路由，并打印日志
    app.use(logger);
  app.setGlobalPrefix('nest'); // 全局路由前缀
  await app.listen(3000);
}
bootstrap();
