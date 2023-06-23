// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract COREDOGENFT is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    using SafeERC20 for ERC20;

    Counters.Counter private _tokenIdCounter;
    mapping (uint256 => uint256) public NFT_TYPE_MAX_SUPPLY;
    mapping (uint256 => uint256) public NFT_TYPE_TOTAL_SUPPLY;
    mapping (uint256 => uint256) public NFT_TYPE;
    mapping (uint256 => uint256) public NFT_PRICE;
    string public baseNftUri = "https://coredoge.xyz/api/token/";

    address public projectWallet = 0x7D6e2fD63436c3aa8eb774B6859e7350F3E5ac4D;
    address public tokenPayment;

    constructor() ERC721("COREDOGE NFTX", "CDN") {}

    function _baseURI() internal view override returns (string memory) {
        return baseNftUri;
    }

    function setBaseUri(string calldata _newBaseUri) public onlyOwner {
        baseNftUri = _newBaseUri;
    }

    function setPayment(address _token) public onlyOwner {
        tokenPayment = _token;
    }

    function safeMint(address to, uint256 _type) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        NFT_TYPE[tokenId] = _type;
        NFT_TYPE_TOTAL_SUPPLY[_type]++;
    }

    function buyItem(uint256 _type) public {
        uint256 amount = NFT_PRICE[_type];
        require(amount > 0 , "Amount invalid");
        require(NFT_TYPE_TOTAL_SUPPLY[_type] < NFT_TYPE_MAX_SUPPLY[_type], "Max supply");

        ERC20(tokenPayment).safeTransferFrom(msg.sender, projectWallet, amount);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        NFT_TYPE[tokenId] = _type;
        NFT_TYPE_TOTAL_SUPPLY[_type]++;
    }

    function setPriceNft(uint256[] calldata _prices) public onlyOwner {
        for(uint i = 0; i < _prices.length; i++) {
            NFT_PRICE[i] = _prices[i];
        }
    }

    function setMaxSupply(uint256[] calldata _supply) public onlyOwner {
        for(uint i = 0; i < _supply.length; i++) {
            NFT_TYPE_MAX_SUPPLY[i] = _supply[i];
        }
    }

    function saftBatchMint( uint256 _number, uint256 _type) public {
        for(uint i = 0; i < _number; i++) {
            safeMint(msg.sender, _type);
        }
    }

    function batchTransferOne(uint256[] calldata _tokenIds, address _account) public {
        for (uint256 index = 0; index < _tokenIds.length; index++) {
            transferFrom(msg.sender, _account, _tokenIds[index]);
        }
    }

    function batchTransferMulti(uint256[] calldata _tokenIds, address[] calldata _accounts) public {
        for (uint256 index = 0; index < _tokenIds.length; index++) {
            transferFrom(msg.sender, _accounts[index], _tokenIds[index]);
        }
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
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