"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";

const Clock = ({ onLoaded }: { onLoaded: () => void }) => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setDate(new Date());
    }, 1000);
    onLoaded();

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const time = date ? date.toLocaleTimeString("en-US", { hour12: false }) : "";
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const offset = date ? (date.getTimezoneOffset() / -60).toFixed(0) : "";

  const offsetString = `GMT${Number(offset) > 0 ? "+" : ""}${offset}`;
  return date ? (
    <div>
      <h1 className="text-lg ease-in-out text-blue-500 font-extrabold select-none">
        {date.toDateString()}
      </h1>
      <hr className="border-blue-400 w-3/3 my-0 " />
      <div className="flex items-center">
        <h2 className="text-sm text-blue-400 font-extrabold select-none">
          {time}
        </h2>
        <h3 className="text-sm pl-2 text-blue-400 font-extrabold select-none">
          {offsetString} ({timezone})
        </h3>
      </div>
    </div>
  ) : (
    ""
  );
};

export default dynamic(() => Promise.resolve(Clock), { ssr: false });
