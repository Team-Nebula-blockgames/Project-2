// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./Base64.sol";

contract Nebula is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => string) private tokenIdtoMetadata;
    uint256[] public publicTokensIds;
    mapping(address => FileDetails) internal user;

    struct FileDetails {
        uint256[] _publicTokens;
        uint256[] _privateTokens;
        uint256[] _receivedTokens;
    }

    constructor() ERC721("SHELF", "SLF") {}

    function uploadFile(string memory input, bool _isPrivate) public {
        // use tokenCounter as an id for each created token
        // use _safeMint inherited from ERC721 contract to mint a token

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        tokenIdtoMetadata[newItemId] = input;
        _safeMint(msg.sender, newItemId);
        if (_isPrivate) {
            user[msg.sender]._privateTokens.push(newItemId);
        } else {
            user[msg.sender]._publicTokens.push(newItemId);
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
        string memory metadata = tokenIdtoMetadata[tokenId];
        return metadata;
        // string memory json = Base64.encode(
        //     bytes(string(abi.encodePacked(metadata)))
        // );
        // return string(abi.encodePacked("data:application/json;base64,", json));
    }

    /// @notice returns all tokens that are Public.
    function getAllPublicTokens() public view returns (uint256[] memory) {
        return publicTokensIds;
    }

    /** 
    @dev gets tokens that were shared to our customer.
    @notice This function returns an array of tokenIds that were shared to our customer.
    @param userId address of the customer.
    */
    function getUserRecievedTokens(address userId)
        public
        view
        returns (uint256[] memory)
    {
        return user[userId]._receivedTokens;
    }

    /** 
    @dev gets tokens our customer made public
    @notice This function returns an array of tokenIds that our customer made public.
    @param userId address of the customer.
    */
    function getUserPublicTokens(address userId)
        public
        view
        returns (uint256[] memory)
    {
        return user[userId]._publicTokens;
    }

    /** 
    @dev gets tokens our customer made private
    @notice This function returns an array of tokenIds that our customer made private.
    @param userId address of the customer.
    */
    function getUserPrivateTokens(address userId)
        public
        view
        returns (uint256[] memory)
    {
        return user[userId]._privateTokens;
    }

    function shareToken(address addressTo, uint256 tokenId) public {
        user[addressTo]._receivedTokens.push(tokenId);
    }
}
