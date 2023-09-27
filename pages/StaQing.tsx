import styles from "../styles/Home.module.css";
import ClaimComponent from "../components/Claim/ClaimComponent";
import HeaderComponent from "../components/Header/HeaderComponent";
import { useEffect, useRef, useState } from "react";
import NewStakeComponent from "../components/Stake/NewStakeComponent";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClaimPage() {
  const videoRefMobile = useRef(null);
  const videoRefNonMobile = useRef(null);
  const [isMobile, setIsMobile] = useState(Boolean);
  const [normalStakeModal, setNormalStakeModal] = useState(Boolean);
  const toggleNormalStakeModal = () => {
    setNormalStakeModal(!normalStakeModal);
  };
  
/*
  const notify = () => toast("Wow so easy !");
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
    const handleResize = () => setIsMobile(window.innerWidth <= 900);

    handleResize(); // set initial value

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
*/

/*
  let ComingSoon = false
  if(ComingSoon == true){
    return (
      <div className="scroll-smooth ">
      <header>
        <HeaderComponent />
      </header>

      <main className={`${styles.mainPage} `}>
      <div className="absolute z-10">
          <div
            className={`flex flex-col items-top h-full  text-center`}
          >
            <div className={`  text-center`}>
             <h1 className="text-9xl text-white mb-46" style={{ fontSize: "40px", fontFamily: "GroupeMedium" }}> Coming Soon </h1>
            </div>

          </div>
        </div>
        {isMobile ? (
          <video
            ref={videoRefMobile}
            className="min-w-full z-0 min-h-full relative object-cover"
            playsInline
            autoPlay
            loop
            muted
          >
            <source src="/LINQDappMobile.mp4" type="video/mp4" />
            Your browser does not support the video tag, update your browser
          </video>
        ) : (
          <video
            ref={videoRefNonMobile}
            className="min-w-full z-0 relative"
            playsInline
            height={300}
            autoPlay
            loop
            muted
          >
            <source src="/LINQDappDesktop.mp4" type="video/mp4" />
            Your browser does not support the video tag, update your browser
          </video>
        )}

      </main>
    </div>
    )
  }else { */
  return (
    <div className="scroll-smooth ">
      <header>
        <HeaderComponent />
      </header>
      {/* <div className={"flex flex-col  z-10 mx-auto justify-center "}></div> */}
      <main className={`${styles.mainPage} `}>
        <div className="absolute z-10">
          <div
            className={`flex flex-col justify-center mx-auto text-center`}
          >
            <div className={`  text-center self-center justify-center`}>
              <><NewStakeComponent></NewStakeComponent> </>
        
            </div>
            <p className={"my-5"}></p>
          </div>
        </div>
      </main>
    </div>
  );
}
//}