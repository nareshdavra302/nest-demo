import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { env } from '../env'

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: env.db.host,
    port: env.db.port,
    username: env.db.username,
    password: env.db.password,
    database: env.db.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: env.db.synchronize
}