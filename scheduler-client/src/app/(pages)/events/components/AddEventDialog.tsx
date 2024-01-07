import React, { useState } from "react";
import { EventForm } from "@/app/(pages)/dashboard/components/AddEventForm/EventForm";
import { CrossSvg } from "../../../global-components/buttons/svgs/SvgIcons";
import WideButton from "@/app/global-components/buttons/WideButton";
import { IconButton } from "@/app/global-components/buttons/IconButton";
import { IEvent } from "scheduler-shared/models/Event.models";

interface FormDialogProps {
  isOpen: boolean;
  onClose: (event?: IEvent) => void;
}

const AddEventDialog: React.FC<FormDialogProps> = ({ isOpen, onClose }) => {
  const [event, setEvent] = useState<IEvent>();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0  transform translate  bg-opacity-70 bg-gray-800 overflow-y-auto h-full w-full  ">
      <div className="relative flex  top-20 ease-in-out duration-200 transition-opacity  mx-auto p-5 border w-1/2 justify-center shadow-lg rounded-md bg-white">
        <EventForm onEventCreated={onClose} />
        <div className="absolute right-0 top-0 p-5 scale-150">
          <IconButton
            SvgIcon={() => CrossSvg({ iconColor: "text-red-400" })}
            onClickCb={() => onClose(event)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddEventDialog;
