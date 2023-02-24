import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from './environment/environment';

@Module({
  imports: [UserModule, MongooseModule.forRoot(environment.mongodb)],
  controllers: [],
  providers: [],
})
export class AppModule {}
