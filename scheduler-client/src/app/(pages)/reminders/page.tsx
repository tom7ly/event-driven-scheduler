"use client";

import React, { useState } from "react";
import { remindersService } from "@/services/remindersService";
import { IReminder } from "scheduler-shared/models/Reminder.models";
import { IconButton } from "@/app/global-components/buttons/IconButton";
import { CrossSvg } from "@/app/global-components/buttons/svgs/SvgIcons";
export default function RemindersPage() {
  const [reminders, setReminders] = useState([]);
  const fetchReminders = async () => {
    const response = await remindersService.getReminders();
    if (response.status === 200) {
      setReminders(response.data);
    }
    console.log("response", response);
  };
  React.useEffect(() => {
    fetchReminders();
  }, []);

  const cancelReminder = async (reminder: IReminder) => {
    if (!reminder.jobId) return;
    const response = await remindersService.cancelReminder(reminder.jobId);
    if (response.status === 200) {
      setReminders(
        reminders.filter(
          (reminder: IReminder) => reminder.jobId !== reminder.jobId
        )
      );
    }
  };

  const getTimeRemaining = (endDate: Date) => {
    const total = new Date(endDate).getTime() - new Date().getTime();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  };
  return (
    <div className="">
      <div className="grid grid-cols-5 pl-4 m-0.5 p-2">
        <div className="col-span-2  text-sm">Event ID</div>
        <div className="col-span-1 text-sm">Event Title</div>
        <div className="col-span-1 text-sm">Event Due Date</div>
        <div className="col-span-1 text-sm">Reminder Time</div>
      </div>
      {reminders.map((reminder: IReminder) => {
        const timeRemaining = getTimeRemaining(reminder.eventSchedule);
        const isPast = timeRemaining.total < 0;
        const eventDate = new Date(reminder.eventSchedule);
        return (
          <div
            key={reminder.jobId}
            className="grid grid-cols-5  bg-gray-500 w-full rounded-md p-2 pl-4 items-center m-0.5"
          >
            <div className="col-span-2 text-sm overflow-clip pr-12 overflow-ellipsis  text-white">
              {reminder.eventId}
            </div>
            <div className="col-span-1 text-sm text-white">
              {reminder.title}
            </div>
            <div className="col-span-1 text-sm text-white">
              {eventDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
              <br />
              <div className="pl-5">
                {eventDate.toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
            </div>
            <div className="col-span-1 text-sm text-white">
              {`${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m`}
              <br />
              <div className="pl-5">
                {new Date(reminder.reminderTime).toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
            </div>
            <IconButton
              SvgIcon={CrossSvg}
              onClickCb={async () => {
                cancelReminder(reminder);
              }}
            ></IconButton>
          </div>
        );
      })}
    </div>
  );
}
