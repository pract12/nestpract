import { Module } from '@nestjs/common';
import { User, UserSchemaName, userSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { environment } from 'src/environment/environment';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/auth/local.strategy';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CsvModule } from 'nest-csv-parser';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongodb),
    MongooseModule.forFeature([
      {
        name: UserSchemaName,
        schema: userSchema,
      },
    ]),
    JwtModule.register({
      secret: environment.secretkey,
      signOptions: { expiresIn: '15m' },
    }),
    passportModule,
    CsvModule,
  ],
  providers: [UserService, LocalStrategy, JwtStrategy],
  exports: [UserService, passportModule],
  controllers: [UserController],
})
export class UserModule {}
