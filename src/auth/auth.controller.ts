import { Controller, Post, Body, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/authCredentialsDto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './getUser.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post('/signUp')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        return this.authService.signIn(authCredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    
    test(@GetUser() req) {
        console.log(req);
        //return this.authService.signIn(authCredentialsDto);
    }


}
