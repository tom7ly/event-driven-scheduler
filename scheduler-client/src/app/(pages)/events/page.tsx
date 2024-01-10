"use client";
import { useEffect, useState } from "react";
import eventsService from "@/services/eventsService";
import { IEvent } from "scheduler-shared/dist/models/Event.models";
import Clock from "./components/Clock";
import WideButton from "../../global-components/buttons/WideButton";
import EventDialog from "./components/AddEventDialog";
import {
  CrossSvg,
  PenSvg,
} from "@/app/global-components/buttons/svgs/SvgIcons";
import { IconButton } from "@/app/global-components/buttons/IconButton";
import { set } from "react-hook-form";
import { on } from "events";
import {
  Snackbar,
  SnackbarState,
} from "@/app/global-components/snackbars/snackbars";

export default function EventsPage() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [clockLoaded, setClockLoaded] = useState(false);
  const [dialogData, setDialogData] = useState<IEvent>();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    isVisible: false,
    message: "",
    err: false,
  });
  const deleteEvent = (id: string) => {
    console.log("deleting event");
    eventsService
      .deleteEvent(id)
      .then((res) => {
        console.log(res);
        setEvents(events.filter((event) => event._id !== id));
        setSnackbar({
          isVisible: true,
          message: "Event deleted successfully",
          err: false,
        });
      })
      .catch((err) => {
        console.log(err);
        const msg = err.data ? err.data : err.message;
        setSnackbar({
          isVisible: true,
          message: `Error deleting event: ${msg}}`,
          err: true,
        });
      });
  };

  const editEvent = (event: IEvent) => {
    console.log("editing event");
    eventsService
      .updateEvent(event)
      .then((res) => {
        console.log(res);
        const updatedEvent = res;

        setEvents(
          events.map((event) => {
            if (event._id === res._id) {
              return updatedEvent;
            }
            return event;
          })
        );
        setSnackbar({
          isVisible: true,
          message: "Event updated successfully",
          err: false,
        });
      })
      .catch((err) => {
        console.log(err);
        const msg = err.data ? err.data : err.message;
        setSnackbar({
          isVisible: true,
          message: `Error updating event: ${msg}`,
          err: true,
        });
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

  const onOpenEditDialog = (event: IEvent) => {
    setDialogData(event);
    setIsEditDialogOpen(true);
  };
  const onCloseEditDialog = (data?: IEvent) => {
    console.log(data);
    data ? editEvent(data) : "";
    setIsEditDialogOpen(false);
  };

  const onOpenAddDialog = () => {
    setDialogData(undefined);
    setIsAddDialogOpen(true);
  };
  const addEvent = async (event: IEvent) => {
    console.log("adding event");
    eventsService
      .postEvent(event)
      .then((res) => {
        console.log(res);
        setEvents([...events, res]);
        setSnackbar({
          isVisible: true,
          message: "Event created successfully",
          err: false,
        });
      })
      .catch((err) => {
        console.log(err);
        const msg = err.data ? err.data : err.message;
        setSnackbar({
          isVisible: true,
          message: `Error creating event: ${msg}`,
          err: true,
        });
      });
  };
  const onCloseAddDialog = async (data?: IEvent) => {
    console.log(data);
    data ? await addEvent(data) : "";
    setIsAddDialogOpen(false);
  };
  const onCLockLoaded = () => {
    console.log("clock loaded");
    setClockLoaded(true);
  };

  return (
    <div className="bg-white shadow-neutral-700 rounded-sm ">
      <div className="flex items justify-between pb-4">
        <Clock onLoaded={onCLockLoaded} />
        {clockLoaded ? (
          <WideButton buttonText="Add Event" onClick={onOpenAddDialog} />
        ) : (
          ""
        )}
        <EventDialog isOpen={isAddDialogOpen} onClose={onCloseAddDialog} />
        <EventDialog
          eventProp={dialogData}
          isOpen={isEditDialogOpen}
          onClose={onCloseEditDialog}
        />
      </div>
      <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
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
              <div className="col-span-1 w-full pr-10  ">
                <IconButton
                  onClickCb={() => onOpenEditDialog(event)}
                  SvgIcon={PenSvg}
                />
                <IconButton
                  onClickCb={() => deleteEvent(event._id!)}
                  SvgIcon={CrossSvg}
                />
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
