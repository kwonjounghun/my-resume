import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Google 로그인 페이지로 리다이렉트
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    const { access_token, user } = await this.authService.login(req.user);
    
    // JWT를 쿠키에 저장
    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24시간
    });

    // 클라이언트 URL로 리다이렉트
    const clientUrl = this.configService.get<string>('CLIENT_URL');
    res.redirect(`${clientUrl}/auth/success?token=${access_token}`);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: any) {
    return req.user;
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('jwt');
    const clientUrl = this.configService.get<string>('CLIENT_URL');
    res.redirect(clientUrl);
  }
} 