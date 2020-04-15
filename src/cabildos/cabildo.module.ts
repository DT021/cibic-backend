import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CabildoService } from './cabildo.service';
import { CabildoController } from './cabildo.controller';
import { CabildoSchema } from './cabildo.schema';
import { StatiscticModule } from '../statistics/statisctic.module';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Cabildo', schema: CabildoSchema}]),
        StatiscticModule,
    ],
    controllers: [CabildoController],
    providers: [CabildoService],
    exports: [CabildoService, MongooseModule],
})
export class CabildoModule {}
