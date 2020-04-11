import {
    Controller,
    Get,
} from '@nestjs/common';
import {StatisticService} from './statistics.service';

@Controller('statistics')
export class StatisticController {
    constructor(
        private readonly statisticService: StatisticService,
    ) {}

    @Get()
    async getWeeklyStatistic() {
        return await this.statisticService.getStatistics();
    }
}
