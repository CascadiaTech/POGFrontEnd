import React, { useState, useEffect } from "react";
import styled from "styled-components";
import upArrow from "../assets/images/up-arrow.png";
import downArrow from "../assets/images/down-arrow.png";
import Image from "next/image";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
//abi's
import { KurveABI } from "../contracts/abi/Kurve.mjs";
import Swal from "sweetalert2";
import web3 from "web3";

const TokenInput = styled.div`
  font-family: Gotham-Bold;
  background-color: #212429;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 10px;
  &:hover {
    border-color: #353a42;
  }
`;
const TokenSelect = styled.select`
 font-family: Gotham-Bold;
  background-color: #191b1f;
  border: 1px solid #40444f;
  border-radius: 20px;
  color: #fff;
  padding: 5px 10px;
  &:hover {
    border-color: #ffffff;
  }
  transition: all;
  transition-duration: 300ms;
`;
const ArrowWrapper = styled.div`
  text-align: center;
  color: #ffffff;
  width: fit-content;
  height: fit-content;
  margin-botton: 6px
  margin-top: 6px  
  &:hover {
    border-color: #ffffff;
  }
  transition: all;
  transition-duration: 300ms;
`;
import { getBalance } from '@wagmi/core'
import { http, createConfig } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'



const SwapComponent: React.FC = () => {
  const [fromToken, setFromToken] = useState({ amount: "0", token: "ETH" });
  const [toToken, setToToken] = useState({ amount: "0", token: "KURVE" });
  const kurveContract = "0x68B63BE19A15A83a41CD487B7f8D32B83423d6FE";
  const { address, isConnected, } = useAccount();
  const [_amount, _setmintReturnAmount] = useState("0");
  const [burnedcalc, setburnCalc] = useState("0");
  const [mintcalc, setmintCalc] = useState("0");

 const config = createConfig({
    chains: [mainnet, sepolia],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  })
/*

  async function fetchBalance(){
    const balance = await getBalance(config, {
      address: address || "0x"
    })
    return balance
  }


  useEffect(() => {

    let balance;
    async function fetchBalance(){
      balance = await getBalance(config, {
        address: address || "0x"
      })
      return balance
    }

    fetchBalance()
    console.log(fetchBalance())
   },[])
*/
  function SetMintAmount(input:string){
    const value = Number(input);
    if(value <= 0){
      return
    }else{
      _setmintReturnAmount(value.toString())
    }
  }

  const displayValue = fromToken.token == "ETH" ? mintcalc : burnedcalc;

  function handlePrice() {
    if (fromToken.token == "ETH") {
      fetchMintReturn;
    } else {
      fetchBurnReturn;
    }
  }

  useEffect(() => {
    handlePrice();
    setFromToken({ ...fromToken, amount: _amount });
  }, [_amount]);

  const [kurvedMintReturn, setKurvedMintReturn] = useState<string>("0");
  let current_chain = 11155111;

  const handleFromAmountChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFromToken({ ...fromToken, amount: e.target.value });
  };

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToToken({ ...toToken, amount: e.target.value });
  };

  const [finalKurveBalance, setKurveBalance] = useState(0);

  const { data: kurveBalance } = useContractRead({
    address: kurveContract,
    abi: KurveABI,
    functionName: "balanceOf",
    chainId: current_chain,
    watch: true,
    args: [address],
    onSuccess(data: any) {
      setKurveBalance(Number(data) / 10 ** 18);
    },
  });

  const { refetch: fetchMintReturn } = useContractRead({
    address: kurveContract,
    abi: KurveABI,
    functionName: "calculateCurvedMintReturn",
    chainId: current_chain,
    args: [(Number(_amount) * 10 ** 18).toString()],
    onSuccess(data: any) {
      setmintCalc((Number(data) / 10 ** 18).toString());
    },
  });

  const { refetch: fetchBurnReturn } = useContractRead({
    address: kurveContract,
    abi: KurveABI,
    functionName: "calculateCurvedBurnReturn",
    chainId: current_chain,
    args: [(Number(_amount) * 10 ** 18).toString()],
    onSuccess(data: any) {
      setburnCalc((Number(data) / 10 ** 18).toString());
    },
  });

  const handleFromTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromToken({ ...fromToken, token: e.target.value });
  };

  const handleToTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToToken({ ...toToken, token: e.target.value });
  };

  const handleReverseTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const { write: Mint } = useContractWrite({
    address: kurveContract,
    abi: KurveABI,
    functionName: "mint",
    chainId: current_chain,
    args: [],
    value:[(Number(fromToken.amount) * 10 ** 18).toString()],
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

  const { write: Burn } = useContractWrite({
    address: kurveContract,
    abi: KurveABI,
    functionName: "burn",
    chainId: current_chain,
    args: [(Number(fromToken.amount) * 10 ** 18).toString()],
    overrides: {
      gasLimit: 500000,
    },
    onSuccess(data: any) {
      Swal.fire({
        icon: "success",
        title: "You have successfully burned!",
      });
    },
    onError(err: { cause: any }) {
      Swal.fire({
        icon: "error",
        title: `An error occurred with burning, please contact support if issue persists. ${err.cause}`,
      });
    },
  });

  const handleConditionalSwap = () => {
    if (address == null) {
      Swal.fire({
        icon: "error",
        title: `You Must Connect Your Wallet To Swap`,
      });
    }
    if (fromToken.token === "ETH") {
      Mint();
    } else if (fromToken.token === "KURVE") {
      Burn();
    }
  };


  function toggleTokens() {
    if (fromToken.token == "ETH") {
      setFromToken({ ...fromToken, token: "KURVE" });
      setToToken({ ...toToken, token: "ETH" });
    } else {
      setFromToken({ ...fromToken, token: "ETH" });
      setToToken({ ...toToken, token: "KURVE" });
    }
  }

  return (
    <div
      style={{ backgroundColor: "#191b1f" }}
      className="  w-full max-w-md rounded-2xl p-5"
    >
      <h2
        style={{ fontFamily: "Gotham-Ultra" }}
        className="text-white text-2xl"
      >
        Swap Pluto for ETH
      </h2>
      <p
        style={{ fontFamily: "Gotham-Ultra" }}
        className="text-white text-sm font-bold mb-4"
      >
        Pluto Balance: {finalKurveBalance.toFixed(3)} <br />
      </p>
      <TokenInput>
        <div className="grid grid-rows-2 grid-cols-2 ">
          <div className="">
            <label
              style={{ fontFamily: "Gotham-Bold" }}
              className="block text-left text-white"
              htmlFor="fromAmount"
            >
              From
            </label>
          </div>
          <div />
          <div>
            <input

              type="text"
              id="mintInput"
              placeholder="0.00"
              className="w-full border h-8 my-2 mr-4 bg-transparent rounded-2xl border border-gray-300 outline-none p-4 pr-10 text-white"
              style={{ fontFamily: "Gotham-Bold" }}
              onChange={(e) => SetMintAmount(e.target.value)}
            />
          </div>
          <div>
            <TokenSelect 
              value={fromToken.token}
            >
              <option value={`${fromToken.token}`}> {fromToken.token}</option>
            </TokenSelect>
          </div>
        </div>
      </TokenInput>
      <ArrowWrapper
        className="cursor-pointer mx-auto justify-center"
        onClick={handleReverseTokens}
      >
        <div className="w-1/2 h-1/2 bg-white border-2  border-gray-600 rounded-2xl px-2 py-2 mb-2 mx-auto" onClick={() => toggleTokens()}>
          {fromToken.token === "ETH" ? (
            <Image src={downArrow} alt="down" />
          ) : (
            <Image src={upArrow} alt="up" />
          )}
        </div>
      </ArrowWrapper>
      <TokenInput>
        <div className="grid grid-rows-2 grid-cols-2">
          <div className="">
            <label
              style={{ fontFamily: "Gotham-Bold" }}
              className="ml-1 block text-left text-white"
              htmlFor="toAmount"
            >
              To
            </label>
          </div>
          <div />
          <div>
            <input
              value={displayValue}
              type="number"
              readOnly
              id="mintInput"
              placeholder="0.00"
              className="w-full border h-8 my-2 mr-4 bg-transparent rounded-2xl border border-gray-300 outline-none p-4 pr-10 text-white"
              style={{ fontFamily: "Gotham-Bold" }}
              onChange={handleToAmountChange}
            />
          </div>
          <div>
            <TokenSelect value={toToken.token}>
              <option value={`${toToken.token}`}>{toToken.token} </option>
            </TokenSelect>
          </div>
        </div>
      </TokenInput>
      <button
        className="w-full bg-pink-500 rounded-2xl text-white font-bold p-3 hover:bg-blue-500"
        onClick={handleConditionalSwap}
      >
        <p
          className="text-xl text-white"
          style={{ fontFamily: "Gotham-Ultra" }}
        >
          Swap
        </p>
      </button>
    </div>
  );
};

export default SwapComponent;
