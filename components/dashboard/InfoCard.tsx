import React from "react";
import AppointmentSvg from "../svgs/AppointmentSvg";
import UpcomingSvg from "../svgs/UpcomingSvg";

interface InfoCardProps {
  name: string;
  number: number;
  bgColor: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ name, number, bgColor }) => {
  return (
    <div
      className="w-full p-6 shadow-lg rounded-xl flex flex-col gap-5"
      style={{ background: bgColor }}
    >
      <div className="flex flex-col gap-2">
        {name === "Appointments" ? <AppointmentSvg /> : <UpcomingSvg />}
        <p className="font-semibold text-[21px]">{name}</p>
      </div>
      <p className="ps-1 font-medium text-[19px]">{number}</p>
    </div>
  );
};

export default InfoCard;
