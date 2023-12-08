"use client";

import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";

const Logo: StaticImageData = require("@/assets/logo.png");

// Component definition...
export default function Navbar() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []); // Empty dependency array since there are no variables from the component scope used inside useEffect

  return (
    <nav className="navbar bg-white dark:bg-primary text-primary dark:text-white flex-row-reverse">
      <div>
        <Link href={"/"} className="text-base btn btn-ghost">
          <Image src={Logo} width={30} height={30} alt="logo" />
          قطاع التدريب والتطوير
        </Link>
      </div>
      <div className="flex-1 gap-6">
        <ThemeSwitcher />
        <div className="w-fit rounded-full cursor-pointer">
          {session?.user?.toString().split(" ")[0] ? (
            <div onClick={() => signOut()} className="flex items-center gap-2">
              <h3>{session?.user?.name?.split(" ")[0]}</h3>
              <div className="avatar online">
                <Image
                  src={session?.user?.image || ""}
                  className="rounded-full"
                  width={32.5}
                  height={32.5}
                  alt="User Logo"
                />
              </div>
            </div>
          ) : (
            <svg
              onClick={() => signOut()}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          )}
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="ابحث..."
            dir="rtl"
            className="input input-bordered w-24 md:w-auto bg-primary dark:bg-white text-white dark:text-primary placeholder:text-white dark:placeholder:text-primary placeholder:opacity-80"
          />
        </div>
      </div>
    </nav>
  );
}
