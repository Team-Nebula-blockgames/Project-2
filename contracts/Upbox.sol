// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Upbox is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    using Base64 for bytes;

    mapping(uint256 => string) private tokenIdtoMetadata;
    uint256[] public publicTokensIds;
    mapping(address => UserTokens) internal userTokens;
    address[] public blackListedUsers;

    struct UserTokens {
        uint256[] _publicTokens;
        uint256[] _privateTokens;
        uint256[] _receivedTokens;
    }

    constructor() ERC721("Upbox", "UBX") {}

    austin add the tokenUri and uploadfile function

    // share tokens
    function shareToken(address to, uint256 idd) public {
        userTokens[to]._receivedTokens.push(idd);
    }

    // users recieved tokens
    function getMyRecievedTokens() public view returns (uint256[] memory) {
        return userTokens[msg.sender]._receivedTokens;
    }

    // remove public tokens _index = 0,1...
    function removePublicTokens(uint256 _index) public onlyOwner {
        // delete publicTokensIds[tokenId];
        require(_index < publicTokensIds.length, "out of bound");
        for (uint256 i = _index; i < publicTokensIds.length - 1; i++) {
            publicTokensIds[i] = publicTokensIds[i + 1];
        }
        publicTokensIds.pop();
    }

    // add to blacklist
    function addblackListedUser(address userAddress) public onlyOwner {
        blackListedUsers.push(userAddress);
    }

    // getblack listed users
    function getblackListedUser() public view returns (address[] memory) {
        return blackListedUsers;
    }

    // all tokens in system
    function getAllPublicTokens() public view returns (uint256[] memory) {
        return publicTokensIds;
    }

    function getMyPublicTokens() public view returns (uint256[] memory) {
        return userTokens[msg.sender]._publicTokens;
    }

    function getMyPrivateTokens() public view returns (uint256[] memory) {
        return userTokens[msg.sender]._privateTokens;
    }

    /**
     * @notice Emergency stop contract in a case of a critical security flaw.
     */
    function destroy() public onlyOwner {
        selfdestruct(payable(owner()));
    }
}
