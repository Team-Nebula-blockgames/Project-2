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
    mapping (address => fileDetails) internal user;

    struct fileDetails {
        uint256[] _publicTokens;
        uint256[] _privateTokens;
        uint256[] _receivedTokens;
    }

    constructor() ERC721("SHELF", "SLF") {}

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
        if (_isPrivate){
            user[msg.sender]._privateTokens.push(newItemId);
        }else {
            user[msg.sender]._publicTokens.push(newItemId);
            publicTokensIds.push(newItemId);
        }
    }

    /// @dev Encodes the files metadata as JSON.
    function tokenURI(uint256 tokenId) override(ERC721) public view returns (string memory) {
        string memory metadata = tokenIdtoMetadata[tokenId];
        string memory json = Base64.encode(bytes(string(abi.encodePacked(metadata))));
        return string(abi.encodePacked('data:application/json;base64,', json));
    }
    // all tokens in system
    function getAllPublicTokens() public view returns (uint256[] memory){
    return publicTokensIds;
    }
    
    function shareToken(address to, uint256 idd)public  {
        user[to]._receivedTokens.push(idd);
      
    }
    
    function getMyRecievedTokens(address costumer) public view returns(uint256[] memory){
        return user[costumer]._receivedTokens;
    }
    function getMyPublicTokens(address costumer) public view returns (uint256[] memory){
    return user[costumer]._publicTokens;
    }
    function getMyPrivateTokens(address costumer) public view returns(uint256[] memory){
    return user[costumer]._privateTokens; 
    }
} 