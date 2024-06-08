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
import { toast } from "react-toastify";

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
      toast.error(message);
    }

    if (isSuccess) {
      setShowPopup(true);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, router, dispatch]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!username || !email || !password || !password2 || !cnic) {
      toast.error("All fields are required.");
      return;
    }

    // Check if any required document is missing
    if (!educationCertificates.length) {
      toast.error("Educational Certificates are required.");
      return;
    }
    if (!professionalLicense) {
      toast.error("Professional License is required.");
      return;
    }
    if (!professionalMemberships.length) {
      toast.error("Professional Memberships are required.");
      return;
    }
    if (!experienceCertificates.length) {
      toast.error("Experience Certificates are required.");
      return;
    }
    if (!criminalRecordCheck) {
      toast.error("Criminal Record Check is required.");
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    // Validate password match
    if (password !== password2) {
      toast.error("Passwords do not match.");
      return;
    }

    const formData = new FormData();

    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("cnic", cnic);

    // Append multiple files for educationCertificates
    Array.from(educationCertificates).forEach((file) => {
      formData.append("educationCertificates", file);
    });

    // Append single file for professionalLicense
    if (professionalLicense) {
      formData.append("professionalLicense", professionalLicense);
    }

    // Append multiple files for professionalMemberships
    Array.from(professionalMemberships).forEach((file) => {
      formData.append("professionalMemberships", file);
    });

    // Append multiple files for experienceCertificates
    Array.from(experienceCertificates).forEach((file) => {
      formData.append("experienceCertificates", file);
    });

    // Append single file for criminalRecordCheck
    if (criminalRecordCheck) {
      formData.append("criminalRecordCheck", criminalRecordCheck);
    }

    // Dispatch the form data to the backend
    dispatch(register(formData));
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
                type="number"
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
              />
              <label className="text-lg font-medium -mb-5">
                Professional License
              </label>
              <InputField
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setProfessionalLicense(e.target.files[0])}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
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
              />
              <label className="text-lg font-medium -mb-5">
                Criminal Record Check
              </label>
              <InputField
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setCriminalRecordCheck(e.target.files[0])}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
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
