import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useAccount } from "wagmi";
import HeaderComponent from "../components/Header/HeaderComponent";
import { useWalletClient } from "wagmi";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/images/plutoLogo.png"
import FooterComponent from "../components/Footer/FooterComponent";
import MainPageContent from "../components/MainPageComponents/MainPageContent";


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
          <>
            <video
              ref={videoRefMobile}
              className="min-w-full z-0 min-h-full relative object-cover bg-repeat"
              playsInline
              autoPlay
              loop
              muted
            >
              <source src="/newBg.mp4" type="video/mp4" />
              Your browser does not support the video tag, update your browser
            </video>
            <video
              ref={videoRefMobile}
              className="min-w-full z-0 min-h-full relative object-cover bg-repeat"
              playsInline
              autoPlay
              loop
              muted
            >
              <source src="/newBg.mp4 " type="video/mp4" />
              Your browser does not support the video tag, update your browser
            </video>
          </>
        ) : (
          <video
            ref={videoRefNonMobile}
            className="min-w-full z-0  relative "
            playsInline
            autoPlay
            loop
            muted
          >
            <source src="/newBg.mp4" type="video/mp4" />
            Your browser does not support the video tag, update your browser
          </video>
        )}
        <MainPageContent/>
      </main>
    </div>
  );
};

export default Home;



