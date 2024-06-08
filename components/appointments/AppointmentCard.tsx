"use client";

import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LuCalendarClock } from "react-icons/lu";
import Button from "../common/Button";
import { useRouter } from "next/navigation";

import { useAppContext } from "../../AppContext";
import { useDispatch, useSelector } from "react-redux";
import { createOrOpenChat } from "../../app/redux/features/chat-app/chatSlice";

interface AppointmentCardProps {
  appointmentId: string
  userID: string;
  name: string;
  appointmentDate: string;
  appointmentTime: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointmentId,
  userID,
  name,
  appointmentDate,
  appointmentTime,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { updateChatValue } = useAppContext();

  const { user } = useSelector((state: any) => state.auth);

  const dateString = appointmentDate;
  const date = new Date(dateString);

  const [showJoinButton, setShowJoinButton] = useState(false);

  useEffect(() => {
    const currentDateTime = new Date();
    if (
      currentDateTime.getFullYear() === date.getFullYear() &&
      currentDateTime.getMonth() === date.getMonth() &&
      currentDateTime.getDate() === date.getDate() &&
      currentDateTime.getHours() === date.getHours() &&
      currentDateTime.getMinutes() === date.getMinutes()
    ) {
      setShowJoinButton(true);
    } else {
      setShowJoinButton(false);
    }
  }, []);

  const dateOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = date.toLocaleString("en-US", dateOptions);
  const formattedTime = date.toLocaleString("en-US", timeOptions);

  const createMeeting = () => {
    const meetingId = crypto.randomUUID();
    router.push(`meeting/${appointmentId}`);
  };

  const openChat = () => {
    updateChatValue(true);
    dispatch(createOrOpenChat({ userId: userID }));
  };

  return (
    <div className="rounded-3xl overflow-hidden px-5 py-2.5 border-gray-300 border-[1px]">
      <div className="flex items-center">
        <div className="flex items-center gap-5 w-[30%]">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xl text-main font-medium">{name}</p>
          </div>
        </div>
        <div className="border-l-2 border-gray-300 flex justify-between items-center px-8 w-[70%] ms-auto">
          <div className="flex items-center gap-2">
            <LuCalendarClock size={30} />
            <div className="text-lg text-main font-medium">
              <p>{formattedDate}</p>
              <p>{formattedTime}</p>
            </div>
          </div>

          <div className="flex gap-4">
            {appointmentTime !== "history" && (
              <Button
                variant="outline"
                className="px-10 py-2"
                onClick={createMeeting}
              >
                Join Now
              </Button>
            )}
            <Button variant="outline" className="px-10 py-2" onClick={openChat}>
              Send Message
            </Button>
            {/* <Button variant="primary" className="px-10 py-2">
              View Details
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
