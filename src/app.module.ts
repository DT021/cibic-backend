import { Module } from '@nestjs/common';
import { MongooseModule} from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CabildoModule } from './cabildos/cabildo.module';
import { ActivityModule } from './activities/activity.module';
import { CommentModule } from './comments/comment.module';
import { ReplyModule } from './replies/reply.module';

@Module({
    imports: [
        MongooseModule.forRoot(
            'mongodb://mongo_serve:27017/cibic',
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false,
            },
        ),
        UsersModule,
        CabildoModule,
        ActivityModule,
        CommentModule,
        ReplyModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
