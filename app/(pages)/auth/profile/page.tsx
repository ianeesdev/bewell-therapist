"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import Button from "@/components/common/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import InputField from "@/components/common/InputField";
import { saveProfile } from "../../../redux/features/auth/authSlice";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [location, setLocation] = useState("");
  const [totalPatients, setTotalPatients] = useState("");
  const [experience, setExperience] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  const { therapist, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess && therapist?.onboarded) {
      router.push("/appointment");
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
    };

    dispatch(saveProfile(profileData));
  };

  return (
    <div className="bg-lilacWhite">
        <Image src="/logo.png" className="p-14 absolute top-0" width={230} height={230} alt="logo" />
      <div className="bg-white mt-[9rem]">
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

            <div>
              <InputField
                type="text"
                placeholder="About"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <div className="text-center">
              <Button type="submit" className="px-10">
                Save and Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
