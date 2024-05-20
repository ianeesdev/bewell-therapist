"use client";

import React, { useState, useEffect } from "react";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";

import Image from "next/image";
import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { register, reset } from "../../../redux/features/auth/authSlice";
import Popup from "@/components/common/Popup";

export default function Page() {
  const [showPopup, setShowPopup] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  // New state variables for document uploads
  const [educationCertificates, setEducationCertificates] = useState([]);
  const [professionalLicense, setProfessionalLicense] = useState(null);
  const [professionalMemberships, setProfessionalMemberships] = useState([]);
  const [experienceCertificates, setExperienceCertificates] = useState([]);
  const [criminalRecordCheck, setCriminalRecordCheck] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert("Error");
    }

    if (isSuccess) {
      setShowPopup(true);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, router, dispatch]);

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (password !== password2) {
      alert("Passwords do not match");
    } else {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("cnic", cnic);

      // Append multiple files for educationCertificates
      if (educationCertificates && educationCertificates.length > 0) {
        Array.from(educationCertificates).forEach((file, index) => {
          formData.append(`educationCertificates`, file);
        });
      }

      // Append single file for professionalLicense
      if (professionalLicense) {
        formData.append("professionalLicense", professionalLicense);
      }

      // Append multiple files for professionalMemberships
      if (professionalMemberships && professionalMemberships.length > 0) {
        Array.from(professionalMemberships).forEach((file, index) => {
          formData.append(`professionalMemberships`, file);
        });
      }

      // Append multiple files for experienceCertificates
      if (experienceCertificates && experienceCertificates.length > 0) {
        Array.from(experienceCertificates).forEach((file, index) => {
          formData.append(`experienceCertificates`, file);
        });
      }

      // Append single file for criminalRecordCheck
      if (criminalRecordCheck) {
        formData.append("criminalRecordCheck", criminalRecordCheck);
      }

      // Log the FormData object before dispatching
      console.log("Form Data:", formData);

      // Dispatch the form data to the backend
      dispatch(register(formData));
    }
  };

  return (
    <div className="bg-lilacWhite w-full flex justify-center items-start">
      <div className="pt-[9rem] pb-[4rem] h-screen overflow-y-auto bg-white flex flex-col justify-start w-1/2">
        <Image
          src="/logo.png"
          className="p-14 absolute top-0"
          width={230}
          height={230}
          alt="logo"
        />
        <div className="w-[50%] mx-auto flex flex-col gap-12">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl text-main font-semibold">
              Register as Therapist
            </h2>
            <Link
              href={"/auth/login"}
              className="text-lg text-deepAqua font-medium"
            >
              Login
            </Link>
          </div>
          <div>
            <form onSubmit={onSubmit} className="flex flex-col gap-7">
              <InputField
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <InputField
                type="text"
                placeholder="CNIC"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
              />
              <InputField
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputField
                type="password"
                placeholder="Confirm Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />

              {/* New fields for document uploads */}
              <label className="text-lg font-medium -mb-5">
                Educational Certificates
              </label>
              <InputField
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setEducationCertificates(e.target.files)}
                multiple
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                required
              />
              <label className="text-lg font-medium -mb-5">
                Professional License
              </label>
              <InputField
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setProfessionalLicense(e.target.files[0])}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                required
              />
              <label className="text-lg font-medium -mb-5">
                Professional Memberships
              </label>
              <InputField
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setProfessionalMemberships(e.target.files)}
                multiple
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                required
              />
              <label className="text-lg font-medium -mb-5">
                Experience Certificates
              </label>
              <InputField
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setExperienceCertificates(e.target.files)}
                multiple
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                required
              />
              <label className="text-lg font-medium -mb-5">
                Criminal Record Check
              </label>
              <InputField
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setCriminalRecordCheck(e.target.files[0])}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                required
              />

              <Button type="submit">
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="p-[5rem] pt-[9rem] text-center w-[75%] mx-auto space-y-3">
          <h1 className="font-bold text-main text-3xl">
            Create an account and get started!
          </h1>
          <p className="text-main font-medium text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae{" "}
          </p>
        </div>
        <div>
          <Image
            src="/vector.png"
            width={550}
            height={550}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
      </div>
      {showPopup && <Popup />}
    </div>
  );
}
