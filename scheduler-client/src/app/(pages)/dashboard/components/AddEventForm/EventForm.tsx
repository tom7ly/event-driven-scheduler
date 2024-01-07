import eventsService from "@/services/eventsService";
import { useForm } from "react-hook-form";
import { EventFormInput } from "./components/EventFormInput";
import { EventFormSelect } from "./components/EventFormSelect";
import { IEvent } from "scheduler-shared/models/Event.models";
import { cityVenues } from "./consts";

export const EventForm = ({
  onEventCreated = (data?: IEvent) => {},
}: {
  onEventCreated?: (data?: IEvent) => void;
}) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const eventLocation = watch("location");
  const cities: string[] = Object.keys(cityVenues);
  const venues = eventLocation ? cityVenues[eventLocation] : [];
  const onSubmit = async (data: {}) => {
    const event = data as IEvent;
    const response: IEvent = await eventsService.postEvent(event);
    onEventCreated(response);
    console.log(response);
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
