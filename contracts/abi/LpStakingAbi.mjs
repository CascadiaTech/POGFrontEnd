const abi = JSON.stringify([
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_bessiesRentalTime",
        type: "uint256",
      },
    ],
    name: "changeBessiesRentalTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_daisysRentalTime",
        type: "uint256",
      },
    ],
    name: "changeDaisysRentalTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_minLinQ",
        type: "uint256",
      },
    ],
    name: "changeMinLinQ",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_minMilQ",
        type: "uint256",
      },
    ],
    name: "changeMinMilQ",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_roundUpBessiesTime",
        type: "uint256",
      },
    ],
    name: "changeRoundUpBessiesTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_roundUpDaisysTime",
        type: "uint256",
      },
    ],
    name: "changeRoundUpDaisysTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_cow",
        type: "uint256",
      },
    ],
    name: "ownCows",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_state",
        type: "bool",
      },
    ],
    name: "pauseStaQing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_daisysOutput",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_bessiesOutput",
        type: "uint256",
      },
    ],
    name: "prepShipment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "removeVitaliksMilk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_cow",
        type: "uint256",
      },
    ],
    name: "roundUpCows",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_daisysToOddysParlour",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_bessiesToOddysParlour",
        type: "uint256",
      },
    ],
    name: "rushOddyFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_glinQ",
        type: "address",
      },
    ],
    name: "setGlinQAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "weiAmount",
        type: "uint256",
      },
    ],
    name: "sethighClaimThreshold",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "weiAmount",
        type: "uint256",
      },
    ],
    name: "setLowBalanceThreshold",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_oddysParlour",
        type: "address",
      },
    ],
    name: "setOddysParlour",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "shipFarmMilQ",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "shipLinQersMilQ",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "shipMilk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountLinQ",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountMilQ",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_token",
        type: "uint256",
      },
    ],
    name: "staQe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_linqAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_milQAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_glinQAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_oddysParlour",
        type: "address",
      },
      {
        internalType: "address",
        name: "_uniswapRouterAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_ethAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "boughtAmount",
        type: "uint256",
      },
    ],
    name: "Qompound",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "User",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "Amount",
        type: "uint256",
      },
    ],
    name: "highClaim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    name: "lowBalance",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "linq",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "milq",
        type: "uint256",
      },
    ],
    name: "newStaQe",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "slippage",
        type: "uint256",
      },
    ],
    name: "QompoundLinQ",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBessies",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newDaisys",
        type: "uint256",
      },
    ],
    name: "rewardChange",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amtLinQ",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amtMilQ",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_token",
        type: "uint256",
      },
    ],
    name: "unstaQe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_ERC20",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_Amt",
        type: "uint256",
      },
    ],
    name: "withdrawERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "zeroFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [],
    name: "badMilk",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bessies",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bessiesMilkProduced",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bessiesRentalTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bessiesToOddysParlour",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "checkEstMilQRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "daisys",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "daisysMilkProduced",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "daisysRentalTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "daisysToOddysParlour",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getMilQShipment",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getprepShipment",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "glinQ",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ILINQ",
    outputs: [
      {
        internalType: "contract iLinq",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "linQ",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "LinQerParlours",
    outputs: [
      {
        internalType: "uint256",
        name: "daisys",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rentedDaisysSince",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rentedDaisysTill",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "vitaliksMilkShipped",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastShippedVitaliksMilk",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "vitaliksMilkClaimable",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "QompoundedMilk",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "daisysOwnedSince",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "daisysOwnedTill",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "hasDaisys",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "ownsDaisys",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "shipmentsRecieved",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "linQers",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LinQtotalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "LpClaims",
    outputs: [
      {
        internalType: "uint256",
        name: "lastClaimed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalClaimed",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "milQ",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "MilQerParlours",
    outputs: [
      {
        internalType: "uint256",
        name: "bessies",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rentedBessiesSince",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rentedBessiesTill",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "milQClaimed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "vitaliksMilkShipped",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastShippedVitaliksMilk",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "vitaliksMilkClaimable",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bessiesOwnedSince",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bessiesOwnedTill",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "hasBessies",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "ownsBessies",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "shipmentsRecieved",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "milQers",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MilqShipments",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "MilQShipments",
    outputs: [
      {
        internalType: "uint256",
        name: "blockTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "MilQShipped",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totallinQStaked",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rewardPerlinQ",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minLinQ",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minMilQ",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "oddysParlour",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "roundUpBessiesTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "roundUpDaisysTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "staQingPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "swapLinq",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalMilQClaimed",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalVitaliksMilkShipments",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "viewHowMuchMilk",
    outputs: [
      {
        internalType: "uint256",
        name: "Total",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "vitaliksMilkQompounded",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "VitaliksMilkShipments",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "daisysOutput",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bessiesOutput",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "vitaliksMilkShipped",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]);

export const LPStakingabiObject = JSON.parse(abi);
