import Link from "next/link";
import React from "react";
import { LuUser2 } from "react-icons/lu";
import { CgLogOut } from "react-icons/cg";
import { usePathname } from "next/navigation";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "../../app/redux/features/auth/authSlice";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const menus = [
    { title: "Dashboard", path: "/" },
    { title: "Appointments", path: "/appointment" },
  ];

  const pathname = usePathname();

  const onLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <div className="bg-lilacWhite w-full flex justify-between items-center p-8 rounded-md">
      {/* <h1 className="text-deepAqua font-bold text-3xl">App Logo Here</h1> */}
      <Image src="/logo.png" width={120} height={120} alt="logo" />

      <div className="flex gap-10">
        {menus.map((menu, index) => (
          <Link
            href={menu.path}
            key={index}
            className={`text-lg ${
              pathname === menu.path
                ? "text-deepAqua font-semibold"
                : "text-faded"
            }`}
          >
            {menu.title}
          </Link>
        ))}
      </div>

      <div className="flex gap-4 items-center bg-aqua p-4 rounded-full cursor-pointer" onClick={onLogout}>
        {/* <p className="text-lg text-black font-medium">Anees</p> */}
        <CgLogOut size={26} className="text-deepAqua" />
      </div>
    </div>
  );
};

export default Navbar;
