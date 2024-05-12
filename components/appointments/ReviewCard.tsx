import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ReviewCardProps {
  clientName: string;
  review: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ clientName, review }) => {
  return (
    <div className="bg-white p-6 drop-shadow-lg rounded-xl flex flex-col gap-5">
      <div className="flex items-center gap-5">
        <Avatar className="h-16 w-16">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-xl font-medium">{clientName}</p>
      </div>
      <div>
        <p className="text-md">{review} </p>
      </div>
    </div>
  );
};

export default ReviewCard;
