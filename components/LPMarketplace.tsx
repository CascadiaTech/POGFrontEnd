import styles from "../styles/Home.module.css";
import ClaimComponent from "../components/Claim/ClaimComponent";
import HeaderComponent from "../components/Header/HeaderComponent";
import { useEffect, useRef, useState } from "react";
import MarketplaceComponent from "../components/Marketplace/MarketplaceComponent";

import "@uniswap/widgets/fonts.css";

export default function LPMarketPlace() {
  const [loading, setLoading] = useState(false);
  const videoRefMobile = useRef(null);
  const videoRefNonMobile = useRef(null);
  const [isMobile, setIsMobile] = useState(Boolean);
  const [normalStakeModal, setNormalStakeModal] = useState(Boolean);
  const toggleNormalStakeModal = () => {
    setNormalStakeModal(!normalStakeModal);
  };
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
    const handleResize = () => setIsMobile(window.innerWidth <= 1200);

    handleResize(); // set initial value

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log(isMobile);
  const MY_TOKEN_LIST = [
    {
      name: "Cosmic Odyssey",
      address: "0xb99405b00eF8D0Cf17aEf9D46a8d3cB9f3b72e57",
      symbol: "COSMIC",
      decimals: 18,
      chainId: 1,
    },
  ];
  const addTokenToMM = async () => {
    try {
      const { ethereum }: any = window;
      await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: "0xb99405b00eF8D0Cf17aEf9D46a8d3cB9f3b72e57", // ERC20 token address
            symbol: `COSMIC`,
            decimals: 18,
          },
        },
      });
    } catch (ex) {
      // We don't handle that error for now
      // Might be a different wallet than Metmask
      // or user declined
      console.error(ex);
    }
  };
  return (
    <div className="scroll-smooth ">
      <header>
        <HeaderComponent />
      </header>
      {/* <div className={"flex flex-col  z-10 mx-auto justify-center "}></div> */}
      <main className={`${styles.mainPage} `}>
        {isMobile ? (
          <video
            ref={videoRefMobile}
            className="min-w-full z-0 min-h-full relative object-cover"
            playsInline
            autoPlay
            loop
            muted
          >
            <source src="/LinqMobileNew.mp4" type="video/mp4" />
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
            <source src="/LinqDesktopNew.mp4" type="video/mp4" />
            Your browser does not support the video tag, update your browser
          </video>
        )}
        <div className=" absolute z-10">
          <div
            className={` justify-center mx-auto text-center`}
            style={{ fontFamily: "Mandalore" }}
          >
            <div className={`  text-center self-center justify-center`}>
              <MarketplaceComponent />
            </div>
            <p className={"my-5"}></p>
          </div>
        </div>
      </main>
    </div>
  );
}
