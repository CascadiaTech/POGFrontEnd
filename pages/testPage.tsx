import {
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "../styles/Home.module.css";
import {
  usePublicClient,
  useAccount,
  useContractWrite,
  useContractRead,
  useNetwork,
} from "wagmi";
import { LoadingOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import LPTokenAbi from "../contracts/abi/LPTokenAbi.json";
import LinqStakeModal from "../components/Stake/LinqStakeModal";
import HeaderComponent from "../components/Header/HeaderComponent";
import LpStakeModal from "../components/Stake/LpStakeModal";
import plusIcon from "../public/plusIcon.png";
import minusIcon from "../public/minusIcon.png";
import Image from "next/image";
import { abiObject } from "../contracts/abi/abi.mjs";
import { LPStakingabiObject } from "../contracts/abi/LpStakingAbi.mjs";
import Swal from "sweetalert2";
import ClaimStationComponent from "../components/Stake/ClaimStation";
export default function NewStakeComponent(_token: any) {
  const publicClient = usePublicClient();
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const LPtokenContract = "0xA8A837E2bf0c37fEf5C495951a0DFc33aaEAD57A";
  const linqAddress = "0x3e34eabf5858a126cb583107e643080cee20ca64";
  const StaqeFarm = "0xE4584C42A69F92Ffaa92AF5E7D5ff5e942F3cb34";
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  let { chain } = useNetwork();

  const videoRefMobile = useRef(null);
  const videoRefNonMobile = useRef(null);
  const [isMobile, setIsMobile] = useState(Boolean);
  const [normalStakeModal, setNormalStakeModal] = useState(Boolean);
  const toggleNormalStakeModal = () => {
    setNormalStakeModal(!normalStakeModal);
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  /*
  useEffect(() => {
    async function gradientAnimation() {
        const targets = document.querySelectorAll(".js-show-on-scroll-LinearAnimaion");
        const observer = new IntersectionObserver(function (entries) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("motion-safe:animate-LinearAnimaion");
            } else {
              entry.target.classList.add("motion-safe:animate-LinearAnimaion");
            }
          });
        });
        targets.forEach(function (target) {
          target.classList.add("opacity-0");
          observer.observe(target);
        });
      }
      gradientAnimation()
     }, []);
*/

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

  let current_chain = chain?.id;
  const [_amountLinQ, set_amountLinQ] = useState(0);
  const [MilqBalance, setMilqBalance] = useState(0);

  const { data: BalanceOfMilq } = useContractRead({
    address: LPtokenContract,
    abi: LPTokenAbi,
    functionName: "balanceOf",
    chainId: current_chain,
    watch: true,
    args: [address],
    onSuccess(data: any) {
      setMilqBalance(Number(data.toString()) / 10 ** 18);
    },
  });

  const [linqBalance, setlinqBalance] = useState(0);

  const { data: BalanceOfLinq } = useContractRead({
    address: linqAddress,
    abi: abiObject,
    functionName: "balanceOf",
    chainId: current_chain,
    watch: true,
    args: [address],
    onSuccess(data: any) {
      setlinqBalance(Number(data.toString()) / 10 ** 18);
    },
  });

  const [isLpStakeOpen, setIsLpStakeOpen] = useState(true); // Initial state for LP Stake
  const [isLinqStakeOpen, setIsLinqStakeOpen] = useState(false); // Initial state for LINQ Stake

  const toggleModals = () => {
    setIsLpStakeOpen(!isLpStakeOpen);
    setIsLinqStakeOpen(!isLinqStakeOpen);
  };

  let [pendingRewards, setPendingRewards]: any = useState();
  const [pendingLP, setPendingLP]: any = useState(0);

  const { data: PendingLPRewards } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "checkEstMilQRewards",
    watch: true,
    chainId: current_chain,
    args: [address],
    onSuccess(data: any) {
      setPendingLP(Number(data.toString()) / 10 ** 18);
    },
  });

  const { data: PendingRewards } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "viewHowMuchMilk",
    watch: true,
    chainId: current_chain,
    args: [address],
    onSuccess(data: any) {
      setPendingRewards(Number(data.toString()) / 10 ** 18);
    },
  });
  let [userdetails, setUserDetails]: any = useState();

  let [pendingrewardsaddon, setPendingRewardsAddon]: any = useState();
  let [Linqpendingrewardsaddon, setLinqPendingRewardsAddon]: any = useState();
  const [qompounded, setQompounded]: any = useState();

  const { data: UserDetails } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "LinQerParlours",
    chainId: current_chain,
    watch: true,
    args: [address],
    onSuccess(data: any) {
      setUserDetails(data);
      setlpstaked(Number(data[0].toString()) / 10 ** 18);
      setQompounded(Number(data[6].toString()) / 10 ** 18);
      setUnlockTime(Number(data[2].toString()));
      setLinqPendingRewardsAddon(Number(data[5].toString()) / 10 ** 18);
    },
  });

  const [lpstaked, setlpstaked]: any = useState(0);
  const [totalLPStaked, settotalLPStaked] = useState(0);

  const { data: bessies } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    watch: true,
    functionName: "bessies",
    chainId: current_chain,

    onSuccess(data: any) {
      settotalLPStaked(Number(data.toString()) / 10 ** 18);
    },
  });
  const [finalUserLockTime, setfinalUserLockTime]: any = useState();

  let [milqerUserDetails, setMilqerUserDetails]: any = useState();
  const { data: MilqerUserDetails } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "MilQerParlours",
    chainId: current_chain,
    watch: true,
    args: [address],
    onSuccess(data: any) {
      setMilqerUserDetails(data);
      setlpstaked(Number(data[0].toString()) / 10 ** 18);
      setQompounded(Number(data[6].toString()) / 10 ** 18);
      setUnlockTime(Number(data[2].toString()));
    },
  });

  let [userLPDetails, setUserLPDetails]: any = useState();

  const { data: UserDetailsLP } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "MilQerParlours",
    chainId: current_chain,
    watch: true,
    args: [address],
    onSuccess(data: any) {
      setUserLPDetails(data);
      setPendingRewardsAddon(Number(data[6].toString()) / 10 ** 18);
    },
  });

  let [totallinqStaked, settotalLinqStaked] = useState(0);
  const { data: daisys } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    watch: true,
    functionName: "daisys",
    chainId: current_chain,
    onSuccess(data: any) {
      settotalLinqStaked(Number(data.toString()) / 10 ** 18);
    },
  });

  const [index, setTheIndex] = useState(0);

  const { data: totalVitaliksMilkShipments } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    watch: true,
    functionName: "totalVitaliksMilkShipments",
    chainId: current_chain,
    onSuccess(data: any) {
      setTheIndex(Number(data.toString()));
    },
  });

  let [Linqapr, setLinqapr]: any = useState(0);
  let [LPapr, setLPapr]: any = useState(0);

  const { data: VitaliksMilkShipments } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "VitaliksMilkShipments",
    chainId: current_chain,
    watch: true,
    args: [index ? index : 1],
    onSuccess(data: any) {
      setLinqapr(Number(data[1].toString()) / 10 ** 18);
      setLPapr(Number(data[2].toString()) / 10 ** 18);
    },
  });
  const [pendinglp, setpendinglp]: any = useState();
  const { data: CheckMilQrewards } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "checkEstMilQRewards",
    chainId: current_chain,
    watch: true,
    args: [address],
    onSuccess(data: any) {
      setpendinglp(Number(data.toString()) / 10 ** 18);
    },
  });

  function FetchDetails() {
    UserDetails;
    PendingRewards;
    PendingLPRewards;
    CheckMilQrewards;
    daisys;
    VitaliksMilkShipments;
    totalVitaliksMilkShipments;
    UserDetailsLP;
  }

  const [unlocktime, setUnlockTime]: any = useState();

  function FetchBalances() {
    BalanceOfLinq;
    BalanceOfMilq;
  }
  useEffect(() => {
    FetchDetails();
    FetchBalances();
  }, []);

  const { write: Qompound } = useContractWrite({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    chainId: current_chain,
    functionName: "QompoundLinQ",
    args: [10],
    account: address,
    onSuccess(data) {
      Swal.fire({
        icon: "success",
        title: "you have successfully Qompounded",
      });
      FetchDetails();
    },
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured with Qompounding unlock please contact support if issue perists${err.cause}`,
      });
    },
  });

  const { write: ClaimLP, isLoading } = useContractWrite({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    chainId: current_chain,
    functionName: "shipLinQersMilQ",
    account: address,
    onSuccess(data) {
      Swal.fire({ icon: "success", title: "you have successfully ClaimedLP" });
      setLoading(true);
    },
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured with Claiming please contact support if issue perists${err.cause}`,
      });
    },
  });

  const { write: Claim } = useContractWrite({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    chainId: current_chain,
    functionName: "shipMilk",
    account: address,
    onSuccess(data) {
      Swal.fire({ icon: "success", title: "you have successfully Claimed" });
    },
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured with Claiming please contact support if issue perists${err.cause}`,
      });
    },
  });

  const [activeSection, setActiveSection] = useState(null);

  // Define sections and their content
  const sections = [
    {
      title: "Account Summary",
      content: (
        <div
          style={{ fontFamily: "Azonix" }}
          className="text-xl animate-LinearAnimaion duration-700 transition-all w-full grid grid-cols-2 col-span-4 mb-4 opacity-90
          text-white px-6 py-6 mx-auto"
        >
          <div
            style={{ fontFamily: "BebasNeue" }}
            className="text-white text-left border-b border-white px-2"
          >
            LINQ Balance:
          </div>
          <div
            style={{ fontFamily: "BebasNeue" }}
            className="text-white text-right border-b border-white px-2"
          >
            {linqBalance ? linqBalance.toFixed(2) : "0"} LINQ
          </div>
          <div
            style={{ fontFamily: "BebasNeue" }}
            className="text-white text-left border-b border-white px-2"
          >
            LP Balance:
          </div>
          <div
            style={{ fontFamily: "BebasNeue" }}
            className="text-white text-right border-b border-white px-2"
          >
            {MilqBalance ? MilqBalance.toFixed(2) : "0"} LP
          </div>
          <div
            style={{ fontFamily: "BebasNeue" }}
            className="text-white text-left border-b border-white px-2"
          >
            LINQ StaQed:
          </div>
          <div
            style={{ fontFamily: "BebasNeue" }}
            className="text-white text-right border-b border-white px-2"
          >
            {userdetails
              ? (Number(userdetails[0].toString()) / 10 ** 18).toFixed(3)
              : 0}{" "}
            LINQ
          </div>
          <div
            style={{ fontFamily: "BebasNeue" }}
            className="text-white text-left border-b border-white px-2"
          >
            LP StaQed:
          </div>
          <div
            style={{ fontFamily: "BebasNeue" }}
            className="text-white text-right border-b border-white px-2"
          >
            {milqerUserDetails
              ? Number(milqerUserDetails[0].toString()) / 10 ** 18
              : 0}{" "}
            LP
          </div>
        </div>
      ),
    },
    {
      title: "Claimable Balance",
      content: (
        <div
          style={{ fontFamily: "Azonix" }}
          className={
            "text-xl animate-LinearAnimaion js-show-on-scroll-LinearAnimaion w-full grid grid-cols-2 col-span-4 mb-4 text-white px-16 py-4 mx-auto"
          }
        >
          <h2
            style={{ fontFamily: "BebasNeue" }}
            className="text-left border-b border-white px-2"
          >
            ETH Claimable (LP & LINQ):
          </h2>{" "}
          <h2
            style={{ fontFamily: "BebasNeue" }}
            className="text-right border-b border-white px-2"
          >
            {linqBalance ? linqBalance.toFixed(2) : "0"} ETH
          </h2>
          <h2
            style={{ fontFamily: "BebasNeue" }}
            className="text-left border-b border-white px-2"
          >
            LP Claimable:
          </h2>{" "}
          <h2
            style={{ fontFamily: "BebasNeue" }}
            className="text-right border-b border-white px-2"
          >
            {pendingLP ? pendingLP.toFixed(8) : "0"} ETH
          </h2>
        </div>
      ),
    },
    {
      title: "Earnings Summary",
      content: 
      <div
        className={
          "text-xl animate-LinearAnimaion js-show-on-scroll-LinearAnimaion w-full grid grid-cols-2 col-span-4 mb-4 opacity-90 text-white px-16 py-4 mx-auto"
        }
      >
        <h2
          style={{ fontFamily: "BebasNeue" }}
          className="text-white text-left border-b border-white px-2"
        >
          ETH Earned (Linq + LP) Per 24hr:
        </h2>{" "}
        <h2
          style={{ fontFamily: "BebasNeue" }}
          className="text-white text-right border-b border-white px-2"
        >
          LINQ
        </h2>
        <h2
          style={{ fontFamily: "BebasNeue" }}
          className="text-white text-left border-b border-white px-2"
        >
          ETH Earned LINQ Per 24hr:
        </h2>{" "}
        <h2
          style={{ fontFamily: "BebasNeue" }}
          className="text-white text-right border-b border-white px-2"
        >
          {Linqapr && userdetails
            ? (
                Linqapr *
                (Number(userdetails[0].toString()) / 10 ** 18) *
                86400
              ).toFixed(8)
            : "0"}{" "}
          ETH
        </h2>
        <h2
          style={{ fontFamily: "BebasNeue" }}
          className="text-white text-left border-b border-white px-2"
        >
          ETH Earned LP Per 24hr:
        </h2>{" "}
        <h2
          style={{ fontFamily: "BebasNeue" }}
          className="text-white text-right border-b border-white px-2"
        >
          {" "}
          {LPapr && userLPDetails
            ? (
                LPapr *
                (Number(userLPDetails[0].toString()) / 10 ** 18) *
                86400
              ).toFixed(8)
            : "0"}{" "}
          ETH
        </h2>
      </div>,
    },
  ];

  const handleSectionClick = (index: any) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <>
      <header>
        <HeaderComponent />
      </header>
      <main className={`${styles.tstMain} `}>
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
        <div
          className={
            "flex flex-col mx-auto justify-center text-center absolute z-10"
          }
        >
          <h1
            className="text-3xl mb-2 md:text-4xl lg:text-4xl font-semibold text-white"
            style={{ fontFamily: "Azonix" }}
          >
            StaQing
          </h1>
          <div className="w-fit mx-auto border border-white rounded-2xl px-6 py-6 text-white">
            {sections.map((section, index) => (
              <div key={index} className="mb-2">
                <div
                  className="flex justify-between border-b border-white cursor-pointer hover:bg-opacity-70"
                  onClick={() => handleSectionClick(index)}
                >
                  <div
                    style={{ fontFamily: "Azonix" }}
                    className="mx-auto text-center text-2xl"
                  >
                    {section.title}
                  </div>
                  <div>
                    {activeSection === index ? (
                        <div className={'bg-white h-fit w-fit rounded-full'}>
                      <Image width={30} height={30} src={minusIcon} alt="minus"></Image>
                      </div>
                    ) : (
                        <div className={'bg-white h-fit w-fit rounded-full'}>
                      <Image width={30} height={30} src={plusIcon} alt="plus"></Image>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={`animate-LinearAnimaion p-2 border duration-700 border-2 border-gray-300 transition-opacity ease-in-out transform ${
                    activeSection === index
                      ? "opacity-100 scale-y-100 h-full"
                      : "opacity-0 scale-y-0 h-0"
                  }`}
                >
                  {section.content}
                </div>
              </div>
            ))}
          </div>
          <p className={"my-5"}></p>
          <ClaimStationComponent></ClaimStationComponent>
          <p className={"my-5"}></p>
          <div
            className={
              "mx-auto self-center w-fit h-fit justify-center flex flex-row"
            }
          >
            <div
              style={{
                background:
                  "linear-gradient(to bottom, #3C3C3C 0%, #000000 100%, #000000 100%)",
              }}
              className={`flex absolute translate-y-10 z-20 h-12 w-52 rounded-full bg-gray-200 ${
                isLpStakeOpen ? "bg-gray-200" : ""
              }`}
            >
              <div
                className={`z-0 absolute top-0 left-0 w-1/2 h-full bg-white rounded-full text-black transition-transform ${
                  isLpStakeOpen
                    ? "transform translate-x-0 duration-300"
                    : "transform translate-x-full duration-300"
                }`}
              ></div>
              <button
                style={{ fontFamily: "BebasNeue" }}
                className={`z-10 absolute text-md top-0 right-0 w-1/2 h-full rounded-full text-black transition-transform ${
                  isLinqStakeOpen ? "" : "text-gray-400"
                }`}
                onClick={() => {
                  toggleModals();
                }}
              >
                LINQ Stake
              </button>
              <button
                style={{ fontFamily: "BebasNeue" }}
                className={`z-10 absolute text-md top-0 w-1/2 h-full rounded-full text-black transition-transform ${
                  isLinqStakeOpen ? "text-gray-400" : ""
                }`}
                onClick={() => {
                  toggleModals();
                }}
              >
                LP Stake
              </button>
            </div>
            <p className={"my-6"}></p>
            {isLpStakeOpen ? (
              <LpStakeModal
                isOpen={true}
                onClose={() => setIsLpStakeOpen(false)}
              />
            ) : (
              <LinqStakeModal
                isOpen={true}
                onClose={() => setIsLinqStakeOpen(false)}
              />
            )}
          </div>
          <div className={"text-center mx-auto flex flex-col px-10"}>
            <button onClick={toggleModal}>
              <h2
                style={{ fontFamily: "Azonix" }}
                className="mb-2 z-10 absolute mx-auto text-center cursor-pointer hover:text-gray-100 duration-700 mx-auto
               text-3xl text-gray-400 opacity-90"
              >
                Account Summary
              </h2>
            </button>
            <div
              className={`transition-all ${
                isModalOpen
                  ? "h-auto duration-700 transition-all opacity-100 max-h-96"
                  : "h-auto duration-700 transition-all opacity-0 max-h-96"
              } duration-700 transition-all overflow-hidden`}
            >
              <div
                className="text-xl duration-700 transition-all w-full grid grid-cols-2 col-span-4 mb-4 opacity-90
              text-white px-6 py-6 mx-auto"
              >
                <div className="text-white text-left border-b border-white px-2">
                  LINQ Balance:
                </div>
                <div className="text-white text-right border-b border-white px-2">
                  {linqBalance ? linqBalance.toFixed(2) : "0"} LINQ
                </div>
                <div className="text-white text-left border-b border-white px-2">
                  LP Balance:
                </div>
                <div className="text-white text-right border-b border-white px-2">
                  {MilqBalance ? MilqBalance.toFixed(2) : "0"} LP
                </div>
                <div className="text-white text-left border-b border-white px-2">
                  LINQ StaQed:
                </div>
                <div className="text-white text-right border-b border-white px-2">
                  {userdetails
                    ? (Number(userdetails[0].toString()) / 10 ** 18).toFixed(3)
                    : 0}{" "}
                  LINQ
                </div>
                <div className="text-white text-left border-b border-white px-2">
                  LP StaQed:
                </div>
                <div className="text-white text-right border-b border-white px-2">
                  {milqerUserDetails
                    ? Number(milqerUserDetails[0].toString()) / 10 ** 18
                    : 0}{" "}
                  LP
                </div>
              </div>
            </div>
          </div>
          <div className="fixed mb-10 px-2 text-white sm:px-5 md:px-10 lg:px-10 left-0 bottom-0 bg-transparent w-full grid grid-cols-2 ">
            <p
              className="text-[18px] sm:text-[15px] md:text-[15px] lg:text-[16px] 
        col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 "
              style={{ fontFamily: "Azonix" }}
            >
              LINQGROUP.IO
            </p>
            <p
              className="text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] 
        col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1"
              style={{ fontFamily: "Azonix" }}
            >
              LINQGROUP2023
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
