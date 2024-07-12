import styles from "../styles/Home.module.css";
import HeaderComponent from "../components/Header/HeaderComponent";
import { useEffect, useRef, useState } from "react";
import SwapComponent from "../components/swapc";


export default function Swap() {
  
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

  useEffect(() => { {}
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
  
  return (
    <div className="scroll-smooth ">
      <header>
        <HeaderComponent />
      </header>
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
        <div className="w-full absolute z-10 ">
          <div
            className={`w-fit flex flex-col justify-top mx-auto text-center`}
            style={{ fontFamily: "Mandalore" }}
          >
      
            <SwapComponent />

          </div>
        </div>
      </main>
    </div>
  );
}