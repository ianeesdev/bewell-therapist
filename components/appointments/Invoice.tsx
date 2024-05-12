// Invoice.tsx
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface InvoiceProps {
  doctor: string;
  specialty: string;
  location: string;
  patientName: string;
  phoneNumber: string;
  appointmentDate: string;
  appointmentTime: string;
  fee: number;
}

const Invoice: React.FC<InvoiceProps> = ({
  doctor,
  specialty,
  location,
  patientName,
  phoneNumber,
  appointmentDate,
  appointmentTime,
  fee,
}) => {
  return (
    <div className="border-[1px] border-gray-300 p-12 rounded-3xl">
      <h1 className="text-3xl font-bold text-center">Invoice</h1>
      <div className="bg-white shadow-xl py-10 rounded-2xl w-[30rem]">
        <div className="flex justify-center items-center pb-4 border-b border-gray-200">
          <div className="flex flex-col items-center justify-center gap-3">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="text-2xl font-semibold">{doctor}</p>
              <p className="text-md text-faded">
                {specialty}, {location}
              </p>
            </div>
          </div>
        </div>
        <div className="px-5">
          <div className="flex justify-between">
            <div className="py-4">
              <p className="text-faded text-sm">Name</p>
              <p className="text-lg">{patientName}</p>
            </div>
            <div className="py-4">
              <p className="text-faded text-sm">Phone Number</p>
              <p className="text-lg">{phoneNumber}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="py-4">
              <p className="text-faded text-sm">Appointment Time</p>
              <p className="text-lg">
                {appointmentDate} on {appointmentTime}{" "}
              </p>
            </div>
            <div className="py-4">
              <p className="text-faded text-sm">Fee</p>
              <p className="text-lg font-bold text-deepAqua">
                ${fee.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="border-2 my-10 border-dashed"></div>
      </div>
    </div>
  );
};

export default Invoice;
