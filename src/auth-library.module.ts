// auth-lib.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthControllerController } from './auth-controller/auth-controller.controller';
import { AuthLibraryService } from './auth-library.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // Use an environment variable in production
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthControllerController, AuthControllerController],
  providers: [AuthLibraryService, JwtStrategy],
})
export class AuthLibModule {}
