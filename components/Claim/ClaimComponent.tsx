
import { useCallback, useEffect, useState } from "react";
import styles from '../styles/Home.module.css';
import {
  configureChains, createConfig, WagmiConfig, useAccount, useEnsName, useContractWrite, useContractRead,
} from 'wagmi';
import { abiObject } from "../../contracts/abi/abi.mjs";
import { usePublicClient } from 'wagmi'
import { useWalletClient } from 'wagmi'

export default function ClaimComponent() {
  const { address, isConnected } = useAccount()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const [loading, setLoading] = useState(false);
  const [claim, setcanclaim] = useState(Boolean);

  const [Claimable, setClaimable] = useState(false);

  const [pendingreflections, setpendingreflections] = useState(Number);
  const [totaldistributed, settotaldistributed]:any = useState(Number);
  const [balance, setbalance]:any = useState(Number);
  const { data: PendingReflections } = useContractRead({
    address: "0x3e34eabF5858a126cb583107E643080cEE20cA64",
    abi: abiObject,
    functionName: "withdrawableDividendOf",
    chainId: 1,
    args: [address],
    onSuccess(data) {
      console.log('Success',  PendingReflections)
    },
  });
  const { data: TotalDividends } = useContractRead({
    address: "0x3e34eabF5858a126cb583107E643080cEE20cA64",
    abi: abiObject,
    functionName: "getTotalDividendsDistributed",
    chainId: 1,
    onSuccess(data) {
      console.log('Success',  TotalDividends)
    },
  });
  const { data: balanceOf } = useContractRead({
    address: "0x3e34eabF5858a126cb583107E643080cEE20cA64",
    abi: abiObject,
    functionName: "balanceOf",
    chainId: 1,
    args: [address],
    onSuccess(data) {
      console.log('Success',  balanceOf)
    },
  });
  function Fetchbalance() {
    if (!address) {
      return;
    }
    try {
      setLoading(true);
      setbalance(balanceOf);
      return balanceOf;
      /////
    } catch (error) {
      console.log(error, "ERROR 1111");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

 function fetchPendingReflections() {
    try {
      setLoading(true);



     const stringed:string =  PendingReflections?.toString() as string

      const fixedNumber = parseFloat(stringed).toFixed(6);
      const NumberNum = Number(fixedNumber)

      setpendingreflections(NumberNum);

      return NumberNum;
    } catch (error) {
      console.log(error, "error 2");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  function FetchDistributed() {
    try {
      setLoading(true);
      const abi = abiObject;


      const stringed:string =  TotalDividends?.toString() as string
      const fixedNumber = parseFloat(stringed)
      const NumberNum = Number(fixedNumber.toFixed(2))
      settotaldistributed(NumberNum);
      return NumberNum;
    } catch (error) {
      console.log(error, "error 3");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchPendingReflections()
    Fetchbalance();
    FetchDistributed();
  }, [address]);


const {write: Claimwrite } = useContractWrite({
    address: "0x3e34eabF5858a126cb583107E643080cEE20cA64",
    abi: abiObject,
    functionName: 'claim',
    account: address
  })


async function Claim(){
Claimwrite()
}

  return (
    <>
      
      {/* <div className="mt-12 w-[170px] sm:w-[300px] md:w-[350px] lg:w-[500px] "> */}
        <div className=" py-6 px-4 sm:p-10 mt-5 sm:mt-10 md:mt-10 lg:mt-15 inline-block w-[350px] sm:w-[350px] md:w-[550px] lg:w-[650px] overflow-x-auto opacity-80 bg-white">
          <p className="text-[15px] sm:text-[20px]  md:text-[23px] lg:md:text-[25px] font-semibold text-black"
          style={{ fontFamily: "Azonix" }}>
            CLAIM LP REWARDS
          </p>

          <div className="flex flex-col md:flex-row lg:flex-row  md:justify-between lg:justify-between font-sans text-black border-b-[1px] pb-3 border-gray-500 mb-10 mt-10">
            <p className="col-span-2  sm:col-span-1  md:col-span-1 lg:col-span-1 text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] " style={{textAlign:'initial', fontFamily: "GroupeMedium" }}>Pending LP Rewards </p>
            <p className="mr-6 flex justify-start
            text-[10px] sm:text-[15px] md:text-[15px] lg:text-[16px] max-w-[270px]"
            style={{ fontFamily: "GroupeMedium" }}>
              {pendingreflections}
              {/* 23123.23213232312321321231232 */}
              </p>
          </div>

          <div className="flex flex-col md:flex-row lg:flex-row md:justify-between lg:justify-between font-sans text-black border-b-[1px] pb-3 border-gray-500 mt-5 mb-5">
            <p className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px]" style={{textAlign:'initial' ,fontFamily: "GroupeMedium" }}>Total LP Distributed </p>
            {/* <p className="mr-4 col-span-2 justify-self-start  sm:justify-self-end md:justify-self-end lg:justify-self-end  sm:col-span-1 md:col-span-1 lg:col-span-1">{totaldistributed}</p> */}
            <p className="mr-6 flex justify-start
            text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] max-w-[270px]" 
            style={{ fontFamily: "GroupeMedium" }}>
              {totaldistributed}
              {/* 23123.23213232312321321231232 */}
              </p>
          </div>
          {/* <div className="grid grid-cols-2 font-sans text-black border-b-[1px] pb-3 border-gray-500 mt-5 mb-5">
            <p className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px]" style={{textAlign:'initial' ,fontFamily: "GroupeMedium" }}>Total LP Distributed </p>
            <p className="mr-4 col-span-2 justify-self-start  sm:justify-self-end md:justify-self-end lg:justify-self-end  sm:col-span-1 md:col-span-1 lg:col-span-1 
            text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] max-w-[200px]" 
            style={{ fontFamily: "GroupeMedium", wordWrap: "break-word" }}>
              23123.23213232312321321231232
              </p>
          </div> */}

          {loading ? (
            <Spin indicator={antIcon} className="add-spinner" />
          ) : (
            <>
               <div className="flex justify-center items-center mt-10 ">
                <button
                   style={{ fontFamily: "Azonix"}}
                   className="font-sans cursor-pointer text-[20px] rounded-lg text-center bg-gradient-to-r from-black to-black  text-white py-2 px-5 sm:px-10 md:px-10 lg:px-10"
                  type="button"
                  onClick={() => Claimwrite()}
                >
                 LP CLAIM
                </button>
              </div>
            </>
          )}
        </div>
      {/* </div> */}

      <div className="fixed mb-10 px-2 sm:px-5 md:px-10 lg:px-10 left-0 bottom-0 bg-transparent  w-full  grid grid-cols-2 ">
        <p className="font-sans text-black text-[18px] sm:text-[15px] md:text-[15px] lg:text-[16px] 
        col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 " style={{ fontFamily: "Azonix" }}>LINQGROUP.IO</p>
        <p className="font-sans text-black text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] 
        col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1" style={{ fontFamily: "Azonix" }}>LINQGROUP2023</p>
      </div>

      {/* 
        <h5
          style={{ fontFamily: "Azonix" }}
          className="text-center mb-2 text-4xl font-bold tracking-wide self-center text-gray-300 dark:text-gray-300"
        >
          Claim LP Rewards
        </h5>
        <div className="md:grid grid-cols-2 mx-4 flex flex-col border-2 border-gray-500 rounded-xl">
          <div className={"rounded-xl text-black text-xl px-4 py-2 m-3"}>
            <p style={{fontFamily: 'GroupeMedium'}} className={"text-xl font-bold text-gray-300"}>
              Pending LP Rewards:
            </p>
          </div>
          <div className={"rounded-xl text-black text-xl px-4 py-2 m-3"}>
            <p className={"text-xl text-gray-300 "}>{pendingreflections}</p>
          </div>
          <div className={"rounded-xl text-black  text-xl px-4 py-2 m-3"}>
            <p style={{fontFamily: 'GroupeMedium'}} className={"text-xl font-bold text-gray-300"}>
              Total LP Distributed
            </p>
          </div>
          <div className={"rounded-xl text-black text-xl px-4 py-2 m-3"}>
            <p className={"text-xl text-gray-300"}>{totaldistributed}</p>
          </div>
        </div> */}

      {/* {loading ? (
          <Spin indicator={antIcon} className="add-spinner" />
        ) : (
          <>
            <div className="flex flex-row content-center mx-auto items-center max-w-screen">
              <button
                style={{ fontFamily: "Azonix" }}
                type="button"
                onClick={() => Claimtoken()}
                className="w-fit mx-0 px-20 md:px-32 self-center content-center tn:mx-0 elevation-10 hover:elevation-50 md:mx-24 h-24
                 clip-path-mycorners justify-self-center mt-10 text-gray-800 bg-gray-300 hover:bg-gray-400 hover:cursor-pointer transition ease-in-out duration-700
                 text-3xl lg:text-4xl hover:scale-95 "
              >
                Claim
              </button>
            </div>
          </>
        )} */}
    </>
  );
}
