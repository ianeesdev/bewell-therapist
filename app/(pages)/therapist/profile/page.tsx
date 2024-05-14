"use client";

import React from "react";
import Navbar from "@/components/common/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { GoArrowLeft } from "react-icons/go";
import { TbStarHalfFilled } from "react-icons/tb";
import Button from "@/components/common/Button";
import ReviewCard from "@/components/appointments/ReviewCard";

import Link from "next/link";
import { useSelector } from "react-redux";

export default function Page() {
  const { therapist } = useSelector(
    (state: any) => state.auth
  );

  return (
    <div className="bg-paleGrey relative">
      <div className="p-3">
        <Navbar />
      </div>
      <div className="absolute left-14 mt-6">
        <Link href="/" className="flex gap-2 items-center">
          <GoArrowLeft size={30} />
          <p className="text-xl font-medium">Back</p>
        </Link>
      </div>
      <div className="w-[94%] mx-auto my-[6rem] bg-white flex flex-col gap-14 border-2 p-14 rounded-xl drop-shadow-md">
        <div className="flex flex-col gap-10 border-b-2 border-gray-200 pb-[5rem]">
          <div className="flex items-center gap-5">
            <Avatar className="h-[8rem] w-[8rem]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col gap-3">
                <div>
                  <div className="flex gap-2">
                    <p className="text-2xl text-main font-bold">
                      {therapist?.name}
                    </p>
                    <div className="flex gap-1 items-center">
                      <TbStarHalfFilled size={25} className="text-yellow-300" />
                      <p>4.8 (86 reviews)</p>
                    </div>
                  </div>
                  <p className="text-lg text-faded">
                    {therapist?.specialty}, {therapist?.location}
                  </p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="p-6 drop-shadow-xl bg-paleGrey rounded-xl text-center">
                  <p className="text-4xl text-deepAqua font-bold">
                    {therapist?.totalPatients}+
                  </p>
                  <p className="text-faded text-md">Patients</p>
                </div>
                <div className="p-6 drop-shadow-xl bg-paleGrey rounded-xl text-center">
                  <p className="text-4xl text-deepAqua font-bold">
                    {therapist?.experience}+
                  </p>
                  <p className="text-faded text-md">Exp. Years</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="w-full flex flex-col gap-3">
              <h2 className="text-xl font-semibold">About Therapist</h2>
              <p className="w-[70%]">{therapist?.about}</p>
            </div>
            <div className="w-full flex justify-end">
              <div className="p-6 drop-shadow-xl bg-paleGrey rounded-xl flex items-center gap-10">
                <div>
                  <p className="text-faded text-md">Price</p>
                  <p className="text-3xl font-regular text-main">
                    <span className="font-bold">${therapist?.hourlyRate}/</span>
                    hour
                  </p>
                </div>
                <div>
                  <Button
                    variant="primary"
                    className="text-md py-3 px-7"
          
                  >
                    Book Appointment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <h1 className="font-semibold text-4xl text-main">Reviews</h1>
          <div className="grid grid-cols-2 gap-8">
            <ReviewCard
              clientName="Fahad Ishaq"
              review="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus est nibh, tempus ac nunc non, suscipit ultrices dolor. Curabitur quis sapien nec erat bibendum egestas. Nam cursus Curabitur quis sapien nec erat bibendum egestas. Nam cursus "
            />

            <ReviewCard
              clientName="Fahad Ishaq"
              review="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus est nibh, tempus ac nunc non, suscipit ultrices dolor. Curabitur quis sapien nec erat bibendum egestas. Nam cursus Curabitur quis sapien nec erat bibendum egestas. Nam cursus "
            />
            <ReviewCard
              clientName="Fahad Ishaq"
              review="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus est nibh, tempus ac nunc non, suscipit ultrices dolor. Curabitur quis sapien nec erat bibendum egestas. Nam cursus Curabitur quis sapien nec erat bibendum egestas. Nam cursus "
            />
            <ReviewCard
              clientName="Fahad Ishaq"
              review="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus est nibh, tempus ac nunc non, suscipit ultrices dolor. Curabitur quis sapien nec erat bibendum egestas. Nam cursus Curabitur quis sapien nec erat bibendum egestas. Nam cursus "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
