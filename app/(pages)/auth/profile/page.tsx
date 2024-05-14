"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import Button from "@/components/common/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import InputField from "@/components/common/InputField";
import { saveProfile } from "../../../redux/features/auth/authSlice";
import Image from "next/image";
import Navbar from "@/components/common/Navbar";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { therapist, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );

  const [name, setName] = useState(therapist?.name || "");
  const [about, setAbout] = useState(therapist?.about || "");
  const [speciality, setSpeciality] = useState(therapist?.speciality || "");
  const [location, setLocation] = useState(therapist?.location || "");
  const [totalPatients, setTotalPatients] = useState(
    therapist?.totalPatients || ""
  );
  const [experience, setExperience] = useState(therapist?.experience || "");
  const [hourlyRate, setHourlyRate] = useState(therapist?.hourlyRate || "");
  const [stripeId, setStripeId] = useState(therapist?.stripeId || "");
  const [cardNumber, setCardNumber] = useState(therapist?.cardNumber || "");

  useEffect(() => {
    if (isError) {
      alert(message);
    }
  }, [therapist, isError, isSuccess, message, router, dispatch]);

  const onSubmit = (event: any) => {
    event.preventDefault();
    const therapistId = therapist?._id;
    const profileData = {
      therapistId,
      name,
      about,
      speciality,
      location,
      totalPatients,
      experience,
      hourlyRate,
      stripeId,
      cardNumber,
    };

    dispatch(saveProfile(profileData));
  };

  return (
    <div>
      {therapist?.onboarded && (
        <div className="p-3">
          <Navbar />
        </div>
      )}

      <div className="bg-lilacWhite">
        {!therapist?.onboarded && (
          <Image
            src="/logo.png"
            className="p-14 absolute top-0"
            width={230}
            height={230}
            alt="logo"
          />
        )}

        <div
          className={`bg-white ${
            therapist?.onboarded ? "mt-[3.5rem]" : "mt-[9rem]"
          }`}
        >
          <div className="w-[50%] mx-auto flex flex-col justify-center items-center gap-10">
            <h1 className="text-2xl font-semibold">Setup your profile</h1>
            <form
              onSubmit={onSubmit}
              className="border-2 border-gray-200 rounded-2xl w-full p-10 flex flex-col gap-9"
            >
              <div className="flex justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex gap-8 items-center">
                <InputField
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <InputField
                  type="text"
                  placeholder="Speciality"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                />
              </div>

              <div className="flex gap-8 items-center">
                <InputField
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <InputField
                  type="text"
                  placeholder="Experience in years"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>
              <div className="flex gap-8 items-center">
                <InputField
                  type="text"
                  placeholder="Total Patients"
                  value={totalPatients}
                  onChange={(e) => setTotalPatients(e.target.value)}
                />
                <InputField
                  type="text"
                  placeholder="Hourly Rate"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                />
              </div>
              <div className="flex gap-8 items-center">
                <InputField
                  type="text"
                  placeholder="Stripe Id"
                  value={stripeId}
                  onChange={(e) => setStripeId(e.target.value)}
                />
                <InputField
                  type="text"
                  placeholder="Credit/Debit Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>

              <div>
                <InputField
                  type="text"
                  placeholder="About"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              <div className="text-center">
                {isSuccess ? (
                  <Button
                    type="button"
                    className="px-10"
                    onClick={() => router.push("/")}
                  >
                    Homepage
                  </Button>
                ) : (
                  <div className="space-x-4">
                    <Button type="submit" className="px-10">
                      Save and Continue
                    </Button>
                    <Button variant="tertiary" type="button" className="rounded-full px-10">
                      <Link href={`/therapist/profile`}>View As</Link>
                    </Button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
