//config
import { useEffect, useState } from "react";
import { useAccount, useContractWrite, useContractRead } from "wagmi";
import { KurveABI } from "../../contracts/abi/Kurve.mjs";
//styles
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import web3 from "web3";
const kurveContract = "0x68B63BE19A15A83a41CD487B7f8D32B83423d6FE";

export default function ClaimComponent() {
  const { address, isConnected } = useAccount();
  let current_chain = 11155111;
  const [_amountt, _setBurnAmount] = useState("0");
  const [_amount, _setmintReturnAmount] = useState("0");
  const [mintValue, setMintValue] = useState("");
  const [mintReturn, setMintReturn] = useState<string>("0");
  const [finalKurveBalance, setKurveBalance] = useState(0);

  const { data: kurveBalance } = useContractRead({
    address: kurveContract,
    abi: KurveABI,
    functionName: "balanceOf",
    chainId: current_chain,
    args: [address],
    onSuccess(data: any) {
      setKurveBalance(Number(data) / 10 ** 18);
    },
  });
  console.log("this is my Kurve Balance:", kurveBalance);


  const { refetch: fetchMintReturn, data } = useContractRead({
    address: kurveContract,
    abi: KurveABI,
    functionName: "calculateCurvedMintReturn",
    chainId: current_chain,
    args: [(Number(_amount) * 10**18).toString()],
    onSuccess(data: any) {
      setMintReturn((Number(data) / 10 ** 18).toString());
    },
  });

  useEffect(() => {
    const fetchReturn = async () => {
      const { data } = await fetchMintReturn();
      if (data) {
        try {
          const returnInEth = web3.utils.fromWei(data.toString(), "ether");
          setMintReturn(returnInEth);
        } catch (error) {
          console.error("Error converting mint return:", error);
        }
      }
    };

    if (_amount && _amount !== "0") {
      fetchReturn();
    }
  }, [_amount, fetchMintReturn]);

  const { write: Burn } = useContractWrite({
    address: kurveContract,
    abi: KurveABI,
    functionName: "burn",
    chainId: current_chain,
    watch: true,
    args: [web3.utils.toWei(_amountt, "ether")],
    account: address,
    onSuccess(data: any) {
      Swal.fire({
        icon: "success",
        title: "You have successfully burned!",
      });
    },
    onError(err: { cause: any }) {
      Swal.fire({
        icon: "error",
        title: `An error occured with UnStaqing please contact support if issue perists${err.cause}`,
      });
    },
  });

  function HandleBurn() {
    if (!address) {
      return;
    }
    if (!_amountt) {
      Swal.fire({
        icon: "error",
        title: `You must burn an amount above 0 you moron `,
      });
      return;
    }
    try {
      Burn();
    } catch (error) {
      console.error("Staking failed:", error);
    }
  }

  const { write: Mint } = useContractWrite({
    address: kurveContract,
    abi: KurveABI,
    functionName: "mint",
    chainId: current_chain,
    args: [],
    value: web3.utils.toWei(mintValue, "ether"),
    overrides: {
      value: web3.utils.toWei(mintValue, "ether"), // Convert the amount from Ether to Wei
    },
    onSuccess(data: any) {
      Swal.fire({
        icon: "success",
        title: "You have successfully bought! Good job there dum dum...",
      });
    },
    onError(err: { cause: any }) {
      Swal.fire({
        icon: "error",
        title: `An error occurred with minting, please contact support if issue persists. ${err.cause}`,
      });
    },
  });

  useEffect(() => {
    finalKurveBalance;
  }, [address, finalKurveBalance]);

  return (
    <>
      <div className=" py-6 px-4 flex flex-col mx-auto inline-block w-[350px] sm:w-[350px] md:w-[550px] lg:w-[650px] overflow-x-auto opacity-80 bg-white">
        <p
          className="text-[15px] sm:text-[20px] md:text-[23px] lg:md:text-[25px] font-semibold text-black"
          style={{ fontFamily: "Azonix" }}
        >
          KURVE TIME BITCHES
        </p>
        <p className={"my-5"}></p>
        <div
          className="flex flex-col md:flex-row lg:flex-row md:justify-between lg:justify-between
         font-sans text-black border-b-[1px] mx-auto pb-3 border-gray-500 mt-5 mb-5"
        >
          {/* <p
            className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px]"
            style={{ textAlign: "initial", fontFamily: "GroupeMedium" }}
          >
            Your Current KURVE Balance{" "}
          </p>
          <p
            className="mr-6 flex justify-start
            text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] max-w-[270px]"
            style={{ fontFamily: "Azonix" }}
          >
            {finalKurveBalance}
          </p> */}
           <input
        value={_amount}
        type="number"
        id="mintInput"
        placeholder="Enter ETH amount"
        className="w-64 border h-8 my-2 mr-4 border-gray-300 outline-none p-2 pr-10 text-black"
        style={{ fontFamily: "ethnocentricRg" }}
        onChange={(e) => {
          _setmintReturnAmount(e.target.value);
        }}
      />
      <p
        className="mr-6 flex justify-start text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] max-w-[270px]"
        style={{ fontFamily: "Azonix" }}
      >
        Your final mint return: {mintReturn} KURVE
      </p>
        </div>
        <div className="flex justify-center items-center mt-10 ">
          <input
            value={mintValue}
            type="number"
            id="mintInput"
            placeholder="do it fucker"
            className="w-64 border h-8 my-2 mr-4 border-gray-300 outline-none p-2 pr-10 text-black"
            style={{ fontFamily: "ethnocentricRg" }}
            onChange={(e) => {
              setMintValue(e.target.value);
              ("ETH");
            }}
          />
          <button
            style={{ fontFamily: "ethnocentricRg" }}
            className="bg-black border border-white rounded-2xl duration-500 px-4 py-2 transition-all
           text-md text-white hover:bg-white hover:text-black hover:border-4 hover:border-black active:scale-90"
            onClick={() => Mint()}
          >
            BUY YO SHIT!
          </button>
        </div>
        <div className="flex justify-center items-center mt-10 ">
          <input
            value={_amountt}
            type="number"
            placeholder="do it fucker!"
            className="w-64 border h-8 my-2 mr-4 border-gray-300 outline-none p-2 pr-10 text-black"
            style={{ fontFamily: "ethnocentricRg" }}
            readOnly
            onChange={(e) => {
              _setBurnAmount(e.target.value);
              ("KURVE");
            }}
          />

          <button
            style={{ fontFamily: "ethnocentricRg" }}
            className="bg-black border border-white rounded-2xl duration-500 px-4 py-2 transition-all
             text-md text-white hover:bg-white hover:text-black hover:border-4 hover:border-black active:scale-90"
            type="button"
            onClick={() => HandleBurn()}
          >
            SELL YO SHIT!
          </button>
        </div>
        <p style={{ fontFamily: "Azonix", opacity: 0.5 }}>fucker</p>
      </div>

      <div className="fixed mb-10 text-white px-2 sm:px-5 md:px-10 lg:px-10 left-0 bottom-0 bg-transparent  w-full  grid grid-cols-2 ">
        <p
          className="font-sans text-[18px] sm:text-[15px] md:text-[15px] lg:text-[16px] 
        col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 "
          style={{ fontFamily: "Azonix" }}
        >
          KURVE TIME
        </p>
        <p
          className="font-sans text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] 
        col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1"
          style={{ fontFamily: "Azonix" }}
        >
          KURVE TIME
        </p>
      </div>
    </>
  );
}
