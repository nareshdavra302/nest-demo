import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/authCredentialsDto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(authCredentialsDto : AuthCredentialsDto): Promise<void> {
        const {username, password } = authCredentialsDto;

        let salt = await bcrypt.genSalt();

        let user = new User();
        user.username = username;
        user.salt = salt;
        user.password =await bcrypt.hash(password,salt);

        try {
            await user.save();
            
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException();
            }
            else
            {
                throw new InternalServerErrorException();
            }
        }
        
    }

    async validateUserPassword(authCredentialsDto : AuthCredentialsDto): Promise<string> {
        const {username, password } = authCredentialsDto;

        const user = await this.findOne({username});

        if(user && await user.validatePassword(password)) {
            return username;
        } else {
            return "not found"
        }
    }
}