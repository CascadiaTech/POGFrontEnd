// import "tailwindcss-elevation";
// import { useWeb3React } from "@web3-react/core";
// import Swal from "sweetalert2";
// import { Accordion } from "flowbite-react";
// import { useCallback, useEffect, useState } from "react";
// import Web3 from "web3";
// import {
//   ExternalProvider,
//   JsonRpcFetchFunc,
//   Web3Provider,
// } from "@ethersproject/providers";
// import { Contract } from "@ethersproject/contracts";
// import { abiObject } from "../../contracts/abi/abi.mjs";
// import { Web3ReactProvider } from "@web3-react/core";
// import { Spin } from "antd";
// import { LoadingOutlined } from "@ant-design/icons";
// import ScrollpositionAnimation from "../../hooks/OnScroll";

// export default function StakeComponent() {
//   const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
//   const { account } = useWeb3React();
//   const context = useWeb3React();
//   const [loading, setLoading] = useState(false);
//   const [claim, setcanclaim] = useState(Boolean);
//   const { library } = context;
//   const [Claimable, setClaimable] = useState(false);

//   const [pendingreflections, setpendingreflections] = useState(Number);
//   const [totaldistributed, settotaldistributed] = useState(Number);
//   const [balance, setbalance] = useState(Number);

//   useEffect(() => {
//     async function Fetchbalance() {
//       if (!account) {
//         return;
//       }

//       try {
//         setLoading(true);
//         const abi = abiObject;
//         const provider = new Web3Provider(
//           library?.provider as ExternalProvider | JsonRpcFetchFunc
//         );
//         const contractaddress = "0x3e34eabF5858a126cb583107E643080cEE20cA64"; // "clienttokenaddress"
//         const contract = new Contract(contractaddress, abi, provider);
//         const balance = await new contract.balanceOf(account); //.claim(account,amount)
//         const Claimtxid = await balance;
//         const finalbalance = Number(balance);
//         const Fixeddecimals = finalbalance.toFixed(2);
//         const Numberify = Number(Fixeddecimals);
//         setbalance(Numberify);
//         console.log(Numberify);

//         return Claimtxid;
//         /////
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//       } finally {
//         setLoading(false);
//       }
//     }

//     async function PendingReflections() {
//       try {
//         setLoading(true);
//         const abi = abiObject;
//         const provider = new Web3Provider(
//           library?.provider as ExternalProvider | JsonRpcFetchFunc
//         );
//         const contractaddress = "0x3e34eabF5858a126cb583107E643080cEE20cA64"; // "clienttokenaddress"
//         const contract = new Contract(contractaddress, abi, provider);
//         const Reflections = await contract.withdrawableDividendOf(account); //.claim()
//         const finalnumber = Web3.utils.fromWei(Reflections.toString());
//         setpendingreflections(finalnumber);

//         if (finalnumber > 0) {
//           setClaimable(true);
//         }
//         console.log(Reflections);
//         console.log(finalnumber);
//         return finalnumber;
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//       } finally {
//         setLoading(false);
//       }
//     }

//     async function FetchDistributed() {
//       try {
//         setLoading(true);
//         const abi = abiObject;
//         const provider = new Web3Provider(
//           library?.provider as ExternalProvider | JsonRpcFetchFunc
//         );
//         const contractaddress = "0x3e34eabF5858a126cb583107E643080cEE20cA64"; // "clienttokenaddress"
//         const contract = new Contract(contractaddress, abi, provider);
//         const rewardToken = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
//         const Reflections = await contract.getTotalDividendsDistributed();
//         const formattedDistributed = Web3.utils.fromWei(Reflections.toString());
//         settotaldistributed(formattedDistributed);
//         console.log(formattedDistributed);

//         return formattedDistributed;
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//       } finally {
//         setLoading(false);
//       }
//     }

//     PendingReflections();
//     Fetchbalance();
//     FetchDistributed();
//   }, [account]);

//   const Claimtoken = useCallback(async () => {
//     if (!account) {
//       Swal.fire({
//         icon: "error",
//         title: "Connect Your Wallet To Claim",
//         timer: 5000,
//       });
//     }

//     try {
//       setLoading(true);
//       const data = abiObject;
//       const abi = data;
//       const contractaddress = "0x3e34eabF5858a126cb583107E643080cEE20cA64"; // "clienttokenaddress"
//       const provider = new Web3Provider(
//         library?.provider as ExternalProvider | JsonRpcFetchFunc
//       );
//       const signer = provider.getSigner();
//       const contract = new Contract(contractaddress, abi, signer);
//       console.log(contract);
//       const ClaimTokens = await contract.claim(); //.claim()
//       const signtransaction = await signer.signTransaction(ClaimTokens);
//       const Claimtxid = await signtransaction;
//       Swal.fire({
//         icon: "success",
//         title: "Congratulations you have Claimed all of your rewards",
//         text: "Go see them in your wallet, and stick around for the next drop",
//       });
//       return Claimtxid;
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }, [account, library?.provider]);

//   return (
//     <>
//       <div className="flex flex-col w-fit absolute z-10">
//         <h5
//           style={{ fontFamily: "Azonix" }}
//           className="text-center mb-2 text-4xl font-bold tracking-wide self-center text-gray-300 dark:text-gray-300"
//         >
//           Staking Station
//         </h5>
//         <div
//           className={" mx-4 flex flex-col border-2 border-gray-500 rounded-2xl px-6 py-4"}
//           style={{ backgroundColor: "#0d0d0d" }}
//         >
//                 <p
//                 style={{ fontFamily: "GroupeMedium" }}
//                 className={"text-xl font-bold text-gray-300 my-2"}
//               >
//                 Amount you want to stake or unstake
//               </p>
//           <input
//             style={{ backgroundColor: "#4a4a4a" }}
//             className={"border-2 border-gray-300 rounded-2xl px-4 py-2"}
//           ></input>
//           <div className="flex-row mx-auto justify-center">
//             <button style={{backgroundColor: '#191919'}} className={"rounded-xl text-black  text-xl px-4 py-2 m-3"}>
//               <p
//                 style={{ fontFamily: "GroupeMedium" }}
//                 className={"text-xl font-bold text-gray-300"}
//               >
//                 Approve
//               </p>
//             </button>
//             <button style={{backgroundColor: '#191919'}} className={"rounded-xl text-black  text-xl px-4 py-2 m-3"}>
//               <p
//                 style={{ fontFamily: "GroupeMedium" }}
//                 className={"text-xl font-bold text-gray-300"}
//               >
//                 Stake
//               </p>
//             </button>
//           </div>{" "}
//           <button
//             style={{
//               fontFamily: "GroupeMedium",
//               backgroundColor: "#cf0404",
//             }}
//             className={"text-xl rounded-2xl font-bold text-gray-800"}
//           >
//             Un Stake
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
import "tailwindcss-elevation";
import HeaderComponent from "../../components/Header/HeaderComponent";

export default function StakeComponent() {
  return <main>
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
