// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NikeGobbler is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
   

    Counters.Counter private _tokenIdCounter;
     uint MAX_SUPPLY = 1000;
     struct Nike {
        address payable owner;
        uint nikePrice;
        uint256 nikeId;

     }
     mapping (uint256 => Nike) nike;

    constructor() ERC721("MyNFT", "MNFT") {}

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        require(_tokenIdCounter.current() <= MAX_SUPPLY, "Maximum supply exceeded");
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    

   /*

   Users should be able to buy Nike.
   Users should be able to mint Nike spike
   Only owner should be able to get the length of the minted Nikes

   */

    function buyListedNike(uint256 tokenId) public payable returns(bool Bought) {
        Nike storage nikeShoes = nike[tokenId];
        require( msg.value >= 0.1 ether,"Insufficient Balance");
        require( msg.sender != nikeShoes.owner, "Owner San't buy his minted Nike Shoe");
        require(tokenId == nikeShoes.nikeId, "ID doesn't exist");
        address idOwner = ownerOf(tokenId);
        nikeShoes.nikePrice += msg.value;
       (Bought, ) = payable(idOwner).call{value: msg.value} ("");
       require(Bought, "Failed");





    }



    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}