import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import linqABI from "../../contracts/abi/abi.json";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
} from "wagmi";
import Web3 from "web3";
import Swal from "sweetalert2";
import { LPStakingabiObject } from "../../contracts/abi/LpStakingAbi.mjs";
import { abiObject } from "../../contracts/abi/abi.mjs";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Provider } from "react-redux";
import { Log } from "viem";
interface LpStakeTabMenuProps {
  _token: number;
  setToken: (value: number) => void;
}

//// use round uptime
//need the preset value to hardcode
//if its less the preset value earse request inlcok

export default function LinqStakeTabMenu({
  _token,
  setToken,
}: LpStakeTabMenuProps) {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const { address } = useAccount();
  const linqAddress = "0x3e34eabf5858a126cb583107e643080cee20ca64";
  const StaqeFarm = "0xE4584C42A69F92Ffaa92AF5E7D5ff5e942F3cb34";

  const glinq = "0xe973Ea957fF5462B1076f5f61EF2df7A4B2f13d8";

  let { chain } = useNetwork();

  let current_chain = chain?.id;
  const [currentTime, setCurrentTime]: any = useState(0);
  const [_amountLinQ, set_amountLinQ]: any = useState();
  /*
  const { data } = useBlockNumber({
    chainId: current_chain,
    watch: true,
    onBlock(blockNumber) {
      setCurrentTime(blockNumber);
    },

  });

  */
  useEffect(() => {
    const fetchTimestamp = async () => {
      try {
        const web3 =
          current_chain === 1
            ? new Web3(
                "https://mainnet.infura.io/v3/e0171a3aab904c6bbe6622e6598770ad"
              )
            : new Web3(
                "https://goerli.infura.io/v3/e0171a3aab904c6bbe6622e6598770ad"
              );

        const block = await web3.eth.getBlock("latest");
        if (block) {
          const timestamp = Number(block.timestamp); // This is the block timestamp
          setCurrentTime(timestamp);
        } else {
          console.log("Block is pending");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTimestamp();
    const intervalId = setInterval(fetchTimestamp, 3000);

    return () => clearInterval(intervalId);
  }, [current_chain]);

  /*
  useEffect(() => {
    const provider = new ethers.JsonRpcProvider("https://twilight-lively-wish.discover.quiknode.pro/f952ff5ac1c946ffed4d7bc7e607f4e98eedef80/");
    provider.getBlock("latest")
    .then((block) => {
      if (block) {
        const timestamp = block.timestamp; // This is the block timestamp
        console.log(timestamp, "this is my timestamp");
        setCurrentTime(timestamp);
      } else {
        console.log("Block is pending");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}, [address]);
*/

  let [userdetails, setUserDetails]: any = useState();
  const [owned, setOwned] = useState(false);
  const [linqstaked, setLinqStaqbalance]: any = useState(0);
  const [ownedTill, setOwnedTill]: any = useState();
  const user = '0x3063096Ddb0fa4091058434B425d1F626CecB69E';
  const { data: UserDetails } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "LinQerParlours",
    chainId: current_chain,
    watch: true,
    args: [user],
    onSuccess(data: any) {
      setUserDetails(data);
      setLinqStaqbalance(Number(data[0].toString()) / 10 ** 18);
      setUnlockTime(Number(data[2].toString()));
      setOwnedTill(Number(data[8].toString()));
      setOwned(data[10]);
    },
  });
  const [inputValue, setInputValue] = useState(0);
  const calculateMaxBalance = () => {
    const maxBalance = linqBalance;
    setInputValue(maxBalance);
    set_amountLinQ(maxBalance);
  };

  const [unlocktime, setUnlockTime]: any = useState();

  const [unlockTimeInSeconds, setUnlockTimeInSeconds] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function secondsToDHMS(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    return { hours, minutes, seconds };
  }
  useEffect(() => {
    const unlockTimeInSeconds = unlocktime - currentTime;
    setUnlockTimeInSeconds(unlockTimeInSeconds);
    if (unlockTimeInSeconds <= 0) {
      return;
    }
    if (Number.isNaN(unlockTimeInSeconds)) {
      return;
    }
    const hours = Math.floor(unlockTimeInSeconds / 3600);
    const remainingSeconds = unlockTimeInSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  }, [unlocktime, currentTime]);
  console.log(ownedTill, "this is ownedtill");

  const [unlockPerpTimeInSeconds, setPerpUnlockTimeInSeconds] = useState(0);
  const [perpHours, setperpHours] = useState(0);
  const [perpMinutes, setperpMinutes] = useState(0);
  const [perpSeconds, setperpSeconds] = useState(0);

  useEffect(() => {
    const unlockPerpTimeInSeconds = Number(ownedTill) - Number(currentTime);
    setPerpUnlockTimeInSeconds(unlockPerpTimeInSeconds);
    if (unlockPerpTimeInSeconds <= 0) {
      return;
    }
    if (Number.isNaN(unlockPerpTimeInSeconds)) {
      return;
    }
    const perpHours = Math.floor(unlockPerpTimeInSeconds / 3600);
    const remainingSeconds = unlockPerpTimeInSeconds % 3600;
    const perpMinutes = Math.floor(remainingSeconds / 60);
    const perpSeconds = remainingSeconds % 60;
    setperpHours(perpHours);
    setperpMinutes(perpMinutes);
    setperpSeconds(perpSeconds);
  }, [ownedTill, currentTime]);

  ///Glinq stuff

  const { write: ApproveGlinq, isLoading: glinqLoad } = useContractWrite({
    address: glinq,
    abi: linqABI,
    functionName: "approve",
    chainId: current_chain,
    account: address,
    args: [StaqeFarm, Number(linqstaked.toString()) * 10 ** 18],
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured withApproving Glinq  please contact support if issue perists${err.cause}`,
      });
    },
  });
  let [GAllowance, setGAllowance]: any = useState();

  const { data: Gallowance } = useContractRead({
    address: glinq,
    abi: linqABI,
    functionName: "allowance",
    chainId: current_chain,
    args: [address, StaqeFarm],
    watch: true,
    onSuccess(data: any) {
      setGAllowance(Number(data.toString()) / 10 ** 18);
    },
  });

  ///////

  //linq approval
  let allowance_default = _amountLinQ > 1 ? _amountLinQ.toString() : "100";
  const { write: Approve, isLoading: approveLoad } = useContractWrite({
    address: linqAddress,
    abi: linqABI,
    functionName: "approve",
    chainId: current_chain,
    account: address,
    args: [StaqeFarm, Number(allowance_default) * 10 ** 18 * 1.2],
    onSuccess(data) {
      Swal.fire({
        icon: "success",
        title: "you have successfully Approved",
      });

      setAllowance(Number(allowance_default) * 10 ** 18 * 1.2);
    },
  });
  let [Allowance, setAllowance]: any = useState();

  const { data: allowance } = useContractRead({
    address: linqAddress,
    abi: linqABI,
    functionName: "allowance",
    chainId: current_chain,
    args: [address, StaqeFarm],
    watch: true,
    onSuccess(data: any) {
      setAllowance(Number(data.toString()) / 10 ** 18);
    },
  });
  //Begin all functions for Regular Linq Staqing
  const { write: unStaQe, isLoading: unstaqeLoad } = useContractWrite({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "unstaQe",
    args: [_amountLinQ * 10 ** 18, 0, 0],
    account: address,
    onSuccess(data) {
      Swal.fire({
        icon: "success",
        title: "you have successfully UnStaQed your Linq",
      });
    },
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured with UnStaqing please contact support if issue perists${err.cause}`,
      });
    },
  });

  /// rented till 2
  const { write: PerpSwitch, isLoading: perpLoad } = useContractWrite({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    chainId: current_chain,
    functionName: "ownCows",
    account: address,
    args: [0],
    onSuccess(data) {
      Swal.fire({
        icon: "success",
        title: "you have successfully Switched to Perpetual",
      });
    },
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured with switching please contact support if issue perists ${err.cause}`,
      });
    },
  });

  const { write: RequestUnlock, isLoading: unlockLoad } = useContractWrite({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    chainId: current_chain,
    functionName: "roundUpCows",
    args: [0],
    account: address,
    onSuccess(data) {
      Swal.fire({
        icon: "success",
        title: "you have successfully Requested Unlock",
      });
    },
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured with Requesting unlock please contact support if issue perists${err.cause}`,
      });
    },
  });

  const { write: StaQe, isLoading: staqeLoad } = useContractWrite({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "staQe",
    args: [_amountLinQ * 10 ** 18, 0, 0],
    account: address,
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured with Staqing please contact support if issue perists${err.cause}`,
      });
    },
  });

  async function HandleStaQe() {
    if (!address) {
      return;
    }

    if (_amountLinQ <= 0) {
      Swal.fire({
        icon: "error",
        title: `You must StaQe an amount above 0 `,
      });
      return;
    }
    try {
      StaQe();
      FetchDetails();
    } catch (error) {
      console.error("Staking failed:", error);
    }
  }

  const [update, setupdate] = useState("");
  function HandleUnStaQe() {
    if (!address) {
      return;
    }
    if (_amountLinQ <= 0) {
      Swal.fire({
        icon: "error",
        title: `You must StaQe an amount above 0 `,
      });
      return;
    }
    try {
      unStaQe();
      FetchDetails();
    } catch (error) {
      console.error("Staking failed:", error);
    }
  }

  const [totallinqStaked, settotalLinqStaked] = useState(0);
  const { data: daisys } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "daisys",
    watch: true,
    chainId: current_chain,
    onSuccess(data: any) {
      settotalLinqStaked(Number(data.toString()) / 10 ** 18);
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
  function FetchDetails() {
    UserDetails;
    daisys;
    allowance;
    Gallowance;
    BalanceOfLinq;
  }
  useEffect(() => {
    allowance;
    Gallowance;
    FetchDetails();
    const intervalId = setInterval(() => {
      UserDetails;
      FetchDetails();
    }, 3000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [_amountLinQ]);

  useEffect(() => {
    FetchDetails();
  }, []);

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, #3C3C3C 0%, #000000 100%, #000000 100%)",
      }}
      className="rounded-2xl px-3 w-fit py-3 opacity-90"
    >
      <div>
        <h1 className="text-xl md:text-2xl mb-10 text-white">
          Linq Token StaQing
        </h1>
        <>
          {owned == true ? (
            <h1 className="text-md  mb-6 text-white">
              You are Perpetually StaQed
            </h1>
          ) : (
            <h1 className="text-md mb-6 text-white">
              You are in Basic StaQing
            </h1>
          )}
        </>
        <h2 className="text-lg text-white">
          Please enter the amount of tokens
        </h2>

        <h2 className="text-md my-1 text-white">
          Available Linq To StaQe: {linqBalance.toFixed(2)}
        </h2>

        <div className="flex flex-col items-center justify-center">
          <div className={"flex flex-row"}>
            <input
              value={inputValue} // Use inputValue as the value of the input field
              type="number"
              id="stakeInput"
              className="w-64 border h-8 my-2 mr-4 border-gray-300 outline-none p-2 pr-10 text-black"
              style={{ fontFamily: "ethnocentricRg" }}
              onChange={(e) => {
                const newValue = Number(e.target.value);
                setInputValue(newValue);
                if (newValue < 0) {
                  set_amountLinQ(0);
                } else {
                  set_amountLinQ(newValue);
                }
              }}
            />
            <button
              style={{ fontFamily: "BebasNeue" }}
              className="text-white text-xl tracking-wide border border-white w-fit h-fit px-2 self-center rounded-sm
            hover:translate-x-1 hover:-translate-y-1 hover:scale-95 hover:duration-500"
              onClick={calculateMaxBalance}
            >
              Max
            </button>
          </div>
          {Allowance >= _amountLinQ ? (
            <>
              {" "}
              {staqeLoad ? (
                <Spin
                  size="large"
                  indicator={antIcon}
                  className="add-spinner"
                />
              ) : (
                <button
                  style={{ fontFamily: "GroupeMedium" }}
                  className="font-sans w-64 text-center cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 bg-black border-white border-2 text-white bg-black py-2 "
                  type="button"
                  onClick={() => HandleStaQe()}
                >
                  StaQe
                </button>
              )}
            </>
          ) : (
            <>
              {" "}
              {approveLoad ? (
                <Spin
                  size="large"
                  indicator={antIcon}
                  className="add-spinner"
                />
              ) : (
                <button
                  style={{ fontFamily: "GroupeMedium" }}
                  className="font-sans w-64 cursor-pointer text-md rounded-lg text-center border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                  type="button"
                  onClick={() => Approve()}
                >
                  Approve
                </button>
              )}
            </>
          )}

          <div className="flex-row justify-center my-3 items-center">
            {unstaqeLoad ? (
              <Spin size="large" indicator={antIcon} className="add-spinner" />
            ) : (
              <>
                {owned == true &&
                Number(GAllowance) <
                  Number(Number(userdetails[0].toString()) / 10 ** 18) ? (
                  <>
                    {glinqLoad ? (
                      <Spin
                        size="large"
                        indicator={antIcon}
                        className="add-spinner"
                      />
                    ) : (
                      <button
                        style={{ fontFamily: "GroupeMedium" }}
                        className="font-sans w-64 cursor-pointer text-md rounded-lg text-center border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                        type="button"
                        onClick={() => ApproveGlinq()}
                      >
                        Approve Glinq
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    {unstaqeLoad ? (
                      <Spin
                        size="large"
                        indicator={antIcon}
                        className="add-spinner"
                      />
                    ) : (
                      <>
                        {" "}
                        <button
                          onClick={() => HandleUnStaQe()}
                          style={{ fontFamily: "GroupeMedium" }}
                          className="font-sans cursor-pointer w-64 text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                          type="button"
                        >
                          UnStaQe
                        </button>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>

          <h2 className="text-lg text-red-600 w-80 mx-auto mb-2">
            UnstaQing before unlock time reaches 0 has a early withdraw fee
          </h2>
          <div className="flex flex-col justify-center items-center">
            {Number(unlocktime?.toString()) != 0 &&
            Number(unlocktime?.toString()) < currentTime &&
            owned == false ? (
              <>
                {" "}
                {perpLoad ? (
                  <Spin
                    size="large"
                    indicator={antIcon}
                    className="add-spinner"
                  />
                ) : (
                  <button
                    onClick={() => PerpSwitch()}
                    style={{ fontFamily: "GroupeMedium" }}
                    className="font-sans ml-2 cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 bg-yellow-500 border-white border-2 text-white bg-black py-2 px-5 sm:px-10 md:px-10 lg:px-10"
                    type="button"
                  >
                    Switch to Perpetual
                  </button>
                )}
              </>
            ) : (
              <></>
            )}
            {owned ? (
              <>
                {unlockLoad ? (
                  <Spin
                    size="large"
                    indicator={antIcon}
                    className="add-spinner"
                  />
                ) : (
                  <>
                    {" "}
                    {owned == true && ownedTill == 32503680000 ? (
                      <button
                        onClick={() => RequestUnlock()}
                        style={{ fontFamily: "GroupeMedium" }}
                        className="font-sans mt-3 cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 bg-yellow-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                        type="button"
                      >
                        Request Unlock
                      </button>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
            ) : (
              <></>
            )}
            <>
              {" "}
              {owned == true && ownedTill == 32503680000 ? (
                <></>
              ) : (
                <div className={"flex flex-col text-white w-fit px-2 mx-auto"}>
                  <h2 className="text-white text-sm px-2 mb-1">
                    Time Until request for Unlock Ends:{" "}
                  </h2>
                  <div className={'flex flex-row text-md mx-auto border border-white py-1 px-2'}
                  style={{fontFamily: 'BebasNeue'}} >
                    <p>Hours: {perpHours}</p>
                    <p className={'mx-2'}>Minutes: {perpMinutes}</p>
                    <p>Seconds: {perpSeconds}</p>
                  </div>
                </div>
              )}
            </>
          </div>
          <div>
            {" "}
            {owned == true && ownedTill <= currentTime ? (
              <h1 className="text-white text-md">
                Your Perpetual StaQe has ended
              </h1>
            ) : (
              <></>
            )}
          </div>
          <div>
            {" "}
            {linqstaked > 0 && owned == false && unlocktime <= currentTime ? (
              <h1 className="text-white text-md">
                Your Regular StaQe has ended
              </h1>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div
        style={{ fontFamily: "Azonix" }}
        className=" mt-5 opacity-90 flex flex-row transition-all duration-300 py-3"
      >
        <div
          className={
            "text-md grid grid-cols-3 col-span-1 gap-2 px-3 py-3 mx-auto"
          }
        >
          <h2 className="text-white md:w-40 text-sm px-2 py-2">
            StaQed Linq: <br />{" "}
            {userdetails
              ? (Number(userdetails[0].toString()) / 10 ** 18).toFixed(3)
              : 0}{" "}
            Linq
          </h2>
          <div className={"text-white text-sm mx-auto"}>
            {" "}
            <h2 className="text-white md:w-40 text-md px-2">
              Time Until Unlock:{" "}
            </h2>
            <p>Hours: {hours}</p>
            <p>Minutes: {minutes}</p>
            <p>Seconds: {seconds}</p>
          </div>
          <h2 className="text-white md:w-40 text-sm px-2">
            Your Pool %: <br />{" "}
            {userdetails
              ? (
                  (Number(userdetails[0].toString()) /
                    10 ** 18 /
                    totallinqStaked) *
                  100
                ).toFixed(3)
              : 0}
            %{" "}
          </h2>
        </div>
      </div>
    </div>
  );
}

/*
 
          <h2 className="text-white md:w-40 text-sm  px-2 py-2">
            Time Until Unlock:{" "}
            {owned == false ? (
              <>
                {" "}
                {unlocktime && unlocktime > currentTime
                  ? Number(unlocktime.toString()) -
                      Number(currentTime.toString()) >
                    0
                    ? Number(unlocktime.toString()) -
                      Number(currentTime.toString())
                    : "0"
                  : "0"}{" "}
                Seconds
              </>
            ) : (
              <>
                {" "}
                {ownedTill && ownedTill > currentTime
                  ? Number(ownedTill.toString()) -
                      Number(currentTime.toString()) >
                    0
                    ? Number(ownedTill.toString()) -
                      Number(currentTime.toString())
                    : "0"
                  : "0"}{" "}
                Seconds
              </>
            )}
          </h2>
            */
