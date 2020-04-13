import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Statistic } from './statistic.schema';
import { Cron, Interval, NestSchedule } from 'nest-schedule';
import { Cabildo } from '../cabildos/cabildo.schema';

@Injectable()
export class StatisticService extends NestSchedule {
    constructor(
        @InjectModel('Statistic') private statisticModel: mongoose.Model<Statistic>,
        @InjectModel('Cabildo') private readonly cabildoModel: mongoose.Model<Cabildo>,
    ) {
        super();
    }

    async getStatistics() {
        const statistic = await this.statisticModel.find({
            date: {$gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))}, // compare date greater than 7 days ago
        }).exec();
        return statistic.map(data => ({
            date: data.date,
            activeCabildos: data.activeCabildos,
            activeUsers: data.activeUsers,
            newUsers: data.newUsers,
            newCabildos: data.newCabildos,
            newActivities: data.newActivities,
        }));
    }

    @Cron('0 0 0 * * ?') // Cron expression, repeat once at midnight to create a new record of the day
    async newDailyStatistic() {
        const newDay = new this.statisticModel();
        newDay.date = new Date();
        await newDay.save();
    }

    async getDailyId() {
        const day = this.statisticModel.findOne({}, {}, {sort: {date: -1}}).exec();
        return day._id;
    }

    async updateNewCabildo() {
        const day = this.statisticModel.findOne({}, {}, {sort: {date: -1}}).exec();
        day.newCabildo += 1;
        await day.save();
    }

    async updateNewUser() {
        const day = this.statisticModel.findOne({}, {}, {sort: {date: -1}}).exec();
        day.newUsers += 1;
        await day.save();
    }

    async updateNewActivity() {
        const day = this.statisticModel.findOne({}, {}, {sort: {date: -1}}).exec();
        day.newActivities += 1;
        await day.save();
    }

    @Cron('0 0 4 ? * * *' ) // everyday at 4 am
    async updateDailyActiveCabildos() {
        let count = 0;
        const day = this.statisticModel.findOne({}, {}, {sort: {date: -1}}).exec();
        /* time configuration */
        const today = new Date();
        const yesterday = new Date();
        today.setHours(0, 0, 0, 0);
        yesterday.setHours(0, 0, 0, 0);
        yesterday.setDate(yesterday.getDate() - 1);

        const cabildos = await this.cabildoModel.find({}, '_id activities')
            .populate({path: 'activities',
                select: 'publishDate',
                options: { sort: { publishDate: -1 }, limit: 1},
                match: { publishDate: { '$gte': yesterday, '$lt': today}},
            }).exec(); // return one cabildo, one activity of yesterday

        cabildos.map(cabildo => {
            if ( cabildo.activities.length >= 1) {
                count += 1;
            }
        });
        day.activeCabildos = count;
        try {
            await day.save();
        } catch (e) {
            console.log('Error updating active cabildos', e);
        }
    }
}
