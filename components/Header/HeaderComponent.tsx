import React, { useEffect, useRef, useState } from "react";
//import Image from "next/image";
import Link from "next/link";
import Image from "next/image";
import LinqLogo from "../../assets/images/LinqLogo.png";
import MENUBar from "../../assets/images/menuBars.png";
import LINQLogo from "../../assets/images/logoNew.png";

import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
export default function HeaderComponent() {
  const headerRef = useRef<any>(null);
  const [hidden, setHidden] = useState({ hidden: 0, rotate: 0 });

  const [homepagestyle, setHomepageStyle] = useState(false);
  function Onclick() {
    if (hidden.hidden == 0 && hidden.rotate == 0) {
      setHidden({ hidden: 100, rotate: 90 });
    } else {
      setHidden({ hidden: 0, rotate: 0 });
    }
  }
  function OnOffClick() {
    if (router.pathname != "/" && !headerRef?.current.contains(event?.target)) {
      // Clicked outside the header, so close it
      setHidden({ hidden: 0, rotate: 0 });
    }
  }

  // const chains = [arbitrum, mainnet, polygon]
  const projectId = "e860804a2106941d3e0efee245ad7d7a";

  const router = useRouter();

  useEffect(() => {
    if (router.pathname == "/Main/EntryPage") {
      setHomepageStyle(true);
    } else {
      setHomepageStyle(false);
    }
  }, [router.pathname]);

  return (
    <>
      <nav className="px-2 sm:px-4 bg-none py-2 mt-1 -my-10 sm:my-0 sm:py-2 w-full fixed z-20 top-0">
        <div className="w-fit h-fit text-center mt-2  mx-auto justify-center py-2 ">
          <ConnectButton />
        </div>
        <div
          className="justify-left  self-center items-left text-left w-full flex h-fit w-auto order-1"
          id="navbar-sticky"
        >
          <ul className="h-auto  flex flex-row justify-left self-center sm:my-0 text-left items-left p-4 mt-4 rounded-lg md:mt-0 md:text-md ">
            <div
              className={
                " flex flex-row top-0 left-0 absolute self-center mt-4 md:px-4 lg:px-4 "
              }
            >
              <li className={"self-center  md:mt-0 lg:mt-0 "}>
                {" "}
                <Image
                  className="self-center "
                  width={50}
                  height={50}
                  src={LINQLogo}
                  alt="asa"
                ></Image>
              </li>
            </div>

            <ul
              className={
                "text-xl flex flex-row text-center translate-x-5 md:-translate-x-5 z-30 absolute mt-14 mt-5 top-0 right-0 overflow-hidden rounded-lg"
              }
            >
              <div className="flex transition-all flex-col items-center ">
                <div className={"flex flex-row"}>
                  <div
                    onClick={() => Onclick()}
                    className="bg-purplegif rounded-full w-fit px-2"
                    ref={headerRef}
                  >
                    <Image
                      className={`${hidden.toString()} text-black transition-all duration-300 cursor-pointer`}
                      height={35}
                      width={35}
                      src={MENUBar}
                      alt={""}
                    />
                  </div>
                </div>

                <div
                  style={{ backgroundColor: "#131313",  width: 160 }}
                  className={`w-fit h-fit opacity-${hidden.hidden} transition-all duration-300`}
                >
                  {hidden.hidden === 0 ? null : ( // Check if the menu is closed // Render nothing when the menu is closed
                    <ul
                      style={{
                        fontFamily: "Mandalore",
                      }}
                      className="text-xl  text-white rounded-xl px-2 py-2"
                    >
                      <li
                        className="pt-1 hover:border-b-2 border-gray-300 text-[16px]"
                        style={{ fontFamily: "Azonix" }}
                      >
                        <Link href={"/"}>Dashboard</Link>
                      </li>
                      <li
                        className="pt-1 hover:border-b-2 border-gray-300 text-[16px]"
                        style={{ fontFamily: "Azonix" }}
                      >
                        <Link href={"/ClaimPage"}>LP Claim</Link>
                      </li>
                      <li
                        style={{ fontFamily: "Azonix" }}
                        className="pt-1 hover:border-b-2 border-gray-300 text-[16px]"
                      >
                        <Link href={"/Dapp/LPstakingpage"}>LP StaQing</Link>
                      </li>
                      <li
                        style={{ fontFamily: "Azonix" }}
                        className="pt-1 hover:border-b-2 border-gray-300 text-[16px]"
                      >
                        <Link href={"/LPMarketplace"}>LP Market</Link>
                      </li>
                      <li
                        style={{ fontFamily: "Azonix" }}
                        className="pt-1 hover:border-b-2 border-gray-300 text-[16px]"
                      >
                        <Link href={"/NewStake"}>New Stake</Link>
                      </li>
                      <li
                        className="pt-1 hover:border-b-2 border-gray-300 text-[16px]"
                        style={{ fontFamily: "Azonix" }}
                      >
                        <Link href={"https://linktr.ee/linqgroup"}>
                          Link Tree
                        </Link>
                      </li>
                      <li>
                        <a
                          onClick={() =>
                            window.open("https://www.linqgroup.io/")
                          }
                          className=" cursor-pointer block px-4 pt-2 hover:border-b-2 border-gray-300 text-[16px]"
                          style={{ fontFamily: "Azonix" }}
                        >
                          Website
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </ul>
          </ul>
        </div>
      </nav>
    </>
  );
}
