import eventsService from "@/services/eventsService";
import { useForm } from "react-hook-form";
import { EventFormInput } from "./components/EventFormInput";
import { EventFormSelect } from "./components/EventFormSelect";
import { IEvent } from "scheduler-shared/models/Event.models";
import { cityVenues } from "./consts";
import { use, useEffect } from "react";

export const EventForm = ({
  onEvent: onEvent = async (data?: IEvent) => {},
  event,
}: {
  onEvent?: (data?: IEvent) => void;
  event?: IEvent;
}) => {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  useEffect(() => {
    console.log(event);
    if (event) {
      const {
        title,
        description,
        eventSchedule,
        location,
        venue,
        participants,
      } = event;
      setValue("title", title);
      setValue("description", description);
      setValue(
        "eventSchedule",
        new Date(eventSchedule).toISOString().substring(0, 16)
      );
      setValue("location", location);
      setValue("venue", venue);
      setValue("participants", participants);
      setValue("_id", event._id)
      trigger()
    }
  }, [event, setValue]);
  const eventLocation = watch("location");
  const cities: string[] = Object.keys(cityVenues);
  const venues = eventLocation ? cityVenues[eventLocation] : [];
  if (event && venues.indexOf(event.venue) === -1) {
    venues.push(event.venue); // Ensure the venue value in the event prop is included in the options
  }
  const onSubmit = async (data: {}) => {
    // const response: IEvent = await eventsService.postEvent(event);
    await onEvent(data as IEvent);
  };
  return (
    <div className="p-10  w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex-col  flex "
      >
        <EventFormInput
          label="Event Title"
          error={errors.eventTitle}
          register={register}
          name="title"
          type="text"
          placeholder="Event Title"
        />
        <EventFormInput
          label="Event Description"
          error={errors.eventDescription}
          register={register}
          name="description"
          type="text"
          inputClassName="h-20"
          textarea={true}
        />
        <EventFormInput
          label="Event Time"
          error={errors.eventTime}
          register={register}
          name="eventSchedule"
          type="datetime-local"
        />
        <div className="flex w-full">
          <EventFormSelect
            wrapClassName="w-2/4"
            label="City"
            error={errors.eventLocation}
            register={register}
            name="location"
            options={cities}
          />
          <EventFormSelect
            wrapClassName="pl-2 w-2/4"
            label="Venue"
            disabled={!eventLocation}
            error={errors.eventVenue}
            register={register}
            name="venue"
            options={venues}
          />
        </div>
        <EventFormInput
          label="Participants"
          error={errors.participants}
          register={register}
          name="participants"
          type="number"
          placeholder="Participants"
        ></EventFormInput>
        <div className="flex justify-center">
          <button
            disabled={!isValid}
            type="submit"
            className={`p-2 justify-center  ${
              !isValid ? "bg-gray-600" : "bg-blue-400"
            } rounded-full  text-white w-2/4`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
