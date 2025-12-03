// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title GamiICO
 * @notice ICO contract for GAMI token sale with multiple stages and vesting
 * @dev Supports multiple sale rounds with different prices and allocations
 */
contract GamiICO is Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;
    
    /// @notice The GAMI token being sold
    IERC20 public immutable gamiToken;
    
    /// @notice Price per GAMI token in wei (e.g., 0.0001 ETH = 100000000000000 wei)
    uint256 public tokenPrice;
    
    /// @notice Minimum purchase amount in tokens
    uint256 public minPurchase;
    
    /// @notice Maximum purchase amount in tokens per wallet
    uint256 public maxPurchase;
    
    /// @notice Total tokens allocated for ICO
    uint256 public totalAllocation;
    
    /// @notice Total tokens sold so far
    uint256 public totalSold;
    
    /// @notice ICO start time
    uint256 public startTime;
    
    /// @notice ICO end time
    uint256 public endTime;
    
    /// @notice Whether ICO is finalized
    bool public finalized;
    
    /// @notice Vesting duration in seconds (e.g., 6 months)
    uint256 public vestingDuration;
    
    /// @notice Cliff duration in seconds (e.g., 1 month)
    uint256 public cliffDuration;
    
    /// @notice Mapping of user purchases
    mapping(address => uint256) public purchases;
    
    /// @notice Mapping of user claims
    mapping(address => uint256) public claimed;
    
    /// @notice List of all purchasers
    address[] public purchasers;
    
    /// @notice Mapping to track if address has purchased
    mapping(address => bool) public hasPurchased;
    
    /// @notice Whitelist mapping
    mapping(address => bool) public whitelist;
    
    /// @notice Whether whitelist is enabled
    bool public whitelistEnabled;
    
    event TokensPurchased(address indexed buyer, uint256 amount, uint256 cost);
    event TokensClaimed(address indexed buyer, uint256 amount);
    event ICOFinalized(uint256 totalRaised, uint256 totalSold);
    event PriceUpdated(uint256 newPrice);
    event WhitelistUpdated(address indexed account, bool status);
    event FundsWithdrawn(address indexed to, uint256 amount);
    
    /**
     * @notice Constructor sets up the ICO parameters
     * @param _gamiToken Address of the GAMI token contract
     * @param _tokenPrice Price per token in wei
     * @param _minPurchase Minimum purchase amount
     * @param _maxPurchase Maximum purchase amount
     * @param _totalAllocation Total tokens for sale
     * @param _startTime ICO start timestamp
     * @param _endTime ICO end timestamp
     * @param _vestingDuration Vesting duration in seconds
     * @param _cliffDuration Cliff duration in seconds
     */
    constructor(
        address _gamiToken,
        uint256 _tokenPrice,
        uint256 _minPurchase,
        uint256 _maxPurchase,
        uint256 _totalAllocation,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _vestingDuration,
        uint256 _cliffDuration,
        address initialOwner
    ) Ownable(initialOwner) {
        require(_gamiToken != address(0), "Invalid token address");
        require(_tokenPrice > 0, "Price must be > 0");
        require(_maxPurchase >= _minPurchase, "Max must be >= min");
        require(_endTime > _startTime, "End must be > start");
        require(_startTime >= block.timestamp, "Start must be in future");
        
        gamiToken = IERC20(_gamiToken);
        tokenPrice = _tokenPrice;
        minPurchase = _minPurchase;
        maxPurchase = _maxPurchase;
        totalAllocation = _totalAllocation;
        startTime = _startTime;
        endTime = _endTime;
        vestingDuration = _vestingDuration;
        cliffDuration = _cliffDuration;
    }
    
    /**
     * @notice Purchase GAMI tokens with ETH
     * @param tokenAmount Amount of tokens to purchase
     */
    function buyTokens(uint256 tokenAmount) external payable nonReentrant whenNotPaused {
        require(block.timestamp >= startTime, "ICO not started");
        require(block.timestamp <= endTime, "ICO ended");
        require(!finalized, "ICO finalized");
        require(tokenAmount >= minPurchase, "Below minimum purchase");
        
        if (whitelistEnabled) {
            require(whitelist[msg.sender], "Not whitelisted");
        }
        
        uint256 newTotal = purchases[msg.sender] + tokenAmount;
        require(newTotal <= maxPurchase, "Exceeds maximum purchase");
        require(totalSold + tokenAmount <= totalAllocation, "Exceeds allocation");
        
        uint256 cost = (tokenAmount * tokenPrice) / 1e18;
        require(msg.value >= cost, "Insufficient payment");
        
        // Track purchase
        if (!hasPurchased[msg.sender]) {
            purchasers.push(msg.sender);
            hasPurchased[msg.sender] = true;
        }
        
        purchases[msg.sender] = newTotal;
        totalSold += tokenAmount;
        
        emit TokensPurchased(msg.sender, tokenAmount, cost);
        
        // Refund excess
        if (msg.value > cost) {
            payable(msg.sender).transfer(msg.value - cost);
        }
    }
    
    /**
     * @notice Calculate claimable amount for a user
     * @param user Address to check
     * @return Claimable token amount
     */
    function claimableAmount(address user) public view returns (uint256) {
        if (!finalized || purchases[user] == 0) {
            return 0;
        }
        
        uint256 timeSinceEnd = block.timestamp - endTime;
        
        // Check cliff
        if (timeSinceEnd < cliffDuration) {
            return 0;
        }
        
        uint256 totalPurchased = purchases[user];
        
        // After vesting period, all tokens are claimable
        if (timeSinceEnd >= vestingDuration) {
            return totalPurchased - claimed[user];
        }
        
        // Calculate vested amount
        uint256 vestedAmount = (totalPurchased * timeSinceEnd) / vestingDuration;
        return vestedAmount - claimed[user];
    }
    
    /**
     * @notice Claim vested tokens
     */
    function claimTokens() external nonReentrant {
        uint256 claimable = claimableAmount(msg.sender);
        require(claimable > 0, "Nothing to claim");
        
        claimed[msg.sender] += claimable;
        gamiToken.safeTransfer(msg.sender, claimable);
        
        emit TokensClaimed(msg.sender, claimable);
    }
    
    /**
     * @notice Finalize the ICO
     * @dev Can only be called by owner after end time
     */
    function finalizeICO() external onlyOwner {
        require(block.timestamp > endTime, "ICO not ended");
        require(!finalized, "Already finalized");
        
        finalized = true;
        emit ICOFinalized(address(this).balance, totalSold);
    }
    
    /**
     * @notice Withdraw raised funds
     * @param to Address to send funds to
     */
    function withdrawFunds(address payable to) external onlyOwner {
        require(finalized, "ICO not finalized");
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        to.transfer(balance);
        emit FundsWithdrawn(to, balance);
    }
    
    /**
     * @notice Withdraw unsold tokens
     * @param to Address to send tokens to
     */
    function withdrawUnsoldTokens(address to) external onlyOwner {
        require(finalized, "ICO not finalized");
        uint256 unsold = totalAllocation - totalSold;
        require(unsold > 0, "No unsold tokens");
        
        gamiToken.safeTransfer(to, unsold);
    }
    
    /**
     * @notice Update token price
     * @param newPrice New price in wei
     */
    function updatePrice(uint256 newPrice) external onlyOwner {
        require(!finalized, "ICO finalized");
        require(newPrice > 0, "Price must be > 0");
        tokenPrice = newPrice;
        emit PriceUpdated(newPrice);
    }
    
    /**
     * @notice Enable/disable whitelist
     * @param enabled Whether whitelist should be enabled
     */
    function setWhitelistEnabled(bool enabled) external onlyOwner {
        whitelistEnabled = enabled;
    }
    
    /**
     * @notice Add/remove address from whitelist
     * @param account Address to update
     * @param status Whitelist status
     */
    function updateWhitelist(address account, bool status) external onlyOwner {
        whitelist[account] = status;
        emit WhitelistUpdated(account, status);
    }
    
    /**
     * @notice Batch update whitelist
     * @param accounts Array of addresses
     * @param status Whitelist status for all
     */
    function batchUpdateWhitelist(address[] calldata accounts, bool status) external onlyOwner {
        for (uint256 i = 0; i < accounts.length; i++) {
            whitelist[accounts[i]] = status;
            emit WhitelistUpdated(accounts[i], status);
        }
    }
    
    /**
     * @notice Pause the ICO
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @notice Unpause the ICO
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @notice Get total number of purchasers
     */
    function getPurchaserCount() external view returns (uint256) {
        return purchasers.length;
    }
    
    /**
     * @notice Get ICO progress percentage
     * @return Progress as a percentage (0-100)
     */
    function getProgress() external view returns (uint256) {
        if (totalAllocation == 0) return 0;
        return (totalSold * 100) / totalAllocation;
    }
    
    /**
     * @notice Check if ICO is active
     * @return Whether ICO is currently accepting purchases
     */
    function isActive() external view returns (bool) {
        return block.timestamp >= startTime && 
               block.timestamp <= endTime && 
               !finalized && 
               !paused();
    }
}
