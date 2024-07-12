import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useAccount } from "wagmi";
import HeaderComponent from "../components/Header/HeaderComponent";
import { useWalletClient } from "wagmi";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/images/plutoLogo.png"
const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  const { data: walletClient }: any = useWalletClient();

  const videoRefMobile = useRef(null);
  const videoRefNonMobile = useRef(null);
  const [isMobile, setIsMobile] = useState(Boolean);
  const attemptPlay = (videoRef: any) => {
    videoRef && videoRef.current && videoRef.current.defaultMuted == false;
    videoRef.current.load() &&
      videoRef.current.play().catch((error: any) => {
        console.log("error attempting to play", error);
      });
  };

  useEffect(() => {
    const videoRef = isMobile ? videoRefMobile : videoRefNonMobile;
    attemptPlay(videoRef);
  }, [isMobile]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 800);

    handleResize(); // set initial value

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log(isMobile);

  useEffect(() => {
    async function ScrollpositionAnimation() {
      const targets = document.querySelectorAll(".js-show-on-scroll");
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          // Is the element in the viewport?
          if (entry.isIntersecting) {
            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-fadeIn");
          } else {
            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-fadeIn");
          }
        });
      });
      // Loop through each of the target
      targets.forEach(function (target) {
        // Hide the element
        target.classList.add("opacity-0");

        // Add the element to the watcher
        observer.observe(target);
      });
      //ScrollpositionAnimation();
    }
    ScrollpositionAnimation();
  });

  return (
    <div className="scroll-smooth">
      <header>
        <HeaderComponent />
      </header>
      {/* <div className={"flex flex-col  z-10 mx-auto justify-center "}></div> */}
      <main className={`${styles.main} `}>
        {isMobile ? (
          <video
            ref={videoRefMobile}
            className="min-w-full z-0 min-h-full relative object-cover"
            playsInline
            autoPlay
            loop
            muted
          >
            <source src="/KurveMobile.mp4" type="video/mp4" />
            Your browser does not support the video tag, update your browser
          </video>
        ) : (
          <video
            ref={videoRefNonMobile}
            className="min-w-full z-0 min-h-full relative object-cover"
            playsInline
            autoPlay
            loop
            muted
          >
            <source src="/KurveDesktop.mp4" type="video/mp4" />
            Your browser does not support the video tag, update your browser
          </video>
        )}
        <div className="absolute z-10">
           <Image height={500} width={500} src={logo} alt="logo" className="justify-center mx-auto"/>

          <div className="flex flex-row mx-auto my-5 justify-center">
            <button
              style={{ boxShadow: "0px 0px 12px 2px rgba(123,123,123,0.6)" }}
              type="button"
              className="animate-fadeInUp rounded-lg bg-transparent hover:border hover:border-gray-700 text-white focus:ring-4 focus:ring-blue-300 mt-[40px] sm:mt-0 md:mt-0 text-md
          px-6 py-3 w-32 md:w-52 sm:py-1.5 md:py-1.5 lg:py-1.5 mr-2 mb-2 "
            >
              <p
                className="cursor-pointer  block  text-[12px] sm:text-[18px] md:text-[18px] lg:text-[22px] text-center  text-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white"
                style={{ fontFamily: "GroupeMedium" }}
              >
                <Link href={"/Swap"}>Swap Me Daddy</Link>
              </p>
            </button>
            <p className="mx-5"></p>
            <button
              style={{ boxShadow: "0px 0px 12px 2px rgba(123,123,123,0.6)" }}
              type="button"
              className="animate-fadeInUp rounded-lg bg-transparent hover:border hover:border-gray-700 text-white focus:ring-2 focus:ring-blue-500 mt-[40px] sm:mt-0 md:mt-0 text-md
          px-6  py-3 w-32 md:w-52 sm:py-1.5  md:py-1.5 lg:py-1.5 mr-2 mb-2 "
            >
              <p
                className="cursor-pointer  block  text-[12px] sm:text-[18px]  md:text-[18px] lg:text-[22px] text-center  text-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white"
                style={{ fontFamily: "GroupeMedium" }}
              >
                <Link href={"/Swap"}>Pluto Time</Link>
              </p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
