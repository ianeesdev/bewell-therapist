"use client";

import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const { therapist } = useSelector((state: any) => state.auth);

  useEffect(() => {

    if (!therapist?.isLoggedIn) {
      router.push("/auth/login");
    } 
  }, []);
  return <div className="bg-red-400">Therapist Dashboard</div>;
}
