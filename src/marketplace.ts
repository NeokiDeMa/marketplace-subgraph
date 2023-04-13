import { BigInt, Bytes, ipfs } from "@graphprotocol/graph-ts";
import { ListedItem, NFT } from "../generated/schema";
import {
  DeleteItem as DeleteItemEvent,
  BuyItem as NewBoughtItemEvent,
  NewListing as NewListingEvent,
  UpdateItemAmount as UpdateItemAmountEvent,
  UpdateItemPrice as UpdateItemPriceEvent,
} from "../generated/Marketplace/Marketplace";

import {
  getNFTId,
  getTokenDescription,
  getTokenImage,
  getTokenName,
  getTokenURI,
} from "./modules/nft";

export function handleNewListing(event: NewListingEvent): void {
  let tokenAddress = event.params.nftContract;
  let tokenId = event.params.tokenId;
  let nftId = getNFTId(tokenAddress, tokenId);

  let nft = NFT.load(nftId);

  if (!nft) {
    let tokenURI = getTokenURI(tokenId, tokenAddress);
    let name = getTokenName(tokenURI);
    let description = getTokenDescription(tokenURI);
    let image = getTokenImage(tokenURI);

    nft = new NFT(nftId);
    nft.tokenID = tokenId;
    nft.tokenURI = tokenURI;
    nft.name = name;
    nft.description = description;
    nft.image = image;
  }

  let item = new ListedItem(Bytes.fromI32(event.params.itemId.toI32()));

  item.itemId = event.params.itemId;
  item.tokenId = event.params.tokenId;
  item.amount = event.params.amount;
  item.price = event.params.price;
  item.owner = event.params.owner;
  item.nftContract = event.params.nftContract;
  item.isSellable = true;
  item.createdAt = event.block.timestamp;
  item.updatedAt = event.block.timestamp;
  item.nft = nft.id;
  item.save();
}

export function handleNewBoughtItem(event: NewBoughtItemEvent): void {
  let entity = ListedItem.load(Bytes.fromI32(event.params.itemId.toI32()));
  if (!entity) {
    return;
  }
  entity.itemId = event.params.itemId;
  entity.amount = event.params.listedAmount;
  entity.updatedAt = event.block.timestamp;

  entity.save();
}

export function handleDeleteItem(event: DeleteItemEvent): void {
  let entity = ListedItem.load(Bytes.fromI32(event.params.itemId.toI32()));
  if (!entity) {
    return;
  }
  entity.tokenId = BigInt.fromU32(0);
  entity.amount = BigInt.fromU32(0);
  entity.price = BigInt.fromU32(0);
  entity.owner = Bytes.fromHexString("0x00");
  entity.isSellable = false;
  entity.nftContract = Bytes.fromHexString("0x00");
  entity.updatedAt = event.block.timestamp;
  entity.nft = "";

  entity.save();
}

export function handleUpdateItemAmount(event: UpdateItemAmountEvent): void {
  let entity = ListedItem.load(Bytes.fromI32(event.params.itemId.toI32()));
  if (!entity) {
    return;
  }
  entity.amount = event.params.newListedAmount;
  entity.updatedAt = event.block.timestamp;

  entity.save();
}

export function handleUpdateItemPrice(event: UpdateItemPriceEvent): void {
  let entity = ListedItem.load(Bytes.fromI32(event.params.itemId.toI32()));
  if (!entity) {
    return;
  }
  entity.itemId = event.params.itemId;
  entity.price = event.params.newPrice;
  entity.updatedAt = event.block.timestamp;

  entity.save();
}
