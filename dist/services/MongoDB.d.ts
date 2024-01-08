import { Connection } from 'mongoose';
export declare function initMongoDB(uri: string): Promise<Connection>;
