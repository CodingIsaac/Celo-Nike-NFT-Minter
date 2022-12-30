// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NikeGobbler is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
   

    Counters.Counter private _tokenIdCounter;
     uint public MAX_SUPPLY = 1000;
     
     struct Nike {
        address payable owner;
        uint nikePrice;
        bool forSale;

     }
     mapping (uint256 => Nike) public nikes;

    constructor() ERC721("MyNFT", "MNFT") {}

    function safeMint(address to, string calldata uri, uint price) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId <= MAX_SUPPLY, "Maximum supply exceeded");
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        nikes[tokenId] = Nike(payable(msg.sender), price, false);
    }


    /**
        * @notice allows toggling of sale status for a shoe's NFT
     */
    function toggleSale(uint tokenId) public {
        require(_exists(tokenId));
        Nike storage currentNike = nikes[tokenId];
        require(currentNike.owner == msg.sender);
        currentNike.forSale = !currentNike.forSale;
    }




    /**
        * @notice allow users to buy a shoe that is on sale
        * @dev NFT is transferred to new owner and current holder of NFT is the one being paid
     */
    function buyListedNike(uint256 tokenId) public payable returns(bool Bought) {
        require(_exists(tokenId));
        Nike storage currentNike = nikes[tokenId];
        require(currentNike.forSale, "Shoe isn't for sale");
        require(msg.value == currentNike.nikePrice,"Insufficient Balance");
        require(msg.sender != currentNike.owner, "Owner San't buy his minted Nike Shoe");
        address idOwner = ownerOf(tokenId);
        currentNike.owner = payable(msg.sender);
        currentNike.forSale = false;
        _transfer(idOwner, msg.sender, tokenId);
       (Bought, ) = payable(idOwner).call{value: msg.value} ("");
       require(Bought, "Failed");
    }


    function getTotalNike() external view returns(uint256) {
        return _tokenIdCounter.current();
    }



    
    // The following functions are overrides required by Solidity.

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
