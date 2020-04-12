import mongoose from 'mongoose';

export const StatiscticSchema = new mongoose.Schema({
    date: { type: Date, required: true, default: new Date() },
    activeCabildos: { type: Number, required: true, index: true, default: 0 },
    activeUsers: { type: Number, required: true, index: true, default: 0 },
    newUsers: { type: Number, required: true, default: 0 },
    newCabildos: { type: Number, required: true, default: 0 },
    newActivities: { type: Number, required: true, default: 0 },
});

export interface Statistic extends mongoose.Document {
    date: number;
    activeCabildos: number;
    activeUsers: number;
    newUsers: number;
    newCabildos: number;
    newActivities: number;
}
