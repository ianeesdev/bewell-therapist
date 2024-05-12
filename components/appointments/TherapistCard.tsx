import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TbStarHalfFilled } from "react-icons/tb";
import Button from "../common/Button";
import Link from "next/link";

interface TherapistCardProps {
  therapistId: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
}

const TherapistCard: React.FC<TherapistCardProps> = ({
  therapistId,
  name,
  specialty,
  location,
  rating,
}) => {
  return (
    <div className="rounded-3xl overflow-hidden px-5 py-2.5 border-gray-300 border-[1px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xl text-main font-medium">{name}</p>
            <p className="text-[14px] text-faded">{specialty}</p>
            <p className="text-[14px] text-faded">{location}</p>
          </div>
        </div>
        <div>
          <Button variant="tertiary">
            <Link href={`/therapist/profile/?therapistId=${therapistId}`}>View Details</Link>
          </Button>
        </div>
      </div>
      <div className="flex gap-1 items-center px-2 pt-1">
        <TbStarHalfFilled size={25} className="text-seaBlue" />
        <p className="text-seaBlue text-lg">{rating}</p>
      </div>
    </div>
  );
};

export default TherapistCard;
