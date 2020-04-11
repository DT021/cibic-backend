import mongoose from 'mongoose';

export const StatiscticSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    activeCabildos: { type: Number, required: true, index: true },
    activeUsers: { type: Number, required: true, index: true },
    newUsers: { type: Number, required: true },
    newCabildos: { type: Number },
    newActivities: { type: Number, required: true },
});

export interface Statistic extends mongoose.Document {
    date: number;
    activeCabildos: number;
    activeUsers: number;
    newUsers: number;
    newCabildos: number;
    newActivities: number;
}
