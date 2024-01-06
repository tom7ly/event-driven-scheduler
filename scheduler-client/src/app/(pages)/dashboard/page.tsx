"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { EventFormInput } from "./components/AddEventForm/components/EventFormInput";
import { EventFormSelect } from "./components/AddEventForm/components/EventFormSelect";
import eventsService from "@/services/eventsService";
import { EventForm } from "./components/AddEventForm/EventForm";

export default function Dashboard() {
  return (
    <div className="flex justify-center  pl-48 pr-48">
      <EventForm />
    </div>
  );
}
