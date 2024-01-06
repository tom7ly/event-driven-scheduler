import { AxiosError, AxiosResponse } from 'axios';
import { restClient } from "../services/external-services";
import { IEvent } from '@/models/event';

const eventsService = {
  async getEvent(eventId: string) {
    const res = await restClient.gw.events(eventId);
    return res;
  },
  async getEvents(): Promise<IEvent[]> {
    return (await restClient.gw.events.get('/')).data
  },
  async postEvent(event: IEvent): Promise<IEvent> {
    return (await restClient.gw.events.post('/', event)).data
  },
  async updateEvent(event: IEvent, eventId: string): Promise<IEvent> {
    return await restClient.gw.events.put(`/api/events/${eventId}`, event);
  },
  async deleteEvent(eventId: string): Promise<IEvent> {
    return await restClient.gw.events.delete(`/${eventId}`);
  }
}

export default eventsService;