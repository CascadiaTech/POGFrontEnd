import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
export default function HeaderComponent() {
  return (
    <>
      <nav className="transition-all duration-700 px-2 sm:px-4 bg-none mt-3 pt-3 -my-10 sm:my-0 w-full fixed z-20 top-0">
        <div
          className={`flex flex-row justify-center text-center 
            h-fit transition-all duration-300`}
        >
          <ul
            style={{ fontFamily: "Gotham-Ultra" }}
            className={`${styles.nav} text-md self-center mr-10 px-2 py-2`}
          >
            <li
              className=" border-gray-300"
              style={{ fontFamily: "Gotham-Ultra", color: '#c078ff' }}
            >
              <Link href={"/"}>Dashboard</Link>
            </li>
            <li
              className=" border-gray-300 my-2 sm:my-2 md:my-0"
              style={{ fontFamily: "Gotham-Ultra", color: '#c078ff' }}
            >
              <Link href={"/Swap"}>POG Time</Link>
            </li>
            <li
              className=" border-gray-300"
              style={{ fontFamily: "Gotham-Ultra", color: '#c078ff' }}
            >
              <Link href={"/ClaimPage"}>Claim Time</Link>
            </li>
          </ul>
          <div
            style={{ fontFamily: "Gotham-Ultra" }}
            className={"py-0 self-center"}
          >
            <ConnectButton />
          </div>
        </div>

        <div className="w-fit h-fit text-center mt-2  mx-auto justify-center py-2 "></div>
        <div
          className="justify-left  self-center items-left text-left w-full flex h-fit w-auto order-1"
          id="navbar-sticky"
        >
          <ul className="h-auto flex flex-row justify-left self-center sm:my-0 text-left items-left p-4 mt-4 rounded-lg md:mt-0 md:text-md ">
            <div
              className={
                " flex flex-row top-0 left-0 absolute self-center mt-4 md:px-4 lg:px-4 "
              }
            ></div>

            <ul
              className={
                "text-xl flex flex-row text-center translate-x-5 md:-translate-x-5 z-30 absolute mt-14 mt-5 top-0 right-0 overflow-hidden rounded-lg"
              }
            >
              <div className="flex transition-all flex-col items-center ">
                <div className={"flex flex-row"}></div>
              </div>
            </ul>
          </ul>
        </div>
      </nav>
    </>
  );
}
/*
                  <div
                    onClick={() => Onclick()}
                    className="bg-purplegif hover:animate-wiggle rounded-full w-fit px-2"
                    ref={headerRef}
                  >
                    <Image
                      className={`${hidden.toString()} text-black transition-all duration-300 cursor-pointer`}
                      height={35}
                      width={35}
                      src={logo}
                      alt={"logo"}
                    />
                  </div>
           <div
                  style={{ backgroundColor: "#131313", width: 160 }}
                  className={`w-fit h-fit opacity-${hidden.hidden} transition-all duration-300`}
                >
                  {hidden.hidden === 0 ? null : (
                    <ul
                    style={{ fontFamily: "Gotham-Ultra" }}
                      className="text-xl  text-white rounded-xl px-2 py-2"
                    >
                      <li
                        className="pt-1 hover:border-b-2 border-gray-300 text-[16px]"
                        style={{ fontFamily: "Gotham-Ultra" }}
                      >
                        <Link href={"/"}>Dashboard</Link>
                      </li>
                      <li
                        className="pt-1 hover:border-b-2 border-gray-300 text-[16px]"
                        style={{ fontFamily: "Gotham-Ultra" }}
                      >
                        <Link href={"/Swap"}>Pluto-Swap</Link>
                      </li>
                      <li>
                        <a
                          onClick={() =>
                            window.open("https://www.google.com/")
                          }
                          className=" cursor-pointer block px-4 pt-2 hover:border-b-2 border-gray-300 text-[16px]"
                          style={{ fontFamily: "Gotham-Ultra" }}
                        >
                          Website
                        </a>
                      </li>
                    </ul>
                  )}
                </div>

*/
