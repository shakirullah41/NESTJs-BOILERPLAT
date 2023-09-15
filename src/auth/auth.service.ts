import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.userService.validateUserPassword(
      authCredentialsDto,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { id, email } = user;
    const accessToken = await this.generateToken({ id, email });
    return { accessToken };
  }
  async signUp(signUpDto: SignUpDto): Promise<{ accessToken: string }> {
    const user = await this.userService.signUp(signUpDto);
    const { id, email } = user;
    const accessToken = await this.generateToken({ id, email });
    return { accessToken };
  }
  async generateToken(data) {
    const payload = { ...data };
    const accessToken = await this.jwtService.sign(payload);
    return accessToken;
  }
  async OAuth(user) {
    const { id, email } = user;
    let toSend: any = {};
    toSend.token = await this.generateToken({ id, email });
    console.log(toSend.token);
    toSend = JSON.stringify(toSend);
    return `<html><head></head><body><p>Redirecting...</p></body><script>window.opener.postMessage({parentWindowName:window.name,payload:'${toSend}'},'*');window.close();</script></html>`;
  }
}
