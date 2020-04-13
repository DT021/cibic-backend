import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatisticService } from './statistics.service';
import { StatisticController } from './statistic.controller';
import { StatiscticSchema } from './statistic.schema';
import {CabildoModule} from '../cabildos/cabildo.module';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Statistic', schema: StatiscticSchema}]),
        CabildoModule,
    ],
    providers: [StatisticService],
    controllers: [StatisticController],
    exports: [StatisticService, MongooseModule],
})
export class StatiscticModule { }
