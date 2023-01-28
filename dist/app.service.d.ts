import { Log, LogDocument } from './app.schema';
import { Model } from 'mongoose';
import { Connection } from 'mongoose';
export declare class AppService {
    private logsModel;
    private connection;
    constructor(logsModel: Model<LogDocument>, connection: Connection);
    create(log: any): Promise<Log>;
    findAll(): Promise<Log[]>;
}
