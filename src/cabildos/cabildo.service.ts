import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cabildo } from './cabildo.schema';

@Injectable()
export class CabildoService {
    constructor(
        @InjectModel('Cabildo') private readonly cabildoModel: Model<Cabildo>,
    ) {}

    async insertCabildo(cabildo: Cabildo) {
        const newCabildo = new this.cabildoModel(cabildo)
        const result = await newCabildo.save();
        return result.id as string;
    }

    async getCabildos() {
        const cabildos = await this.cabildoModel.find().exec();
        return cabildos.map(data => ({
            name: data.name,
            members: data.members,
            moderators: data.moderators,
            admin: data.admin,
            location: data.location,
            issues: data.issues,
            meetings: data.meetings,
            files: data.files,
        }));
    }

    async getCabildoById(cabildoId: string) {
        const cabildo = await this.findCabildo(cabildoId);
        return cabildo;
    }

    async deleteCabildo(cabildoId: string) {
        const cabildo = await this.cabildoModel.findByIdAndDelete(cabildoId).exec();
        if (cabildo.n === 0) {
            throw new NotFoundException('Could not find cabildo.');
        }
    }

    private async findCabildo(cabildoId: string) {
        let cabildo;
        try {
            cabildo = await this.cabildoModel.findById(cabildoId).exec();
        } catch (error) {
            throw new NotFoundException('Could not find cabildo.');
        }
        if (!cabildo) {
            throw new NotFoundException('Could not find cabildo.');
        }
        return cabildo;
    }
}
