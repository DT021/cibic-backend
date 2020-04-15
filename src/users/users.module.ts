import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './users.schema';
import { UserService } from './users.service';
import { UserController } from './users.controller';

import { CabildoModule } from '../cabildos/cabildo.module';
import { StatiscticModule } from '../statistics/statisctic.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
		CabildoModule,
		StatiscticModule,
	],
	providers: [UserService],
	controllers: [UserController],
	exports: [UserService, MongooseModule],
})
export class UserModule { }
