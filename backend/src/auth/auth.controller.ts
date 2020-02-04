import { Controller, UseGuards, Get, Post, Body, Res, HttpStatus, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
    payload: any;

    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto, @Res() res) {
        this.payload = await this.authService.validateUserByPassword(loginUserDto);
        res.status(HttpStatus.OK)
            .set('X-Authorization', this.payload.token)
            .send({
            success: true,
            statusCode: HttpStatus.OK,
            });
        // return await this.authService.validateUserByPassword(loginUserDto);
    }

    @Get('user')
    @UseGuards(AuthGuard())
    getUser(@Req() req) {
        return req.user.data;
    }

}
