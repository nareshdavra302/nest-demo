import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwtPayload.inteface';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { env } from '../env'

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: env.app.jwtSecret
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        const user =  await this.userRepository.findOne({ username });

        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}