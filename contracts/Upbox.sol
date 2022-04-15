// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./Base64.sol";

contract Upbox is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    // uint256 public tokenCounter;

    mapping(uint256 => string) private tokenIdtoMetadata;
    uint256[] public publicTokensIds;
    mapping(address => UserTokens) internal userTokens;

    struct UserTokens {
        uint256[] _publicTokens;
        uint256[] _privateTokens;
        uint256[] _receivedTokens;
    }

    constructor() ERC721("Upbox", "UBX") {}

    /**
    @notice Uploads a new file
    @param _isPrivate privacy of uploaded file
     */
    function uploadFile(string memory input, bool _isPrivate) public {
        // use tokenCounter as an id for each created token
        // use _safeMint inherited from ERC721 contract to mint a token

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        tokenIdtoMetadata[newItemId] = input;
        _safeMint(msg.sender, newItemId);
        if (_isPrivate) {
            userTokens[msg.sender]._privateTokens.push(newItemId);
        } else {
            userTokens[msg.sender]._publicTokens.push(newItemId);
            publicTokensIds.push(newItemId);
        }
    }

    /// @dev Encodes the files metadata as JSON.
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        require(ownerOf(tokenId) != address(0), "Token does not exist.");
        string memory metadata = tokenIdtoMetadata[tokenId];
        string memory json = Base64.encode(
            bytes(string(abi.encodePacked(metadata)))
        );
        return string(abi.encodePacked("data:application/json;base64,", json));
    }

    // all tokens in system
    function getAllPublicTokens() public view returns (uint256[] memory) {
        return publicTokensIds;
    }

    function shareToken(address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Only token owner can share.");
        userTokens[to]._receivedTokens.push(tokenId);
    }

    function getMyRecievedTokens() public view returns (uint256[] memory) {
        return userTokens[msg.sender]._receivedTokens;
    }

    function getMyPublicTokens() public view returns (uint256[] memory) {
        return userTokens[msg.sender]._publicTokens;
    }

    function getMyPrivateTokens() public view returns (uint256[] memory) {
        return userTokens[msg.sender]._privateTokens;
    }
}
