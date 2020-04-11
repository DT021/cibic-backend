import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Statistic } from './statistic.schema';

@Injectable()
export class StatisticService {
    constructor(
        @InjectModel('Statistic') private statisticModel: mongoose.Model<Statistic>,
    ) {
    }

    async getStatistics() {
        const statistic = await this.statisticModel.find().exec();
        return statistic.map(data => ({
            date: data.date,
            activeCabildos: data.activeCabildos,
            activeUsers: data.activeUsers,
            newUsers: data.newUsers,
            newCabildos: data.newCabildos,
            newActivities: data.newActivities,
        }));
    }
}
