import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthLibraryService } from '../auth-library.service';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller('auth-controller')
export class AuthControllerController {
  constructor(private readonly authService: AuthLibraryService) {}

  @Get()
  getHello(): string {
    return 'Hello World From Auth Controller!';
  }

  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtectedResource() {
    return { message: 'This is a protected resource' };
  }
}
