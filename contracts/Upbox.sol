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
        bytes memory jsonBytes = bytes(string(abi.encodePacked(metadata)));
        string memory jsonString = jsonBytes.encode();

        return
            string(
                abi.encodePacked("data:application/json;base64,", jsonString)
            );
    }

    // all tokens in system
    
    
    
    
    function getMyPublicTokens() public view returns (uint256[] memory) {
        return userTokens[msg.sender]._publicTokens;
    }

    function getMyPrivateTokens() public view returns (uint256[] memory) {
        return userTokens[msg.sender]._privateTokens;
    }
}
