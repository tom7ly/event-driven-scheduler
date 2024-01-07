"use client";
import { useEffect, useState } from "react";
import eventsService from "@/services/eventsService";
import { IEvent } from "scheduler-shared/models/Event.models";
import Clock from "./components/Clock";
import WideButton from "../../global-components/buttons/WideButton";
import AddEventDialog from "./components/AddEventDialog";
import {
  CrossSvg,
  PenSvg,
} from "@/app/global-components/buttons/svgs/SvgIcons";
import { IconButton } from "@/app/global-components/buttons/IconButton";

export default function EventsPage() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [clockLoaded, setClockLoaded] = useState(false);
  const deleteEvent = (id: string) => {
    console.log("deleting event");
    eventsService
      .deleteEvent(id)
      .then((res) => {
        console.log(res);
        setEvents(events.filter((event) => event._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      console.log("fetching events");
      const response = await eventsService.getEvents();
      setEvents(response);
    };
    fetchEvents();
  }, []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = (data?: IEvent) => {
    console.log(data);
    if (data) {
      setEvents([...events, data]);
    }
    setIsDialogOpen(false);
  };
  const handleClockLoaded = () => {
    console.log("clock loaded");
    setClockLoaded(true);
  };

  return (
    <div className="bg-white shadow-neutral-700 rounded-sm ">
      <div className="flex items justify-between pb-4">
        <Clock onLoaded={handleClockLoaded} />
        {clockLoaded ? (
          <WideButton buttonText="Add Event" onClick={handleOpenDialog} />
        ) : (
          ""
        )}
        <AddEventDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
      </div>
      {events?.length > 0 ? (
        <div className="">
          <div className="grid grid-cols-12 p-2 pl-6">
            <div className="col-span-2">Title</div>
            <div className="col-span-2">Event Time</div>
            <div className="col-span-"></div>
            <div className="col-span-2">Location</div>
            <div className="col-span-2">Participants</div>
            <div className="col-span-2">Venue</div>
            <div className="col-span-2"></div>
          </div>
          {events.map((event: IEvent) => (
            <div
              className="grid grid-cols-12 bg-gray-500 w-full rounded-sm p-2 pl-6 items-center m-0.5"
              key={event._id}
            >
              <p className="text-sm text-white col-span-2">{event.title}</p>
              <p className="text-sm text-white col-span-2">
                {new Date(event.eventSchedule).toLocaleString("en-GB", {
                  hour12: false,
                  hourCycle: "h23",
                })}
              </p>
              <p className="text-sm text-white col-span-1"></p>
              <p className="text-sm text-white col-span-2">{event.location}</p>
              <a className="text-sm text-white col-span-2 pl-1">
                {event.participants}
              </a>

              <p className="text-sm text-white col-span-2">{event.venue}</p>
              <div className="col-span-1 w-full pr-10 ">
                <IconButton
                  onClickCb={() => deleteEvent(event._id)}
                  SvgIcon={CrossSvg}
                />
                {/* <IconButton onClickCb={deleteEvent} SvgIcon={CrossSvg} /> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className=" flex justify-center text-3xl  text-gray-500 pt-40">
          {"No events found, create one in the Dashboard! :)"}
        </div>
      )}
    </div>
  );
}
