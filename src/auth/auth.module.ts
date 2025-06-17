import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [JwtModule.registerAsync({
    global: true,
    useFactory: async (ConfigService: ConfigService) => ({
      secret: ConfigService.get<string>('JWT_SECRET'),
      signOptions: {expiresIn: +ConfigService.get<number>('JWT_EXPIRATION_TIME')}
    }),
    inject: [ConfigService],
  }), UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
