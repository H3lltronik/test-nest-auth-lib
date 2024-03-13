import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthLibraryService {
  constructor(private readonly jwtService: JwtService) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      roles: ['post:edit'],
    },
    // Agrega más usuarios como sea necesario
  ];

  async validateUser(username: string, pass: string): Promise<any> {
    const user = this.users.find(
      (user) => user.username === username && user.password === pass,
    );
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      roles: user.roles,
    };

    const validateUser = await this.validateUser(user.username, user.password);
    if (!validateUser) {
      throw new UnauthorizedException();
    }

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
