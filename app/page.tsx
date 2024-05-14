"use client";

import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getAppointments } from "./redux/features/appointments/appointmentSlice";

import Navbar from "@/components/common/Navbar";
import InfoCard from "@/components/dashboard/InfoCard";
import AppointmentCard from "@/components/appointments/AppointmentCard";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { therapist } = useSelector((state: any) => state.auth);
  const { therapistAppointments, isLoading, isError, isSuccess, message } =
    useSelector((state: any) => state.appointments);

  useEffect(() => {
    if (therapist?.isLoggedIn) {
      dispatch(getAppointments(therapist?._id));
    } else router.push("/auth/login");
  }, []);

  return (
    <div>
      <div className="p-3">
        <Navbar />
      </div>

      <div className="container mx-auto mt-14 flex flex-col gap-14">
        <div className="flex justify-between gap-x-14">
          <InfoCard
            name="Appointments"
            number={
              therapistAppointments?.upcoming?.length +
              therapistAppointments?.history.length
            }
            bgColor="linear-gradient(206.14deg, rgba(243, 196, 31, 0.25) 16.46%, rgba(248, 140, 41, 0.25) 122.02%)"
          />
          <InfoCard
            name="Scheduled"
            number={therapistAppointments?.upcoming?.length}
            bgColor="linear-gradient(164.23deg, rgba(29, 108, 134, 0.25) 11.01%, rgba(51, 217, 198, 0.25) 102.9%)"
          />
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="font-semibold text-[28px]">Upcoming Appointments</h1>
          <div>
            {therapistAppointments?.upcoming?.length === 0 ? (
              <p className="text-center">You don’t have any upcoming appointment.</p>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  {therapistAppointments?.upcoming?.map(
                    (appointment: any, index: any) => (
                      <AppointmentCard
                        key={index}
                        appointmentId={appointment?._id}
                        userID={appointment?.userId._id}
                        name={
                          appointment?.userId.name ||
                          appointment?.userId.username
                        }
                        appointmentDate={appointment?.dateTime}
                        appointmentTime={appointment?.dateTime}
                      />
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
