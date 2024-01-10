"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { EventFormInput } from "./components/AddEventForm/components/EventFormInput";
import { EventFormSelect } from "./components/AddEventForm/components/EventFormSelect";
import eventsService from "@/services/eventsService";
import { EventForm } from "./components/AddEventForm/EventForm";
import { IEvent } from "scheduler-shared/dist/models/Event.models";
import {
  Snackbar,
  SnackbarState,
} from "@/app/global-components/snackbars/snackbars";

export default function Dashboard() {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    isVisible: false,
    message: "",
    err: false,
  });
  const onSubmitCB = async (data?: IEvent) => {
    const response = await eventsService
      .postEvent(data as IEvent)
      .then((res) => {
        console.log(res);
        setSnackbar({
          isVisible: true,
          message: "Event added successfully",
          err: false,
        });
      })
      .catch((err) => {
        console.log(err);
        const msg = err.data ? err.data : err.message;
        setSnackbar({
          isVisible: true,
          message: `Error adding event: ${msg}`,
          err: true,
        });
      });
  };
  return (
    <div className="flex justify-center  pl-48 pr-48">
      <EventForm onSubmitCB={onSubmitCB} />
      <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
    </div>
  );
}
