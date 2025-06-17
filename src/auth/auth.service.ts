import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthResponseDto } from './dto/auth.dto';
import {compareSync as bcrypCompareSync} from 'bcrypt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {

  private jwtExpirationTimeSeconds: number;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
      this.jwtExpirationTimeSeconds = +this.configService.get<number>('JWT_EXPIRATION_TIME');
    }

  singIn(username: string, password: string): AuthResponseDto {
    const foundUser = this.userService.findByUsername(username);

    if(!foundUser || !bcrypCompareSync(password, foundUser.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: foundUser.username, sub: foundUser.id };

    const token = this.jwtService.sign(payload);

    return {token, expiresIn: this.jwtExpirationTimeSeconds}
  }
}
