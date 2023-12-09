"use client";

import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ReactEventHandler, useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import menu from "@/assets/icons/menu.png";
import axios from "axios";
import { User } from "@/types";

export default function Header() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<string, any> | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [owners, setOwners] = useState<Set<string>>(new Set([]));

  const departments = [
    "شبكة إطفاء الحريق",
    "شبكة انذار الحريق",
    "أجهزة إطفاء الحريق",
    "مبنى إدارة القطاع",
    "مبنى معهد القاهرة",
    "ملحق معهد القاهرة",
    "مبنى أكسيد",
    "مبنى الشئون القانونية والديزل",
    "مبنى رعد",
    "مبنى الاستراحة",
    "نادى الاتصالات",
    "معهد اقليمى الإسكندرية",
    "معهد اقليمى برج العرب",
    "معهد اقليمى طنطا",
    "معهد اقليمى الزقازيق",
    "معهد اقليمى الإسماعيلية",
    "معهد اقليمى المنصورة",
    "معهد اقليمى جمصة",
    "معهد اقليمى المنيا",
    "معهد اقليمى سوهاج",
    "معهد اقليمى قنا",
    "المستندات",
  ];

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("/api/users");
        const users = await res.data;
        const owners: User[] = users.filter((user: User) =>
          user.hasOwnProperty("role")
        );

        owners.map((owner) => {
          setOwners((prev) => new Set([...prev, owner.email]));
        });
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
  }, []);

  console.log(session?.user);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();

    if (window.innerWidth <= 1024) setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleClick = (e: any) => {
      if (e.target.id === "overlay") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <aside
        className={`absolute min-w-[300px] top-0 bg-primary text-white h-screen p-4 transition-all z-[999] ${
          isMenuOpen ? "right-0" : "-right-[300px]"
        }`}
        id="test"
      >
        {/* Logo */}
        <h1 className="mb-4 text-center">
          <Link className="btn btn-ghost text-lg" href={"/"}>
            قطاع التدريب والتطوير
            {logo && <Image src={logo} width={40} height={40} alt="logo" />}
          </Link>
        </h1>
        {/* Owner or Not */}
        {Array.from(owners).find((owner) => {
          return session?.user?.email === owner;
        }) && (
          <button className="text-xl bg-white text-primary p-4 rounded-lg hover:bg-opacity-70 transition-all duration-300">
            اكتب تقرير
          </button>
        )}
        {/* Utils */}
        <div className="utils">
          <div className="flex-1 gap-6">
            <div className="w-fit rounded-full">
              {session?.user?.toString().split(" ")[0] ? (
                <div
                  onClick={() => signOut()}
                  className="flex items-center gap-2 py-2 px-4 rounded-xl cursor-pointer btn-ghost mt-8"
                >
                  <div className="avatar online">
                    <Image
                      src={session?.user?.image || ""}
                      className="rounded-full"
                      width={32.5}
                      height={32.5}
                      alt="User Logo"
                    />
                  </div>
                  <h3>{session?.user?.name?.split(" ")[0]}</h3>
                </div>
              ) : (
                <div
                  onClick={() => signIn()}
                  className="flex items-center cursor-pointer btn-ghost rounded-xl w-fit pl-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12 rounded-full p-2 mr-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  <span>تسجيل دخول</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Mobile Toggle Menu Icon */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-[50px] h-[50px] rounded-full rounded-tr-none rounded-br-none absolute z-10 top-[15%] bg-primary -left-[40px] flex items-center justify-center hover:opacity-70 transition-all duration-300"
        >
          <Image
            className="invert animate-pulse"
            src={menu}
            width={30}
            height={30}
            alt="menu-icon"
          />
        </button>
      </aside>
      <div
        id="overlay"
        className={`fixed inset-0 bg-black transition-all ${
          isMenuOpen ? "bg-opacity-60 z-10" : "bg-opacity-0 z-0"
        }`}
      ></div>
    </>
  );
}
