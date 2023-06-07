import { Injectable } from '@nestjs/common';
import { UserDocument } from './user/models/user.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadInterface } from '@app/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: UserDocument, response: Response) {
    const tokenPayload: TokenPayloadInterface = {
      id: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get<number>('JWT_EXPIRATION'),
    );

    const token: string = this.jwtService.sign(tokenPayload);

    //response.cookie('Authentication', token, { expires, httpOnly: true });
    response.setHeader('Authorization', 'Bearer ' + token);
  }
}
