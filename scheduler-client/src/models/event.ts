import eventsService from "@/services/eventsService";

export interface IEvent {
    _id?: any;
    title: string;
    description: string;
    location: string;
    venue: string;
    eventSchedule: Date;
    participants: number;
    createdAt: Date;
  }