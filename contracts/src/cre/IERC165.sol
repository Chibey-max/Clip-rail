// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @dev ERC-165 interface, as imported by Chainlink's IReceiver and ReceiverTemplate.
interface IERC165 {
  function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
