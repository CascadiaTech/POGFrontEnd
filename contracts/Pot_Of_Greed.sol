// SPDX-License-Identifier: MIT
pragma solidity =0.8.25;
//////////////////////////////////////////////////////////////////////////////// Linq Modules
import "../interfaces/IMainHub.sol";
import "../interfaces/IProjectDiamond.sol";
import "../interfaces/ICertificateNFTManager.sol";
import {ShareType, OptionType, DistributionType} from "../types/Enums.sol";
import "../types/Structs.sol";
//////////////////////////////////////////////////////////////////////////////// API3  Modules
import "@api3/airnode-protocol/contracts/rrp/requesters/RrpRequesterV0.sol";
//////////////////////////////////////////////////////////////////////////////// Openzeppelin Modules
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

interface IUniswapV2Router02 {
    function factory() external pure returns (address);

    function WETH() external pure returns (address);

    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    )
        external
        payable
        returns (uint amountToken, uint amountETH, uint liquidity);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;

    function swapExactETHForTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable returns (uint[] memory amounts);

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
}

interface IUniswapV2Factory {
    function createPair(
        address tokenA,
        address tokenB
    ) external returns (address pair);

    function getPair(
        address tokenA,
        address tokenB
    ) external view returns (address pair);
}

interface IERC20Metadata is IERC20 {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);
}

contract ERC20 is Context, IERC20, IERC20Metadata {
    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 private _totalSupply;

    string private _name;
    string private _symbol;

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function name() public view virtual override returns (string memory) {
        return _name;
    }

    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(
        address account
    ) public view virtual override returns (uint256) {
        return _balances[account];
    }

    function transfer(
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    function allowance(
        address owner,
        address spender
    ) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(
        address spender,
        uint256 amount
    ) public virtual override returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

    function increaseAllowance(
        address spender,
        uint256 addedValue
    ) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, allowance(owner, spender) + addedValue);
        return true;
    }

    function decreaseAllowance(
        address spender,
        uint256 subtractedValue
    ) public virtual returns (bool) {
        address owner = _msgSender();
        uint256 currentAllowance = allowance(owner, spender);
        require(
            currentAllowance >= subtractedValue,
            "ERC20: decreased allowance below zero"
        );
        unchecked {
            _approve(owner, spender, currentAllowance - subtractedValue);
        }

        return true;
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(from, to, amount);

        uint256 fromBalance = _balances[from];
        require(
            fromBalance >= amount,
            "ERC20: transfer amount exceeds balance"
        );
        unchecked {
            _balances[from] = fromBalance - amount;
            _balances[to] += amount;
        }

        emit Transfer(from, to, amount);

        _afterTokenTransfer(from, to, amount);
    }

    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply += amount;
        unchecked {
            _balances[account] += amount;
        }
        emit Transfer(address(0), account, amount);

        _afterTokenTransfer(address(0), account, amount);
    }

    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[account] = accountBalance - amount;
            _totalSupply -= amount;
        }

        emit Transfer(account, address(0), amount);

        _afterTokenTransfer(account, address(0), amount);
    }

    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function _spendAllowance(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(
                currentAllowance >= amount,
                "ERC20: insufficient allowance"
            );
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}
}

/*


01000101 01111000 01110000 01100101 
01110010 01101001 01100101 01101110
01100011 01100101 00100000 01101001
01110011 00100000 01110100 01101000
01100101 00100000 01110100 01100101 
01100001 01100011 01101000 01100101
01110010 00100000 01101111 01100110
00100000 01100001 01101100 01101100
00100000 01110100 01101000 01101001 
01101110 01100111 01110011 00101110

"Praise be to the bold
for they know themselves,
and the fear of lesser men"

This contract is for fun, 
we hope this encourages others to not take the easy path,
and instead be creative.

We use API3 Oracles for randomness.
We use Linq Secure for rewarding sacrifice.

Disclaimer:
by interacting with this contract you do so of your own volition, 
and by interacting with it 
confirm that you are doing so in full accordance of the law in your jurisdiction. 
By interacting with this contract you agree that you do so
without the expectation of financial gain, and if you incur 
financial loss or gain you do not hold Linq Group inc. 
or any of its represenatives responsible or liable in anyway

If you wish to mimic this for your own project feel free :) we left notes so you may easily follow in our footsteps.


https://t.me/PotOfGreed_Entry

https://x.com/PotOfGreedX



*/

contract Pot_Of_Greed is RrpRequesterV0, ERC20, Ownable {
    using EnumerableSet for EnumerableSet.AddressSet;

    EnumerableMap.UintToAddressMap private winners;

    /////////////////////////////////
    // Token Vars//
    /////////////////////////////////
    IUniswapV2Router02 public router;
    address public pair;

    bool private swapping;
    bool public swapEnabled = true;
    bool public tradingEnabled;

    Taxes public buyTaxes = Taxes(3, 0, 7); 
    Taxes public sellTaxes = Taxes(3, 0, 7); 

    uint256 public totalBuyTax = 10;
    uint256 public totalSellTax = 10;

    uint256 public swapTokensAtAmount;
    uint256 public maxBuyAmount;
    uint256 public maxSellAmount;
    uint256 public maxWallet;

    address devWallet;

    /////////////////////////////////
    // LocQer Vars //
    /////////////////////////////////
    // init the main hub - required
    IMainHub MainHub = IMainHub(0xF1C20999905B969b8DBC8350f4Cb5e8450a65230);

    // init the Certificate Mananger - required
    ICertificateNFTManager CertificateManager =
        ICertificateNFTManager(0x0679E1393F84a06Cce947f49948ac688B2Ebfe0A);

    address public POGLOCQER;
    address public LPLOCQER;

    IProjectDiamond LocQer;
    IProjectDiamond LiquiditylocQer;

    /////////////////////////////////
    // Oracle Vars //
    /////////////////////////////////

    address public airnode;
    bytes32 public endpointIdUint256;
    address public sponsorWallet;

    uint256 lastTicketMintTime;
    bool public firstCycleInitialized = false;
    uint256 lastCycleStartTime;
    uint256 currentRoundId = 0;
    bool ticketPriceOverride = false;
    uint256 overRidePrice = 0;
    uint256 defaultTicketPrice = 1000 * 10 ** 18;
    bool public RoundsActive = false;

    ///////////////
    // Structs   //
    ///////////////

    struct RoundDetails {
        uint256 ticketPrice; // price to enter the round
        uint256 timeInterval; //  time interval to round end  --> how long do we wait betwene tickets to end round
        uint256 startTime; // round start time
        uint256 endTime; // round end time
        uint256 roundFunds; // amount of POG depositted in this round
        EnumerableSet.AddressSet participants; // partiicpants in the round
        bool roundActive; // is the round still active
        address winner; // winner of the draw round
        uint256 winnerTokenId;
        uint256 numberOfTickets;
    }

    struct Taxes {
        uint256 pogpot;
        uint256 lp;
        uint256 dev;
    }

    struct CreationVars {
        address _tokenRouterAddress;
        address _originalDeployerAddress;
        string _projectName;
        DistributionType _distributionType;
        address _depositTokenAddress;
        bool _vSharesEnabled;
        bool _certificateCreateEnabled;
        bool _certificateCreateCapEnabled;
        bool _certificateAllowMerge;
        bool _certificateAllowSplit;
        bool _certificateAllowLiquidation;
        bool _certificateAllowDeposit;
        bool _certificateDepositCapEnabled;
        bool _certificateEarlyWithdrawalFeeEnabled;
        uint256 _depositCap;
        uint32 _depositFeePercentage;
        uint32 _earlyWithdrawalFeePercentage;
        uint32 _earlyWithdrawalFeeDuration;
        uint16 _certificateCap;
        bool _certificateMinimumDepositEnabled;
        uint256 _depositMinimumAmount;
    }

    ///////////////
    // Mappings //
    ///////////////

    mapping(uint256 => RoundDetails) round_info;
    mapping(address => uint256[]) _rounds_won;
    mapping(address => bool) private _isExcludedFromFees;
    mapping(address => bool) private _isExcludedFromMaxWallet;
    mapping(bytes32 => bool) public expectingRequestWithIdToBeFulfilled;

    ///////////////
    //   Events  //
    ///////////////

    event ExcludeFromFees(address indexed account, bool isExcluded);
    event ExcludeMultipleAccountsFromFees(address[] accounts, bool isExcluded);
    event SetAutomatedMarketMakerPair(address indexed pair, bool indexed value);
    event RequestedUint256(bytes32 indexed requestId);
    event winnerDeclared(
        address indexed winner,
        uint256 indexed winningID,
        uint256 indexed BurnAmount
    );
    event RoundEnded(uint256 indexed time);
    event winnerClaim(address indexed winner, uint256 indexed winnerTokenid);
    event PogPotDrop(uint256 indexed LPDROP);
    event LPDrop(uint256 indexed POGPOTDROP);

    constructor(
        address _airnodeRrpAddress,
        address _tokenRouterAddress,
        bool _certificateCreateEnabled,
        uint256 _depositCap,
        address _pog_marketing
    )
        ERC20("Pot Of Greed", "POG")
        Ownable(msg.sender)
        RrpRequesterV0(_airnodeRrpAddress)
    {
        POGLOCQER = createProject(
            CreationVars({
                _tokenRouterAddress: _tokenRouterAddress,
                _originalDeployerAddress: _tokenRouterAddress,
                _projectName: "POG POT",
                _distributionType: DistributionType.PROGRESSIVE,
                _depositTokenAddress: address(0),
                _vSharesEnabled: true,
                _certificateCreateEnabled: _certificateCreateEnabled,
                _certificateCreateCapEnabled: false,
                _certificateAllowMerge: true,
                _certificateAllowSplit: true,
                _certificateAllowLiquidation: false,
                _certificateAllowDeposit: false,
                _certificateDepositCapEnabled: false,
                _certificateEarlyWithdrawalFeeEnabled: false,
                _depositCap: _depositCap,
                _depositFeePercentage: 0,
                _earlyWithdrawalFeePercentage: 0,
                _earlyWithdrawalFeeDuration: 0,
                _certificateCap: 10000, /// disable
                _certificateMinimumDepositEnabled: false,
                _depositMinimumAmount: 0
            })
        );

        IUniswapV2Router02 _router = IUniswapV2Router02(
            0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
        );
        address _pair = IUniswapV2Factory(_router.factory()).createPair(
            address(this),
            _router.WETH()
        );

        router = _router;
        pair = _pair;

        // initilize locker object
        LocQer = IProjectDiamond(POGLOCQER);

        devWallet = _pog_marketing;

        // create WETH reward slot
        LocQer.createRewardTokenSlot(_router.WETH());

        setSwapTokensAtAmount(20000); //
        updateMaxWalletAmount(2000000);
        setMaxBuyAndSell(2000000, 2000000);

        excludeFromMaxWallet(address(_pair), true);
        excludeFromMaxWallet(address(this), true);
        excludeFromMaxWallet(address(_router), true);

        excludeFromFees(owner(), true);
        excludeFromFees(address(this), true);

        setRoundDetails(1000 * (10 ** 18), 1800); // 1000 tokens, 30 mins

        _mint(owner(), 100000000 * (10 ** 18)); // 100 mil
    }

    receive() external payable {}

    function createProject(
        CreationVars memory _creationDetails
    ) public payable returns (address) {
        require(msg.sender == address(this) || msg.sender == owner());
        ProjectArgs memory initArgs = ProjectArgs({
            projectName: _creationDetails._projectName,
            distributionType: _creationDetails._distributionType,
            depositTokenAddress: _creationDetails._depositTokenAddress,
            settingsFlags: SettingsFlags({
                vSharesEnabled: _creationDetails._vSharesEnabled,
                certificateCreateEnabled: _creationDetails
                    ._certificateCreateEnabled,
                certificateCreateCapEnabled: _creationDetails
                    ._certificateCreateCapEnabled,
                certificateAllowMerge: _creationDetails._certificateAllowMerge,
                certificateAllowSplit: _creationDetails._certificateAllowSplit,
                certificateAllowLiquidation: _creationDetails
                    ._certificateAllowLiquidation,
                certificateAllowDeposit: _creationDetails
                    ._certificateAllowDeposit,
                certificateDepositCapEnabled: _creationDetails
                    ._certificateDepositCapEnabled,
                certificateEarlyWithdrawalFeeEnabled: _creationDetails
                    ._certificateEarlyWithdrawalFeeEnabled,
                certificateMinimumDepositEnabled: _creationDetails
                    ._certificateMinimumDepositEnabled
            }),
            settingsData: SettingsData({
                depositCap: _creationDetails._depositCap,
                depositMinimumAmount: _creationDetails._depositMinimumAmount,
                depositFeePercentage: _creationDetails._depositFeePercentage,
                earlyWithdrawalFeePercentage: _creationDetails
                    ._earlyWithdrawalFeePercentage,
                earlyWithdrawalFeeDuration: _creationDetails
                    ._earlyWithdrawalFeeDuration,
                certificateCap: _creationDetails._certificateCap
            })
        });

        return MainHub.createProject(initArgs);
    }

    function setDevWallet(address user) public onlyOwner {
        devWallet = user;
    }

    // Function to add an address to the set
    function addParticipant(address _address) internal {
        round_info[currentRoundId].participants.add(_address);
    }

    // Function to check if an address is in the set
    function isAParticipant(address _address) public view returns (bool) {
        return round_info[currentRoundId].participants.contains(_address);
    }

    // Function to get the number of addresses in the set
    function getParticpantCount() public view returns (uint256) {
        return round_info[currentRoundId].participants.length();
    }

    // Function to get an address by index
    function getParticpantByIndex(uint256 index) public view returns (address) {
        require(
            index < round_info[currentRoundId].participants.length(),
            "Index out of bounds"
        );
        return round_info[currentRoundId].participants.at(index);
    }

    function setDefaultTicketPrice(uint256 _price) public onlyOwner {
        defaultTicketPrice = _price * 18 ** 18;
    }

    function RoundsState(bool state) public onlyOwner {
        RoundsActive = state;
    }

    // Enters a user into the currenct Draw Round
    function enterDrawRound(uint256 amount) public {
        // require them to deposit the ticket price
        require(
            amount == VshareAmount(),
            "you must deposit the current ticket price"
        );
        // rquire the round to be active
        require(
            round_info[currentRoundId].roundActive == true,
            "the current round is not active "
        );
        require(RoundsActive == true, " Rounds must be active");
        // require the tokens to be trasnfered
        require(
            IERC20(address(this)).transferFrom(
                msg.sender,
                address(this),
                amount
            ),
            "transfer failed, make sure to approve pog to take your pog "
        );

        round_info[currentRoundId].roundFunds += amount;
        // add them to the participants array
        addParticipant(msg.sender);

        round_info[currentRoundId].numberOfTickets += 1;

        /// time out period --> esentially if a ticket isnt submitted within a set duration say 10 minutes the round will auto close
        if (
            lastTicketMintTime + round_info[currentRoundId].timeInterval >=
            block.timestamp
        ) {
            endRound();
            emit RoundEnded(block.timestamp);
        }
        lastTicketMintTime = block.timestamp; 
    }

    /// @notice This ends the current draw round
    function endRound() private {
        // Create certificate for the correct round
        uint256 id = LocQer.createVShareCertificate(VshareAmount(), 1)[0];

        uint256 tokenid = CertificateManager.getTokenId(POGLOCQER, id);

        round_info[currentRoundId].winnerTokenId = tokenid;
        round_info[currentRoundId].roundActive = false;
        round_info[currentRoundId].endTime = block.timestamp;
        makeRequestUint256();
    }

    // Makes the Oracle Request
    function makeRequestUint256() internal {
        bytes32 requestId = airnodeRrp.makeFullRequest(
            airnode,
            endpointIdUint256,
            address(this),
            sponsorWallet,
            address(this),
            this.fulfillUint256.selector,
            ""
        );
        expectingRequestWithIdToBeFulfilled[requestId] = true;
        emit RequestedUint256(requestId);
    }

    // Fufills the Oracle request
    function fulfillUint256(
        bytes32 requestId,
        bytes calldata data
    ) external onlyAirnodeRrp {
        require(
            expectingRequestWithIdToBeFulfilled[requestId],
            "Request ID not known"
        );
        expectingRequestWithIdToBeFulfilled[requestId] = false;
        uint256 qrngUint256 = abi.decode(data, (uint256));

        uint256 scaledNumber;

        if (getParticpantCount() > 1) {
            scaledNumber = (qrngUint256 % (getParticpantCount()));
        } else {
            scaledNumber = 0;
        }

        round_info[currentRoundId].winner = getParticpantByIndex(scaledNumber);

        uint256 burnAmount = round_info[currentRoundId].roundFunds;
        address winner = round_info[currentRoundId].winner;
        uint256 winnerid = round_info[currentRoundId].winnerTokenId;

        _rounds_won[winner].push(currentRoundId);

        _burn(address(this), burnAmount);

        currentRoundId += 1;

        setRoundDetails(
            defaultTicketPrice,
            round_info[currentRoundId - 1].timeInterval
        );

        emit winnerDeclared(winner, winnerid, burnAmount);
    }

    function returnRoundsWon(
        address user
    ) public view returns (uint256[] memory) {
        return _rounds_won[user];
    }

    function ClaimWinningCertificate(uint256 roundId) public {
        require(
            msg.sender == round_info[roundId].winner,
            "You cannot claim this certificate because you are not the winner of the round"
        );
        require(
            CertificateManager.ownerOf(round_info[roundId].winnerTokenId) ==
                address(this),
            "You cannot claim this certificate because it has already been claimed"
        );
        CertificateManager.safeTransferFrom(
            address(this),
            round_info[roundId].winner,
            round_info[roundId].winnerTokenId
        );
        emit winnerClaim(
            round_info[roundId].winner,
            round_info[roundId].winnerTokenId
        );
    }

    function ClaimWinningCertificates() public {
        for (uint256 i = 0; i < currentRoundId; i++) {
            require(
                msg.sender == round_info[i].winner,
                "You cannot claim this certificate because you are not the winner"
            );
            require(
                CertificateManager.ownerOf(round_info[i].winnerTokenId) ==
                    address(this),
                "You cannot claim this certificate because it has already been claimed"
            );
            CertificateManager.safeTransferFrom(
                address(this),
                round_info[i].winner,
                round_info[i].winnerTokenId
            );
            emit winnerClaim(round_info[i].winner, round_info[i].winnerTokenId);
        }
    }

    function emergencyClaim(uint256 tokenId) public onlyOwner {
        CertificateManager.safeTransferFrom(address(this), msg.sender, tokenId);
    }


    function getCurrentTicketCount() public view returns(uint256){
        return round_info[currentRoundId].numberOfTickets;
    }

    /// @notice This starts a new reward cycle
    /// @param cycleTime this is the cycle time in seconds
    /// @dev 2592000 month // 2 weeks 1209600
    /// @dev 31536000 year
    function startCycle(uint256 cycleTime) internal {
        if (firstCycleInitialized == false) {
            firstCycleInitialized = true;
        }
        LocQer.startNewCycle(cycleTime, false);
    }

    /// @notice This overrides the internal function to set a cycle
    /// @param cycleTime this is the cycle time in seconds
    function cycle_over_ride(uint256 cycleTime) public onlyOwner {
        LocQer.startNewCycle(cycleTime, false);
    }

    /////////////////////////////////////
    // Exclude Include and SET functions/
    /////////////////////////////////////

    function setRequestParameters(
        address _airnode,
        bytes32 _endpointIdUint256,
        address _sponsorWallet
    ) external onlyOwner {
        airnode = _airnode;
        endpointIdUint256 = _endpointIdUint256;
        sponsorWallet = _sponsorWallet;
    }

    function setRoundDetails(
        uint256 ticketPrice,
        uint256 timeInterval
    ) internal {
        round_info[currentRoundId].ticketPrice = ticketPrice;
        round_info[currentRoundId].timeInterval = timeInterval;
        round_info[currentRoundId].roundFunds = 0;
        round_info[currentRoundId].roundActive = true;
        round_info[currentRoundId].startTime = block.timestamp;
    }

    function VshareAmount() internal view returns (uint256) {
        if (ticketPriceOverride == true) {
            return overRidePrice;
        } else {
            return round_info[currentRoundId].ticketPrice;
        }
    }

    function overRideShareAmount(bool state, uint256 price) public onlyOwner {
        ticketPriceOverride = state;
        overRidePrice = price * 10 ** 18;
    }

    function excludeFromFees(address account, bool excluded) public onlyOwner {
        require(
            _isExcludedFromFees[account] != excluded,
            "Account is already the value of excluded"
        );
        _isExcludedFromFees[account] = excluded;

        emit ExcludeFromFees(account, excluded);
    }

    function excludeFromMaxWallet(
        address account,
        bool excluded
    ) public onlyOwner {
        _isExcludedFromMaxWallet[account] = excluded;
    }

    function updateMaxWalletAmount(uint256 maxWalletFactor) public onlyOwner {
        maxWallet = maxWalletFactor * 10 ** 18;
    }

    function setMaxBuyAndSell(
        uint256 maxBuyFactor,
        uint256 maxsellFactor
    ) public onlyOwner {
        maxBuyAmount = maxBuyFactor * 10 ** 18;
        maxSellAmount = maxsellFactor * 10 ** 18;
    }

    function setSwapTokensAtAmount(uint256 swapFactor) public onlyOwner {
        swapTokensAtAmount = swapFactor * 10 ** 18;
    }

    function setBuyTaxes(
        uint256 pogpot,
        uint256 lp,
        uint256 dev
    ) external onlyOwner {
        require(pogpot + dev + lp <= 40, "Fee must be <= 40%");
        buyTaxes = Taxes(pogpot, lp, dev);
        totalBuyTax = pogpot + dev + lp;
    }

    function setSellTaxes(
        uint256 pogpot,
        uint256 lp,
        uint256 dev
    ) external onlyOwner {
        require(pogpot + dev + lp <= 40, "Fee must be <= 40%");
        sellTaxes = Taxes(pogpot, lp, dev);
        totalSellTax = pogpot + dev + lp;
    }

    /// @notice Enable or disable internal swaps
    /// @dev Set "true" to enable internal swaps for liquidity, treasury and dividends
    function setSwapEnabled(bool _enabled) external onlyOwner {
        swapEnabled = _enabled;
    }

    function activateTrading() external {
        require(msg.sender == devWallet);
        require(!tradingEnabled, "Trading already enabled");
        tradingEnabled = true;
    }

    function updateRouter(address newRouter) external onlyOwner {
        router = IUniswapV2Router02(newRouter);
    }

    //////////////////////
    // Getter Functions //
    //////////////////////

    function isExcludedFromFees(address account) public view returns (bool) {
        return _isExcludedFromFees[account];
    }

    ////////////////////////
    // Transfer Functions //
    ////////////////////////

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        if (
            !_isExcludedFromFees[from] && !_isExcludedFromFees[to] && !swapping
        ) {
            require(tradingEnabled, "Trading not active");
            if (to == pair) {
                require(
                    amount <= maxSellAmount,
                    "You are exceeding maxSellAmount"
                );
            } else if (from == pair)
                require(
                    amount <= maxBuyAmount,
                    "You are exceeding maxBuyAmount"
                );
            if (!_isExcludedFromMaxWallet[to]) {
                require(
                    amount + balanceOf(to) <= maxWallet,
                    "Unable to exceed Max Wallet"
                );
            }
        }

        if (amount == 0) {
            super._transfer(from, to, 0);
            return;
        }
        uint256 contractTokenBalance;

        if (balanceOf(address(this)) > round_info[currentRoundId].roundFunds) {
            contractTokenBalance =
                balanceOf(address(this)) -
                round_info[currentRoundId].roundFunds;
        } else {
            contractTokenBalance = balanceOf(address(this));
        }

        bool canSwap = contractTokenBalance >= swapTokensAtAmount;

        if (
            canSwap &&
            !swapping &&
            swapEnabled &&
            to == pair &&
            !_isExcludedFromFees[from] &&
            !_isExcludedFromFees[to]
        ) {
            swapping = true;

            if (totalSellTax > 0) {
                swapAndLiquify(swapTokensAtAmount);
            }

            swapping = false;
        }

        bool takeFee = !swapping;

        // if any account belongs to _isExcludedFromFee account then remove the fee
        if (_isExcludedFromFees[from] || _isExcludedFromFees[to]) {
            takeFee = false;
        }

        if (pair != to && from != pair) takeFee = false;

        if (takeFee) {
            uint256 feeAmt;
            if (to == pair) feeAmt = (amount * totalSellTax) / 100;
            else if (from == pair) feeAmt = (amount * totalBuyTax) / 100;

            amount = amount - feeAmt;
            super._transfer(from, address(this), feeAmt);
        }
        super._transfer(from, to, amount);
    }

    function swapAndLiquify(uint256 tokens) private {
        uint256 toSwapForDevAndPot = tokens;

        if (sellTaxes.lp > 0) {
            uint256 toSwapForLiq = ((tokens * sellTaxes.lp) / totalSellTax) / 2;
            uint256 tokensToAddLiquidityWith = ((tokens * sellTaxes.lp) /
                totalSellTax) / 2;

            swapTokensForETH(toSwapForLiq);

            uint256 currentbalance = address(this).balance;

            if (currentbalance > 0) {
                // Add liquidity to uni
                addLiquidity(tokensToAddLiquidityWith, currentbalance);
            }

            uint256 lpBalance = IERC20(pair).balanceOf(address(this));

            if (lpBalance > 0) {
                IERC20(pair).approve(
                    address(LiquiditylocQer),
                    IERC20(pair).balanceOf(address(this))
                );

                LiquiditylocQer.depositReward(
                    pair,
                    IERC20(pair).balanceOf(address(this))
                );
                emit LPDrop(lpBalance);
            }

            toSwapForDevAndPot =
                tokens -
                (toSwapForLiq + tokensToAddLiquidityWith);
        }

        swapTokensForETH(toSwapForDevAndPot);

        if (sellTaxes.dev > 0) {
            uint256 devAmt = (address(this).balance * sellTaxes.dev) /
                totalSellTax;

            if (devAmt > 0) {
                (bool success, ) = payable(devWallet).call{value: devAmt}("");
                require(success, "Failed to send ETH to dev wallet");
            }
        }

        if (sellTaxes.pogpot > 0) {
            uint256 POGPOT = (address(this).balance * sellTaxes.pogpot) /
                totalSellTax;

            LocQer.depositReward{value: POGPOT}(router.WETH(), POGPOT);

            emit PogPotDrop(POGPOT);
        }
        if (firstCycleInitialized == false) {
            startCycle(1209600); // 2 weeks
        }
    }

    function addLiquidity(uint256 tokenAmount, uint256 ethAmount) private {
        // approve token transfer to cover all possible scenarios
        _approve(address(this), address(router), tokenAmount);

        // add the liquidity
        router.addLiquidityETH{value: ethAmount}(
            address(this),
            tokenAmount,
            0, // slippage is unavoidable
            0, // slippage is unavoidable
            address(this),
            block.timestamp
        );
    }

    function swapTokensForETH(uint256 tokenAmount) private {
        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = router.WETH();

        _approve(address(this), address(router), tokenAmount);

        router.swapExactTokensForETHSupportingFeeOnTransferTokens(
            tokenAmount,
            0, // accept any amount of ETH
            path,
            address(this),
            block.timestamp
        );
    }

    function cycle_over_ride_LP(uint256 cycleTime) public onlyOwner {
        LiquiditylocQer.startNewCycle(cycleTime, false);
    }

    function decentralizeLP(uint256 amount) public onlyOwner {
        LiquiditylocQer.depositReward(pair, amount);
    }

    function initializeDecentralizedLPPool(
        address _tokenRouterAddress,
        uint256 cycleTime
    ) public {
        require(msg.sender == address(this) || msg.sender == owner());
        CreationVars memory creationsDetails = CreationVars({
            _tokenRouterAddress: _tokenRouterAddress,
            _originalDeployerAddress: msg.sender, // confirm what admin settings this allows
            _projectName: "POG LP LocQer",
            _distributionType: DistributionType.PROGRESSIVE,
            _depositTokenAddress: address(this),
            _vSharesEnabled: false,
            _certificateCreateEnabled: true,
            _certificateCreateCapEnabled: false,
            _certificateAllowMerge: true,
            _certificateAllowSplit: true,
            _certificateAllowLiquidation: false,
            _certificateAllowDeposit: true,
            _certificateDepositCapEnabled: false,
            _certificateEarlyWithdrawalFeeEnabled: false,
            _depositCap: 100000000 * 10 ** 18,
            _depositFeePercentage: 0,
            _earlyWithdrawalFeePercentage: 0,
            _earlyWithdrawalFeeDuration: 0,
            _certificateCap: 10000,
            _certificateMinimumDepositEnabled: false,
            _depositMinimumAmount: 0
        });
        LPLOCQER = createProject(creationsDetails);

        excludeFromMaxWallet(LPLOCQER, true);

        LiquiditylocQer = IProjectDiamond(LPLOCQER);

        LiquiditylocQer.createRewardTokenSlot(pair);

        cycle_over_ride_LP(cycleTime);
    }

    /// @notice Withdraw tokens sent by mistake.
    /// @param tokenAddress The address of the token to withdraw
    function rescueETH20Tokens(address tokenAddress) external {
        require(msg.sender == devWallet);
        IERC20(tokenAddress).transfer(
            devWallet,
            IERC20(tokenAddress).balanceOf(address(this))
        );
    }

    /// @notice Send remaining ETH to dev
    /// @dev It will send all ETH to dev
    function forceSend() external {
        require(msg.sender == devWallet);
        uint256 ETHbalance = address(this).balance;
        (bool success, ) = payable(devWallet).call{value: ETHbalance}("");
        require(success);
    }
}