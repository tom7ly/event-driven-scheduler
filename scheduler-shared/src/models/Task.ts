import Bull, { JobOptions } from "bull";
import { IEvent } from "./Event.models";
import { IReminder } from "./Reminder.models";
import mongoose from "mongoose";



// export class Task implements ITask {
//     constructor(
//         public name: string,
//         public data: any,
//         public type: TaskType,
//         public options: JobOptions = { delay: 0, priority: 0, repeat: { every: 0 } },
//         public jobId?: string | number
//     ) { }
// }

// const taskSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     data: { type: Object, required: true },
//     type: { type: String, required: true },
//     options: { type: Object, required: false },
// });
// export const TaskModel = mongoose.model<ITask>('Task', taskSchema);
