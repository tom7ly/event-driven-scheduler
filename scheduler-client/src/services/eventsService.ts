import { AxiosError, AxiosResponse } from 'axios';
import { restClient } from "./external-services";
import { IEvent } from 'scheduler-shared/dist/models/Event.models'

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
  async updateEvent(event: IEvent): Promise<IEvent> {
    return (await restClient.gw.events.put(`/${event._id}`, event)).data;
  },
  async deleteEvent(eventId: string): Promise<IEvent> {
    return await restClient.gw.events.delete(`/${eventId}`);
  }
}

export default eventsService;