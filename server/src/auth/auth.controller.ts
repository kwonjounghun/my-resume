import { Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Query('returnUrl') returnUrl: string, @Res() res: Response) {
    // returnUrl을 state 파라미터로 전달
    const state = returnUrl ? Buffer.from(returnUrl).toString('base64') : '';
    res.redirect(`${process.env.GOOGLE_AUTH_URL}?state=${state}`);
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Query('state') state: string, @Req() req, @Res() res: Response) {
    const { accessToken, user } = await this.authService.googleLogin(req.user);

    // JWT를 쿠키에 설정
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
    });

    // state가 있으면 디코딩하여 returnUrl로 사용
    const returnUrl = state ? Buffer.from(state, 'base64').toString() : '/';

    // /auth/success로 리다이렉트하면서 토큰과 returnUrl을 쿼리 파라미터로 전달
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${accessToken}&returnUrl=${encodeURIComponent(returnUrl)}`);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req) {
    return req.user;
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('jwt');
    res.status(200).send({ message: '로그아웃되었습니다.' });
  }
} 