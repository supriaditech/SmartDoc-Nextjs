/* eslint-disable @typescript-eslint/no-explicit-any */
import Head from "next/head";
import React, { useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineUser } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface StickyNavbarProps {
  title: string;
  children: React.ReactNode;
}

function StickyNavbar({ children, title }: StickyNavbarProps) {
  const { data: session } = useSession() as { data: any };
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const router = useRouter();

  const navItems = [
    { id: "beranda", label: "Beranda", path: "/" },
    { id: "riwayatAbsen", label: "Riwayat Absensi", path: "/riwayat-absensi" },
    {
      id: "riwayatGaji",
      label: "Riwayat Gaji",
      path: "/riwayat-gaji-karyawan",
    },
    { id: "profile", label: "Profil", path: "/profile" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navItems.map((item) => (
        <Typography
          as="li"
          className={`text-black text-sm text-tertiary font-semibold py-2 px-4 rounded-none border-b border-transparent ${
            isActive(item.path)
              ? "bg-transparent  bg-green-600 rounded-lg text-white"
              : "hover:bg-transparent hover:text-green-600 hover:border-green-500 text-black"
          }`}
          key={item.id}
        >
          <Link href={item.path} className="flex items-center">
            {item.label}
          </Link>
        </Typography>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
      </Head>

      {/* Navbar */}
      <Navbar className="sticky top-0 z-50 h-max max-w-full mx-auto rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900 max-w-7xl mx-auto md:px-12">
          <Typography
            as="a"
            href={`/`}
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            <Image
              src="/assets/logo/Logo.png"
              alt="Logo"
              width={160}
              height={48}
              priority
            />
          </Typography>
          <div className="lg:flex mr-4 hidden">{navList}</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-x-1">
              {session?.user ? (
                <div className="relative flex justify-center items-center ml-2">
                  <button
                    className="ml-2 flex justify-center items-center gap-2 md:gap-4"
                    onClick={toggleMenu}
                  >
                    <HiOutlineUser className="w-6 h-6" />

                    {session?.user?.name}
                  </button>
                  {isMenuOpen && (
                    <ul
                      role="menu"
                      data-popover="menu-1"
                      data-popover-placement="bottom"
                      className="absolute z-10 top-10 right-0 w-40 overflow-auto rounded-md border border-blue-gray-50 bg-white p-2 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
                    >
                      <Link href={"/profile"}>
                        <li
                          role="menuitem"
                          className="flex w-full cursor-pointer select-none gap-2 items-center rounded-md px-2 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                        >
                          <HiOutlineUser className="w-6 h-6" /> Profile
                        </li>
                      </Link>
                      <li
                        role="menuitem"
                        className="flex w-full cursor-pointer select-none gap-2 items-center rounded-md px-2 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-red-700 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 text-red-500"
                        onClick={() =>
                          toast.promise(
                            new Promise<void>((resolve, reject) => {
                              try {
                                handleLogout();
                                resolve();
                              } catch (error) {
                                reject(error);
                              }
                            }),
                            {
                              success: "Logged out. Redirecting...",
                              pending: "Logging out...",
                              error: "Log out failed.",
                            }
                          )
                        }
                      >
                        <MdLogout className="w-6 h-6 text-red-500" /> Logout
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <div className="hidden items-center  -mr-3  gap-x-1 lg:flex">
                  <Link href={`/login`}>
                    <Button
                      size="sm"
                      className="bg-transparent rounded-none shadow-none hidden lg:inline-block border-b border-transparent hover:border-b-1 hover:shadow-none hover:border-red-500"
                    >
                      <Typography className="text-sm text-tertiary font-semibold normal-case">
                        Log In
                      </Typography>
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center justify-between text-gray-700 w-full">
            {!session?.user && (
              <Link href={`login`} className="w-full">
                <Button
                  size="sm"
                  className="bg-transparent w-full shadow-none inline-block bg-gray-300 rounded-md text-gray-700 border-b border-transparent hover:border-b-1 hover:shadow-none hover:border-red-500"
                >
                  <Typography className="text-sm text-tertiary font-semibold normal-case">
                    Log In
                  </Typography>
                </Button>
              </Link>
            )}
          </div>
        </Collapse>
      </Navbar>

      {/* Konten Utama */}
      <main className="flex-grow">{children}</main>

      {/* Footer tetap di bawah dengan Flexbox */}
      <footer className="w-full text-center text-gray-600 py-4 bg-white">
        <p className="mb-2">© 2024 Tempat Belajar. All Rights Reserved.</p>
        <div className="flex justify-center gap-4">
          <a href="/privacy-policy" className="hover:underline">
            Kebijakan Privasi
          </a>
          <a href="/terms-of-service" className="hover:underline">
            Ketentuan Layanan
          </a>
          <a href="/contact" className="hover:underline">
            Hubungi Kami
          </a>
        </div>
      </footer>
    </div>
  );
}

export default StickyNavbar;
