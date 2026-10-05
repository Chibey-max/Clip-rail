// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

import {ReceiverTemplate} from "./cre/ReceiverTemplate.sol";
import {ICampaignVault} from "./interfaces/ICampaignVault.sol";
import {ICreatorReputation} from "./interfaces/ICreatorReputation.sol";

/// @title CampaignVault
/// @notice Escrow, clip registry, oracle report processing, hold window, flags and payouts for Cliprail.
/// @dev Only the configured CRE forwarder can call onReport (ReceiverTemplate). Owner = deployer.
contract CampaignVault is ICampaignVault, ReceiverTemplate, EIP712, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    // ─────────────────────────── Constants ───────────────────────────

    uint8 public constant FLAG_OWNERSHIP_OK = 1;
    uint8 public constant FLAG_UNAVAILABLE = 2;
    uint32 public constant MAX_HOLD_SECS = 7 days;

    bytes32 public constant REGISTER_CLIP_TYPEHASH =
        keccak256("RegisterClip(uint256 campaignId,string videoId,address clipper,uint256 nonce,uint256 deadline)");
    bytes32 public constant SET_PAYOUT_TYPEHASH =
        keccak256("SetPayout(address clipper,address payout,uint256 nonce,uint256 deadline)");

    // ─────────────────────────── Config ───────────────────────────

    ICreatorReputation public immutable reputation;
    uint64 public immutable override pendingTimeout;
    uint64 public immutable override resolveWindow;

    // ─────────────────────────── State ───────────────────────────

    uint256 public campaignCount;
    uint256 public clipCount;
    uint64 public override lastRound;

    mapping(uint256 campaignId => Campaign) internal _campaigns;
    mapping(uint256 clipId => Clip) internal _clips;
    mapping(uint256 clipId => Tranche[]) internal _tranches;
    mapping(uint256 clipId => uint256) internal _trancheHead; // first unreleased tranche
    mapping(bytes32 videoKey => uint256 clipId) public clipIdByVideo; // global uniqueness
    mapping(address clipper => uint256) public override nonces;
    mapping(address clipper => address) internal _payoutAddress;
    mapping(address token => bool) public override tokenAllowed;

    constructor(address forwarder, ICreatorReputation reputation_, uint64 pendingTimeout_, uint64 resolveWindow_)
        ReceiverTemplate(forwarder)
        EIP712("Cliprail", "1")
    {
        reputation = reputation_;
        pendingTimeout = pendingTimeout_;
        resolveWindow = resolveWindow_;
    }

    // ─────────────────────────── Brand ───────────────────────────

    /// @dev TODO I-1.2
    function createCampaign(CampaignParams calldata) external override returns (uint256) {
        revert NotImplemented();
    }

    /// @dev TODO I-1.2
    function createCampaignWithPermit(CampaignParams calldata, uint256, uint8, bytes32, bytes32)
        external
        override
        returns (uint256)
    {
        revert NotImplemented();
    }

    /// @dev TODO I-1.2
    function topUp(uint256, uint128) external override {
        revert NotImplemented();
    }

    /// @dev TODO I-2.3
    function closeCampaign(uint256) external override {
        revert NotImplemented();
    }

    /// @dev TODO I-2.2
    function flag(uint256, bytes32) external override {
        revert NotImplemented();
    }

    /// @dev TODO I-2.2
    function resolve(uint256, bool) external override {
        revert NotImplemented();
    }

    // ─────────────────────────── Clipper ───────────────────────────

    /// @dev TODO I-1.3
    function registerClip(uint256, string calldata) external override returns (uint256) {
        revert NotImplemented();
    }

    /// @dev TODO I-1.3
    function registerClipWithSig(RegisterClip calldata, bytes calldata) external override returns (uint256) {
        revert NotImplemented();
    }

    /// @dev TODO I-1.3
    function setPayoutAddressWithSig(SetPayout calldata, bytes calldata) external override {
        revert NotImplemented();
    }

    // ─────────────────────────── Oracle ───────────────────────────

    /// @dev TODO I-1.4: decode (uint64 round, ClipUpdate[]), require round > lastRound, apply PRD §5.2 rules 2–7,
    ///      skip bad entries with ReportEntrySkipped. Revert only for a stale round (forwarder checked by template).
    function _processReport(bytes calldata) internal override {
        revert NotImplemented();
    }

    // ─────────────────────────── Anyone (keeper) ───────────────────────────

    /// @dev TODO I-2.1
    function release(uint256[] calldata) external override {
        revert NotImplemented();
    }

    /// @dev TODO I-2.2
    function autoResolve(uint256) external override {
        revert NotImplemented();
    }

    // ─────────────────────────── Owner ───────────────────────────

    function setTokenAllowed(address token, bool allowed) external override onlyOwner {
        tokenAllowed[token] = allowed;
        emit TokenAllowed(token, allowed);
    }

    /// @notice Pauses create, register and reports. Release, close and resolve keep working.
    function setPaused(bool paused_) external override onlyOwner {
        if (paused_) _pause();
        else _unpause();
    }

    // ─────────────────────────── Views ───────────────────────────

    function getCampaign(uint256 campaignId) external view override returns (Campaign memory) {
        return _campaigns[campaignId];
    }

    function getClip(uint256 clipId) external view override returns (Clip memory) {
        return _clips[clipId];
    }

    function getTranches(uint256 clipId) external view override returns (Tranche[] memory) {
        return _tranches[clipId];
    }

    /// @dev TODO I-1.4 (rows for Pending and Active clips; oracle reads these)
    function activeClips(uint256, uint256) external pure override returns (ActiveClip[] memory) {
        revert NotImplemented();
    }

    /// @dev TODO I-2.1
    function releasableClips(uint256, uint256) external pure override returns (uint256[] memory) {
        revert NotImplemented();
    }

    /// @dev TODO I-2.2
    function expiredFlags(uint256, uint256) external pure override returns (uint256[] memory) {
        revert NotImplemented();
    }

    function payoutAddressOf(address clipper) external view override returns (address) {
        address p = _payoutAddress[clipper];
        return p == address(0) ? clipper : p;
    }

    /// @notice "CR-" + upper(hex(keccak256(abi.encodePacked(campaignId, clipper)))[2:10]).
    /// @dev Must match packages/shared claimCode() and the CRE workflow byte for byte.
    function claimCode(uint256 campaignId, address clipper) public pure override returns (string memory) {
        bytes32 h = keccak256(abi.encodePacked(campaignId, clipper));
        bytes memory hexUpper = "0123456789ABCDEF";
        bytes memory out = new bytes(11);
        out[0] = "C";
        out[1] = "R";
        out[2] = "-";
        for (uint256 i; i < 4; ++i) {
            uint8 b = uint8(h[i]);
            out[3 + i * 2] = hexUpper[b >> 4];
            out[4 + i * 2] = hexUpper[b & 0x0f];
        }
        return string(out);
    }

    /// @notice EIP-712 domain separator for {name:"Cliprail", version:"1", chainId, verifyingContract: this}.
    function domainSeparator() external view returns (bytes32) {
        return _domainSeparatorV4();
    }
}
