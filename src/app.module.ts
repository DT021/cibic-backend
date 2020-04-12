import { Module } from '@nestjs/common';
import { MongooseModule} from '@nestjs/mongoose';
import { ScheduleModule } from 'nest-schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { CabildoModule } from './cabildos/cabildo.module';
import { ActivityModule } from './activities/activity.module';
import { AuthModule } from './auth/auth.module';
import {  StatiscticModule } from './statistics/statisctic.module';

@Module({
    imports: [
        MongooseModule.forRoot(
            'mongodb://172.23.0.2:27017/cibic',
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
            },
        ),
        UserModule,
        CabildoModule,
        ActivityModule,
        AuthModule,
        StatiscticModule,
        ScheduleModule.register(),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
