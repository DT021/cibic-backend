import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    Put, UseGuards,
} from '@nestjs/common';

import { ActivityService } from './activity.service';
import { Activity } from './activity.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('activity') // http://localhost:3000/activity
export class ActivityController {
    constructor(private readonly activityService: ActivityService) {}

    @Post()
    async addActivity(@Body('activity') activity: Activity) {
        const generatedId = await this.activityService.insertActivity(activity);
        return { id: generatedId };
    }

    @Get()
    async getAllActivities() {
        const activities = await this.activityService.getActivities();
        return activities;
    }

    @Get('feed/:idUser') // http://localhost:3000/activity/feed/:idUser
     async getActivityFeed(@Param('idUser') idUser: string) {
        return await this.activityService.getActivityFeed(idUser);
    }

    @Get(':id')
    async getActivityById(@Param('id') activityId: string) {
        return await this.activityService.getActivityById(activityId);
    }

    @Post()
    async updateActivity(
        @Body('activityid') activityId: string,
        @Body('activity') activity: Activity) {
        return await this.activityService.updateActivity(activityId, activity);
    }

    @Delete(':id')
    async deleteActivity(@Param('id') activityId: string) {
        await this.activityService.deleteActivity(activityId);
        return null;
    }
}
