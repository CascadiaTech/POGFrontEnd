// import "tailwindcss-elevation";
// import { useWeb3React } from "@web3-react/core";
// import Swal from "sweetalert2";
// import { Accordion } from "flowbite-react";
// import { useCallback, useEffect, useRef, useState, } from "react";
// import Web3 from "web3";
// import {
//   ExternalProvider,
//   JsonRpcFetchFunc,
//   Web3Provider,
// } from "@ethersproject/providers";
// import styles from "../../styles/Home.module.css";
// import Image from "next/image";
// import linqbackground from "../../assets/images/linqBackground.jpg";
// import linqbackgroundmobile from "../../assets/images/linqBackgroundMobile.jpg";
// import { Contract } from "@ethersproject/contracts";
// import { stakingabiObject } from "../../contracts/abi/stakingabi.mjs";
// import { pairaddressabiObject } from "../../contracts/abi/pairaddressabi.mjs";
// import { Web3ReactProvider } from "@web3-react/core";
// import { Spin } from "antd";
// import { LoadingOutlined } from "@ant-design/icons";
// import ScrollpositionAnimation from "../../hooks/OnScroll";
// import HeaderComponent from "../../components/Header/HeaderComponent";

// export default function StakeComponent() {
//   const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
//   const { account } = useWeb3React();
//   const context = useWeb3React();
//   const [loading, setLoading] = useState(false);
//   const [claim, setcanclaim] = useState(Boolean);
//   const { library } = context;
//   const [Claimable, setClaimable] = useState(false);
//   const [pendingReturns, setpendingReturns] = useState(Number);
//   const [amount, setAmount] = useState<number>(0);
//   const [spender, setSpender] = useState(
//     "0xd38904DCF977fFcB10c12BA784D41EA22Bb4F8a7"
//   );
//   const [value, setValue] = useState(10000000000000);

//   const [pendingreflections, setpendingreflections] = useState(Number);
//   const [totaldistributed, settotaldistributed] = useState(Number);
//   const [balance, setbalance] = useState(Number);
//   const [balanceinstaking, setbalanceInstaking] = useState(Number);

//   const videoRefMobile = useRef(null);
//   const videoRefNonMobile = useRef(null);
//   const [isMobile, setIsMobile] = useState(Boolean);
//   const attemptPlay = (videoRef: any) => {
//     videoRef && videoRef.current && videoRef.current.defaultMuted == false;
//     videoRef.current.load() &&
//       videoRef.current.play().catch((error: any) => {
//         console.log("error attempting to play", error);
//       });
//   };

//   useEffect(() => {
//     const videoRef = isMobile ? videoRefMobile : videoRefNonMobile;
//     attemptPlay(videoRef);
//   }, [isMobile]);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 1050);

//     handleResize(); // set initial value

//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   console.log(isMobile);

//   useEffect(() => {
//     async function getPendingRewards() {
//       try {
//         setLoading(true);
//         const abi = stakingabiObject;
//         const provider = new Web3Provider(
//           library?.provider as ExternalProvider | JsonRpcFetchFunc
//         );
//         const contractaddress = "0xd38904DCF977fFcB10c12BA784D41EA22Bb4F8a7"; // "clienttokenaddress"
//         const contract = new Contract(contractaddress, abi, provider);
//         const rewardToken = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
//         const Reflections = await contract.getPendingReturns(account);
//         const pendingReturns = Web3.utils.fromWei(Reflections.toString());
//         setpendingReturns(pendingReturns);
//         console.log(pendingReturns);

//         return pendingReturns;
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//       } finally {
//         setLoading(false);
//       }
//     }

//     async function getamount() {
//       try {
//         setLoading(true);
//         const abi = stakingabiObject;
//         const provider = new Web3Provider(
//           library?.provider as ExternalProvider | JsonRpcFetchFunc
//         );
//         const contractaddress = "0xd38904DCF977fFcB10c12BA784D41EA22Bb4F8a7"; // "clienttokenaddress"
//         const contract = new Contract(contractaddress, abi, provider);
//         const Reflections = await contract.stake_details(account);
//         console.log(await contract.stake_details(account));
//         console.log(Reflections.amount);
//         console.log(Reflections[1]);

//         const numericValue = Web3.utils
//           .toBN(Reflections.amount._hex)
//           .toString();
//         console.log(numericValue);

//         const convertedValue = Web3.utils.fromWei(numericValue, "ether");
//         console.log(convertedValue);

//         setbalanceInstaking(convertedValue);

//         return Reflections;
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//       } finally {
//         setLoading(false);
//       }
//     }
//     getPendingRewards();
//     getamount();
//   }, [account]);

//   const Claim = useCallback(async () => {
//     if (!account) {
//         Swal.fire({
//             icon: "error",
//             title: "Connect Your Wallet To Claim",
//             timer: 5000,
//         });
//         return; // Exit function if account is not connected
//     }

//     try {
//         setLoading(true);
//         const data = stakingabiObject;
//         const abi = data;
//         const contractaddress = "0xd38904DCF977fFcB10c12BA784D41EA22Bb4F8a7"; // "clienttokenaddress"
//         const provider = new Web3Provider(
//             library?.provider as ExternalProvider | JsonRpcFetchFunc
//         );
//         const signer = provider.getSigner();
//         const contract = new Contract(contractaddress, abi, signer);
//         console.log(contract);
//         const ClaimTokens = await contract.Claim(); //.claim()
//         const signtransaction = await signer.signTransaction(ClaimTokens);
//         const Claimtxid = await signtransaction;
//         Swal.fire({
//             icon: "success",
//             title: "Congratulations you have Claimed all of your rewards",
//             text: "Go see them in your wallet, and stick around for the next drop",
//         });

//         return Claimtxid;
//     } catch (error: any) {
//         if (error.message.includes("rejected")) {
//             Swal.fire({
//                 icon: "error",
//                 title: "Transaction Rejected",
//                 text: "The transaction was rejected.",
//             });
//         } else if (error.message.includes("not recognized as active staker")) {
//             Swal.fire({
//                 icon: "error",
//                 title: "Claim Failed",
//                 text: "You are not recognized as an active staker.",
//             });
//         } 
//         else if (error.message.includes("you must re-lock your LP for another lock duration")) {
//           Swal.fire({
//               icon: "error",
//               title: "Claim Failed",
//               text: "you must re-lock your LP for another lock duration before claiming again :)",
//           });
//       } 
//       else if (error.message.includes("you can only claim once per block")) {
//         Swal.fire({
//             icon: "error",
//             title: "Claim Failed",
//             text: "You can only claim once per block",
//         });
//     } 
//         else {
//             console.log(error);
//         }
//     } finally {
//         setLoading(false);
//     }
// }, [account, library?.provider]);


//   async function Deposit() {
//     Swal.fire({
//       icon: "warning",
//       title:
//         "You are about to lock your Linq LP token for 2 weeks, are you sure?",
//       showCancelButton: true,
//       confirmButtonText: "Deposit",
//       cancelButtonText: "Cancel",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         if (balanceinstaking > 0) {
//           Swal.fire({
//             icon: "warning",
//             title: "Claim before you deposit",
//             showCancelButton: true,
//             confirmButtonText: "Claim",
//             cancelButtonText: "Cancel",
//             preConfirm: () => {
//               // Call your custom function here
//               return Claim();
//             },
//             allowOutsideClick: () => !Swal.isLoading(), // Prevent clicking outside the alert while loading
//           }).then((result) => {
//             if (result.isConfirmed) {
//               // Handle confirmed action if needed
//             }
//           });
//         }
//         // Handle button click
//         DepositLP()
//           .then(() => {
//             Swal.fire({
//               icon: "success",
//               title: "Congratulations!",
//               text: "You have successfully deposited your LP tokens!",
//             });
//           })
//           .catch((error) => {
//             if (
//               error.code === 4001 &&
//               error.message === "MetaMask Tx Signature: User denied transaction signature."
//           ) {
//               Swal.fire({
//                   icon: "error",
//                   title: "Transaction Cancelled",
//                   text: "You have cancelled the transaction.",
//               });
//           } else {
//               Swal.fire({
//                   icon: "error",
//                   title: "Error",
//                   text: "An error occurred while processing the transaction.",
//               });
//           }
//           });
//       } else if (result.dismiss === Swal.DismissReason.cancel) {
//         // Handle cancel button click
//         console.log("Transaction rejected");
//       }
//     });
//   }

//   async function DepositLP() {
//     try {
//       setLoading(true);
//       const abi = stakingabiObject;
//       const provider = new Web3Provider(
//         library?.provider as ExternalProvider | JsonRpcFetchFunc
//       );
//       console.log(provider);
//       if (!provider.getSigner) {
//         throw new Error("Provider does not have a valid signer.");
//       }

//       const signer = provider.getSigner();
//       const contractaddress = "0xd38904DCF977fFcB10c12BA784D41EA22Bb4F8a7";
//       const contract = new Contract(contractaddress, abi, signer); // "clienttokenaddress"
//       const tx = await contract.Deposit_LP(amount);
//       const response = await signer.sendTransaction(tx);
//       const Claimtxid = await response;

//       return Claimtxid;
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     } finally {
//       setLoading(false);
//     }
//   }
//   // This goes in depositLP to check if they have been approved yet, Error Handling.
//   //const pairaddress = "0x9d3613eC2af3ECBf90AC27822eA3bfC8E63e83f2";
//   //const pair = new Contract(pairaddress, pairaddressabiObject, signer);
//   //const allowance = await pair.allowance(account, pairaddress);
//   //if (allowance.lt(amount)) {
//   //    Swal.fire({
//   //        icon: "error",
//   //        title: "Approval Required",
//   //        text: "Go hit the approve button first!",
//   //    });
//   //    return; // Exit function if approval is not done
//   //}

//   async function WithdrawLP() {
//     try {
//       setLoading(true);
//       const abi = stakingabiObject;
//       const provider = new Web3Provider(
//         library?.provider as ExternalProvider | JsonRpcFetchFunc
//       );
//       console.log(provider);
//       if (!provider.getSigner) {
//         throw new Error("Provider does not have a valid signer.");
//       }
//       const signer = provider.getSigner();
//       console.log(signer)
//       const contractaddress = "0xd38904DCF977fFcB10c12BA784D41EA22Bb4F8a7";
//       const contract = new Contract(contractaddress, abi, signer); // "clienttokenaddress"
//       const tx = await contract.WithdrawLP();
//       const response = await signer.sendTransaction(tx);
//       const Claimtxid = await response;

//       return Claimtxid;
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function EmergencyWithdraw() {
//     try {
//       setLoading(true);
//       const abi = stakingabiObject;
//       const provider = new Web3Provider(
//         library?.provider as ExternalProvider | JsonRpcFetchFunc
//       );
//       console.log(provider);
//       if (!provider.getSigner) {
//         throw new Error("Provider does not have a valid signer.");
//       }
//       const signer = provider.getSigner();
//       const contractaddress = "0xd38904DCF977fFcB10c12BA784D41EA22Bb4F8a7";
//       const contract = new Contract(contractaddress, abi, signer); // "clienttokenaddress"
//       const tx = await contract.EmergencyUnstake();
//       const response = await signer.sendTransaction(tx);
//       const Claimtxid = await response;

//       return Claimtxid;
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function Approve() {
//     try {
//       setLoading(true);
//       const abi = pairaddressabiObject;
//       const provider = new Web3Provider(
//         library?.provider as ExternalProvider | JsonRpcFetchFunc
//       );
//       console.log(provider);
//       if (!provider.getSigner) {
//         throw new Error("Provider does not have a valid signer.");
//       }
//       const signer = provider.getSigner();
//       const contractaddress = "0x7d5E668BeB06F8c1318a17139d10BC5605D866EF";
//       const contract = new Contract(contractaddress, abi, signer); // "clienttokenaddress"
//       const tx = await contract.approve(spender, value);
//       const response = await signer.sendTransaction(tx);
//       const Claimtxid = await response;

//       return Claimtxid;
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <>
//       <main className={styles.main}>
//         <header>
//           {" "}
//           <HeaderComponent></HeaderComponent>
//         </header>{" "}
//         {isMobile ? (
//           <video
//             ref={videoRefMobile}
//             className="min-w-full z-0 min-h-full relative object-cover"
//             playsInline
//             autoPlay
//             loop
//             muted
//           >
//             <source src="/LinqVidMobile_resized.mp4" type="video/mp4" />
//             Your browser does not support the video tag, update your browser
//           </video>
//         ) : (
//           <>
//             <video
//               ref={videoRefNonMobile}
//               className="min-w-full z-0 min-h-full relative object-cover"
//               playsInline
//               autoPlay
//               loop
//               muted
//             >
//               <source src="/LinqVid.mp4" type="video/mp4" />
//               Your browser does not support the video tag, update your browser
//             </video>
//           </>
//         )}
//         <div className="flex flex-col w-fit absolute top-0 mt-32 z-10">
//           <h5
//             style={{ fontFamily: "Azonix" }}
//             className="text-center mb-5 md:mb-10 text-3xl md:text-4xl
//             leading-tight font-bold tracking-wide self-center text-gray-300 dark:text-gray-300"
//           >
//             LP Staking Station
//           </h5>
//           <div
//             className={
//               " mx-4 flex flex-col opacity-90 border-2 border-gray-500 mb-10 -pb-5 rounded-2xl px-2 md:px-6 py-4"
//             }
//             style={{ backgroundColor: "#0d0d0d" }}
//           >
//             <p
//               style={{ fontFamily: "GroupeMedium" }}
//               className={
//                 "sm:text-md md:text-xl text-center font-bold text-gray-300 my-2"
//               }
//             >
//               Locking Period: Approximately two weeks
//             </p>
//             <p
//               style={{ fontFamily: "GroupeMedium" }}
//               className={
//                 "sm:text-md md:text-xl text-center font-bold text-gray-300"
//               }
//             >
//               Important: Claim pending rewards before <br /> adding to stake, or
//               withdrawing from stake.
//             </p>
//             <p
//               style={{ fontFamily: "GroupeMedium" }}
//               className={
//                 "sm:text-md md:text-xl text-center font-bold text-gray-300 mt-3"
//               }
//             >
//               Amount you want to stake
//             </p>
//             <input
//               style={{ backgroundColor: "#4a4a4a" }}
//               className={
//                 "border-2 justify-center mx-auto border-gray-300 w-fit rounded-2xl my-2"
//               }
//               type="number"
//               placeholder="Enter stake amount"
//               value={amount}
//               onChange={(e) => setAmount(parseFloat(e.target.value))}
//             />
//             <div className="flex flex-col md:flex-row mx-auto my-2 justify-center">
//               <button
//                 onClick={() => Approve()}
//                 style={{ backgroundColor: "#191919" }}
//                 className={
//                   "rounded-xl hover:text-white text-gray-400 justify-center text-md md:text-xl px-4 py-2 m-2"
//                 }
//               >
//                 <p
//                   style={{ fontFamily: "GroupeMedium" }}
//                   className={"font-bold"}
//                 >
//                   Approve
//                 </p>
//               </button>
//               <button
//                 onClick={() => Deposit()}
//                 style={{ backgroundColor: "#191919" }}
//                 className={
//                   "rounded-xl hover:text-white text-gray-400 justify-center text-md md:text-xl px-4 py-2 m-2"
//                 }
//               >
//                 <p
//                   style={{ fontFamily: "GroupeMedium" }}
//                   className={"font-bold"}
//                 >
//                   Deposit LP
//                 </p>
//               </button>
//             </div>{" "}
//             <button
//               onClick={() => WithdrawLP()}
//               style={{
//                 fontFamily: "GroupeMedium",
//               }}
//               className={
//                 "text-md md:text-xl rounded-2xl font-bold bg-gray-300 text-gray-800 py-2"
//               }
//             >
//               Withdraw LP
//             </button>
//             <p className={"my-2"}></p>
//             <div
//               className={
//                 " mx-auto justify-center flex flex-col rounded-2xl px-6 py-0 md:py-2"
//               }
//             >
//               <p
//                 style={{ fontFamily: "GroupeMedium" }}
//                 className={
//                   "text-md md:text-xl font-bold text-gray-300 my-0 md:my-2"
//                 }
//               >
//                 Claimable Rewards:
//               </p>
//               <p
//                 style={{ fontFamily: "GroupeMedium" }}
//                 className={"text-xl text-center font-bold text-gray-300"}
//               >
//                 {pendingReturns}
//               </p>
//               <button
//                 onClick={() => Claim()}
//                 style={{
//                   fontFamily: "GroupeMedium",
//                   backgroundColor: "#191919",
//                 }}
//                 className={
//                   "text-xl rounded-2xl px-6 py-2 font-bold hover:text-white text-gray-400"
//                 }
//               >
//                 Claim
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }
import "tailwindcss-elevation";
import { useWeb3React } from "@web3-react/core";
import Swal from "sweetalert2";
import { Accordion } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { abiObject } from "../../contracts/abi/abi.mjs";
import { Web3ReactProvider } from "@web3-react/core";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ScrollpositionAnimation from "../../hooks/OnScroll";
import styles from "../../styles/Home.module.css";
import HeaderComponent from "../../components/Header/HeaderComponent";

export default function StakeComponent() {
  return <main className={styles.main}>
  <header>
    {" "}
    <HeaderComponent></HeaderComponent>
  </header>{" "}
  
  <div className="min-h-screen grid sm:grid-cols-2 w-full">
      <div className="bg-blue-500 p-4 w-full">
        {/* Content for the first column */}
      </div>
      <div className="bg-green-500 p-4 w-full">
        {/* Content for the second column */}
      </div>
    </div>
  
</main>
}
