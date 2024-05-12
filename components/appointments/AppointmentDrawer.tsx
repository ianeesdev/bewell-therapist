import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { Calendar } from "@/components/ui/calendar";
import InputField from "../common/InputField";
import Button from "../common/Button";

interface AppointmentDrawerProps {
  onClose: () => void;
}

const AppointmentDrawer: React.FC<AppointmentDrawerProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const hoursArray = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
  ];

  useEffect(() => {
    // Add event listener when component mounts to disable scrolling on the body
    document.body.style.overflow = "hidden";

    // Clean up function to remove event listener when component unmounts
    return () => {
      document.body.style.overflow = ""; // Re-enable scrolling when component unmounts
    };
  }, []); // Run this effect only once when component mounts

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add your logic to handle form submission here
    console.log("Name:", name);
    console.log("Email:", email);
    // Reset form fields
    setName("");
    setEmail("");
    // Close the drawer
    onClose();
  };

  return (
    <div className="relative">
      <div className="fixed top-0 right-0 bottom-0 left-0 z-50 bg-black opacity-50"></div>
      <div className="fixed top-0 right-0 bottom-0 z-50 w-[40%] p-8 shadow-sm bg-white">
        <div className="rounded-full drop-shadow-md p-1 bg-white absolute">
          <RxCross2 onClick={onClose} size={25} className="cursor-pointer" />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Book Appointment
        </h2>

        <div className="flex flex-col gap-5 mt-10">
          <h1 className="text-main font-semibold text-2xl">Schedule</h1>
          <div className="flex gap-10 items-center justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />

            <div className="flex gap-4 flex-wrap">
              {hoursArray.map((hour, index) => (
                <div
                  key={index}
                  className="border-gray-300 border-[1px] w-[7rem] p-2 text-center rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  {hour}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-main font-semibold text-2xl">
              Personal Details
            </h1>
            <p className="text-faded">
              We share this information with the therapist only.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-5"
          >
            <InputField
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <InputField
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
              type="text"
              placeholder="Phone Number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="self-center">
              <Button type="submit" variant="primary">
                Proceed to Payment
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDrawer;
