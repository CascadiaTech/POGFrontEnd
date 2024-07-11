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

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
const SwapWidget = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #191b1f;
  border-radius: 20px;
  padding: 20px;
`;
const SwapHeader = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 22px;
  font-family: Azonix;
  margin-bottom: 20px;
`;
const TokenInput = styled.div`
  background-color: #212429;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 10px;
  &:hover {
    border-color: #353a42;
    border-width: 1px;
  }
`;
const StyledInput = styled.input`
  background-color: transparent;
  border: none;
  color: #fff;
  width: 100%;
  font-family: ethnocentricRg;
  &:focus {
    outline: none;
  }
`;
const TokenSelect = styled.select`
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
const SwapButton = styled.button`
  background-color: #5090ea;
  border: none;
  border-radius: 20px;
  color: #fff;
  font-weight: bold;
  padding: 10px;
  width: 100%;
  &:hover {
    background-color: #4580d0;
  }
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

const SwapComponent: React.FC = () => {
  const [fromToken, setFromToken] = useState({ amount: "0", token: "ETH" });
  const [toToken, setToToken] = useState({ amount: "0", token: "KURVE" });
  const kurveContract = "0x68B63BE19A15A83a41CD487B7f8D32B83423d6FE";
  const { address, isConnected } = useAccount();

  const [_amount, _setBurnAmount] = useState();
  const [_mintReturnAmount, _setmintReturnAmount] = useState("0");

  const [kurvedMintReturn, setKurvedMintReturn] = useState<string>("0");

  // const [conversionRate, setConversionRate] = useState({ amount: "0", token: "ETH" });
  let current_chain = 11155111;

  const handleFromAmountChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromToken({ ...fromToken, amount: e.target.value });

  //   try {
  //     const { data } = await fetchMintReturn();
  //     if (data) {
  //       const returnInEth = web3.utils.fromWei(data.toString(), "ether");
  //       setKurvedMintReturn(returnInEth);
  //     }
  //   } catch (error) {
  //     console.error("Error converting mint return:", error);
  //   }
  // };
  }
  console.log("this is my kurved mint returnb:", kurvedMintReturn)

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
    args: [(Number(_mintReturnAmount) * 10 ** 18).toString()],
    onSuccess(data: any) {
      setKurvedMintReturn((Number(data) / 10 ** 18).toString());
    },
  });

  useEffect(() => {
    const fetchReturn = async () => {
      const { data } = await fetchMintReturn();
      if (data) {
        try {
          const returnInEth = web3.utils.fromWei(data.toString(), "ether");
          setKurvedMintReturn(returnInEth);
        } catch (error) {
          console.error("Error converting mint return:", error);
        }
      }
    };

    if (_amount && _amount !== "0") {
      fetchReturn();
    }
  }, [_amount, fetchMintReturn]);

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
    value: web3.utils.toWei(fromToken.amount, "ether"),
    overrides: {
      value: web3.utils.toWei(fromToken.amount, "ether"), 
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

  const { write: Burn } = useContractWrite({
    address: kurveContract,
    abi: KurveABI,
    functionName: "burn",
    chainId: current_chain,
    args: [(Number(fromToken.amount) *10**18).toString()], 
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
    if (fromToken.token === "ETH" && toToken.token === "KURVE") {
      console.log("ETH:", "FromToken", "gggg")
      Mint();
    } else if (fromToken.token === "KURVE" && toToken.token === "ETH") {
      console.log("KURVE:", "FromToken","hhh")
      Burn();
    }
  };

  return (
    <PageContainer>
      <SwapWidget>
        <SwapHeader>Swap</SwapHeader>
        <p className="text-white text-xl font-bold">
          Here is your balance: {finalKurveBalance.toFixed(3)} <br />bitch
        </p>
        <TokenInput>
          <div className="grid grid-rows-2 grid-cols-2 ">
            <div className="">
              <label
                style={{ fontFamily: "ethnocentricRg" }}
                className="block text-left text-white"
                htmlFor="fromAmount"
              >
                From
              </label>
            </div>
            <div />
            <div>
              <StyledInput
                value={fromToken.amount}
                type="number"
                id="mintInput"
                placeholder="Enter ETH amount"
                className="w-64 border h-8 my-2 mr-4 border-gray-300 outline-none p-2 pr-10 text-black"
                style={{ fontFamily: "ethnocentricRg" }}
                onChange={handleFromAmountChange || 
                  _setmintReturnAmount}
              />
            </div>
            <div>
              <TokenSelect
                value={fromToken.token}
                onChange={handleFromTokenChange}
              >
                <option value="ETH">ETH</option>
                <option value="KURVE">KURVE</option>
              </TokenSelect>
            </div>
          </div>
        </TokenInput>
        <ArrowWrapper
          className="cursor-pointer mx-auto justify-center"
          onClick={handleReverseTokens}
        >
          <div className="w-1/2 h-1/2  border-2 border-gray-400 rounded-2xl px-2 py-2 mb-2 mx-auto">
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
                style={{ fontFamily: "ethnocentricRg" }}
                className="ml-1 block text-left text-white"
                htmlFor="toAmount"
              >
                To
              </label>
            </div>
            <div></div>
            <div>
              <StyledInput
                      value={kurvedMintReturn}
                      type="number"
                      readOnly
                      id="mintInput"
                      placeholder="Enter ETH amount"
                      className="w-64 border h-8 my-2 mr-4 border-gray-300 outline-none p-2 pr-10 text-black"
                      style={{ fontFamily: "ethnocentricRg" }}
                      onChange={handleToAmountChange}  
                     />
            </div>

          <p
            className="mr-6 flex justify-start text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] max-w-[270px]"
            style={{ fontFamily: "Azonix" }}
          >
            Your final mint return: {kurvedMintReturn} KURVE
          </p>
            <div>
              <TokenSelect value={toToken.token} onChange={handleToTokenChange}>
                <option value="ETH">ETH</option>
                <option value="KURVE">KURVE</option>
              </TokenSelect>
            </div>
          </div>
        </TokenInput>
        <SwapButton onClick={handleConditionalSwap}>Swap</SwapButton>
      </SwapWidget>
    </PageContainer>
  );
};

export default SwapComponent;