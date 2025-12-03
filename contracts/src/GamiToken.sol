// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title GamiToken
 * @notice The GAMI token for the Gami Protocol ecosystem
 * @dev ERC20 token with fixed supply of 1,000,000,000 tokens
 * 
 * LINKS:
 * - ICO Website: /Users/marcusmattus/Gami_Protocol/gami-protocol-ico-website (1)
 * - Wallet: /Users/marcusmattus/Gami_Protocol/Gami_Universal_Wallet/Gami_Wallet
 * - Chain: /Users/marcusmattus/Gami_Protocol/gami-protocol-chain
 * - XP Interface: /Users/marcusmattus/Gami_Protocol/gami-protocol-chain/contracts/src/interfaces/IGamiXP.sol
 * - Config: ../tokenConfig.ts
 */
contract GamiToken is ERC20, Ownable, Pausable {
    /// @notice Maximum supply of GAMI tokens (1 billion)
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18;
    
    /// @notice Timestamp when trading can be enabled
    uint256 public tradingEnabledTime;
    
    /// @notice Whether trading is enabled
    bool public tradingEnabled;
    
    /// @notice Mapping of addresses exempt from trading restrictions
    mapping(address => bool) public isExemptFromRestrictions;
    
    event TradingEnabled(uint256 timestamp);
    event ExemptionUpdated(address indexed account, bool exempt);
    
    /**
     * @notice Constructor mints total supply to deployer
     * @param initialOwner Address that will receive all tokens and own the contract
     */
    constructor(address initialOwner) ERC20("Gami Token", "GAMI") Ownable(initialOwner) {
        _mint(initialOwner, MAX_SUPPLY);
        
        // Owner is exempt from restrictions
        isExemptFromRestrictions[initialOwner] = true;
        isExemptFromRestrictions[address(this)] = true;
    }
    
    /**
     * @notice Enable trading permanently
     * @dev Can only be called once by owner
     */
    function enableTrading() external onlyOwner {
        require(!tradingEnabled, "Trading already enabled");
        tradingEnabled = true;
        tradingEnabledTime = block.timestamp;
        emit TradingEnabled(block.timestamp);
    }
    
    /**
     * @notice Set exemption status for an address
     * @param account Address to update exemption for
     * @param exempt Whether the address should be exempt
     */
    function setExemption(address account, bool exempt) external onlyOwner {
        isExemptFromRestrictions[account] = exempt;
        emit ExemptionUpdated(account, exempt);
    }
    
    /**
     * @notice Pause token transfers
     * @dev Only owner can pause
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @notice Unpause token transfers
     * @dev Only owner can unpause
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @notice Override transfer to add trading restrictions
     */
    function _update(
        address from,
        address to,
        uint256 amount
    ) internal virtual override whenNotPaused {
        // Allow minting (from == address(0))
        if (from != address(0)) {
            // Check trading restrictions
            require(
                tradingEnabled || 
                isExemptFromRestrictions[from] || 
                isExemptFromRestrictions[to],
                "Trading not yet enabled"
            );
        }
        
        super._update(from, to, amount);
    }
}
