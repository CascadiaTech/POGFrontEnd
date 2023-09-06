import React, { useCallback, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Swal from "sweetalert2";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import fourteenDayStackAbi from "../../contracts/abi/14DayStackabi.json";
import LPTokenAbi from "../../contracts/abi/LPTokenAbi.json";
const fourteenDayContractAddress = "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb";
const LPtokenContract = "0xA8A837E2bf0c37fEf5C495951a0DFc33aaEAD57A";

const OverviewComponent = () => {
    const { address, isConnected } = useAccount()
    const fourteenDayContractAddress = "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb";
    const LPtokenContract = "0xA8A837E2bf0c37fEf5C495951a0DFc33aaEAD57A";


    const { write: unstake } = useContractWrite({
        address: "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb",
        abi: fourteenDayStackAbi,
        functionName: 'unstake',
        account: address
    })

    const { write: WithdrawRewards } = useContractWrite({
        address: "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb",
        abi: fourteenDayStackAbi,
        functionName: 'withdrawReward',
        account: address
    })
    const { data: UserBalanceInStaking } = useContractRead({
        address: "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb",
        abi: fourteenDayStackAbi,
        functionName: "getLpDepositsForUser",
        chainId: 1,
        onSuccess(data) {
          console.log('Success', UserBalanceInStaking)
        },
      });
      const { data: UserClaimableBalance } = useContractRead({
        address: "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb",
        abi: fourteenDayStackAbi,
        functionName: "calculateRewardSinceLastClaim",
        chainId: 1,
        args: [address],
        onSuccess(data) {
          console.log('Success', UserClaimableBalance)
        },
      });
      const { data: UserTimeLeft} = useContractRead({
        address: "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb",
        abi: fourteenDayStackAbi,
        functionName: "checkRemainingTime",
        args: [address],
        chainId: 1,
        onSuccess(data) {
          console.log('Success', UserTimeLeft)
          //Currently returning an array, not a number representing the usertimeleft
        },
      });

    const [loading, setLoading] = useState(false);
    const [unstakeStatus, setUnstakeStatus] = useState(false);
    const [rewards, setRewards] = useState(0);

    const [newrewards, setnewRewards] = useState(Number);




    return (
        <div
            style={{ fontFamily: "GroupeMedium" }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
            {/* Rewards Section */}
            <div className="flex flex-col items-center border border-gray-300 p-4 md:p-6 rounded-lg">
                <p className="text-xl text-gray-700 font-semibold mb-2">
                    Available Rewards:
                </p>
                <p className="text-xl text-gray-700 font-semibold border-[1px] text-center border-black rounded-md px-2 md:px-4 py-1 w-36">
                    {newrewards ? newrewards : "0"}
                </p>

                <button
                    type="button"
                    onClick={()=>WithdrawRewards()}
                    disabled={newrewards === 0}
                    className={`rounded-lg ${rewards === 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-slate-900 to-black"
                        } text-gray-400 focus:ring-4 focus:ring-blue-300 mt-3 md:mt-4 text-md px-2 py-2`}
                >
                    <p
                        className={`cursor-pointer block text-sm sm:text-base text-center ${rewards === 0 ? "text-gray-600" : "text-gray-400"
                            } rounded`}
                        style={{ fontFamily: "GroupeMedium" }}
                    >
                        Collect Reward
                    </p>
                </button>
            </div>

{/* Unstake Section */}
            <div className="flex flex-col items-center justify-center border border-gray-300 p-4 md:p-6 rounded-lg">
                <p className="text-xl text-gray-700 font-semibold">Unstake Status:</p>
                <p className="text-xl text-gray-700 font-semibold  px-2 md:px-4 py-1  text-center">
                    {" "}
                    {unstakeStatus ? "Available" : "Unavailable"}{" "}
                </p>
                <button
                    type="button"
                    onClick={()=>unstake()}
                    disabled={!unstakeStatus}
                    className={`rounded-lg ${!unstakeStatus
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-slate-900 to-black"
                        } text-gray-400 focus:ring-4 focus:ring-blue-300 mt-3 md:mt-4 text-md px-2 py-2`}
                >
                    <p
                        className={`cursor-pointer block text-sm sm:text-base text-center ${!unstakeStatus ? "text-gray-600" : "text-gray-400"
                            } rounded`}
                        style={{ fontFamily: "GroupeMedium" }}
                    >
                        Unstake
                    </p>
                </button>
            </div>
        </div>
    );
};

const StackComponent = () => {
    const { account } = useWeb3React();
    const context = useWeb3React();
    const { library } = context;
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState("0");
    const [max, setMax] = useState("0");
 
    const {address} = useAccount()

    const { write: approval } = useContractWrite({
        address: LPtokenContract,
        abi: LPTokenAbi,
        functionName: 'approve',
        args:[fourteenDayContractAddress, "100000000000000000000000000"],
        account: address
      })
      const [stake_amount, set_stake_amount] = useState(Number)

      const { write: Stake } = useContractWrite({
        address: "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb",
        abi: fourteenDayStackAbi,
        functionName: 'stake',
        args: [(stake_amount) * 10 **18],
        account: address
    })

    const { data: balanceOf } = useContractRead({
        address: LPtokenContract,
        abi: LPTokenAbi,
        functionName: "balanceOf",
        chainId: 1,
        args: [address],
        onSuccess(data) {
          console.log('Success', balanceOf)
        },
      });

      setMax(balanceOf as string)

    // they fetched users linq balance
    
    useEffect(() => {
        balanceOf
    }, []);

const handleMaxClick = () => {
        if (max === "0") {
            Swal.fire({
                icon: "error",
                title: "No Tokens in the wallet",
                timer: 5000,
            });
        } else {
            setAmount(max);
        }
    };
 
    return (
        <div
            style={{ fontFamily: "GroupeMedium" }}
            className="py-6 px-4 m-auto sm:p-10   w-[350px] sm:w-[350px] md:w-[550px] lg:w-[450px]   bg-white"
        >
            <div className="flex flex-col ">
                <div className="relative   rounded-lg p-2">
                    <label htmlFor="stakeIpnut " className="text-sm">
                        Available Tokens : {max}
                    </label>
                    <input
                        type="text"
                        id="stakeIpnut"
                        className="w-full border-0 outline-none p-2 pr-10 text-black "
                        value={amount}
                        max={10000}
                        min={0}
                        style={{ fontFamily: "GroupeMedium" }}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <button
                        onClick={handleMaxClick}
                        className="absolute top-[65px] transform -translate-y-1/2 w-[80px] h-[50px] right-2 bg-transparent border-0 outline-none bg-black text-white"
                    >
                        MAX
                    </button>
                </div>
                <div className="flex justify-center items-center">
                    <button
                        style={{ fontFamily: "GroupeMedium" }}
                        className="font-sans  cursor-pointer text-[20px] rounded-lg text-center border-black border-2 text-white bg-black py-2 px-5 sm:px-10 md:px-10 lg:px-10"
                        type="button"
                        onClick={() => Stake}
                        disabled={loading}
                    >
                        Stake
                    </button>
                </div>
            </div>
        </div>
    );
};

const StackingCompnent = () => {
    const [activeStep, setActiveStep] = useState("overview");
    //@ts-ignore
    const handleStepChange = (step) => {
        setActiveStep(step);
    };

return (
        <>
            <div className="py-5 px-4 sm:p-5 mt-5 sm:mt-10 md:mt-10 lg:mt-15  w-[350px] sm:w-[350px] md:w-[550px] min-h-[450px] lg:w-[700px] bg-white">
                <h1
                    className="text-black font-sans flex justify-center text-center items-center text-[30px]"
                    style={{ fontFamily: "GroupeMedium" }}
                >
                    14 Day Staking
                </h1>
                <div className="flex flex-col md:flex-row lg:flex-row md:justify-between lg:justify-between font-sans text-black border-b-[1px] pb-3 border-gray-500 mt-5 mb-5"></div>
                <div className="flex justify-center items-center">
                    <button
                        style={{ fontFamily: "GroupeMedium" }}
                        className={`font-sans mr-6  cursor-pointer md:text-[20px] lg:text-[20px] sm:text-[10px]  rounded-lg text-center border-black border-2 py-2 px-5 sm:px-10 md:px-10 lg:px-10 ${activeStep === "overview"
                                ? "text-black bg-gray-300"
                                : "text-gray-500"
                            }`}
                        type="button"
                        onClick={() => handleStepChange("overview")}
                    >
                        Overview
                    </button>
                    <button
                        style={{ fontFamily: "GroupeMedium" }}
                        className={`font-sans ml-6  cursor-pointer  md:text-[20px] lg:text-[20px] sm:text-[10px] rounded-lg text-center border-black border-2 py-2 px-5 sm:px-10 md:px-10 lg:px-10 ${activeStep === "stack"
                                ? "text-black bg-gray-300"
                                : "text-gray-500"
                            }`}
                        type="button"
                        onClick={() => handleStepChange("stack")}
                    >
                        Stake
                    </button>
                </div>
                <div className="mt-4">
                    {activeStep === "overview" && <OverviewComponent />}
                    {activeStep === "stack" && <StackComponent />}
                </div>
            </div>
        </>
    );
};

export default StackingCompnent;