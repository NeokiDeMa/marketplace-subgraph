import { BigInt, Bytes, ipfs, json } from "@graphprotocol/graph-ts";
import { ListedItem, Token } from "../generated/schema";
import { getNFTId, getTokenURI } from "./modules/nft";
import { log } from "matchstick-as";
import {
  DeleteItem as DeleteItemEvent,
  BuyItem as NewBoughtItemEvent,
  NewListing as NewListingEvent,
  UpdateItemAmount as UpdateItemAmountEvent,
  UpdateItemPrice as UpdateItemPriceEvent,
} from "../generated/Marketplace/Marketplace";

export function handleNewListing(event: NewListingEvent): void {
  const tokenId = event.params.tokenId;
  const nftContract = event.params.nftContract;

  const nftId = getNFTId(event.params.nftContract, event.params.tokenId);

  let token = Token.load(nftId);

  if (!token) {
    token = new Token(nftId);
    let ipfsHash = getTokenURI(tokenId, nftContract);

    log.debug("Got tokenId {} ipfsURL: {}", [
      tokenId.toString(),
      ipfsHash.toString(),
    ]);

    if (ipfsHash) {
      token.tokenURI = ipfsHash.toString();
    }
    let ipfsHashTreated = ipfsHash.replace("ipfs://", "");
    let metadata = ipfs.cat(ipfsHashTreated); // ipfs://QmeuAixk72C5roa9HuPjh6MksX2qJSkzUxhzeM1Y9TZxc4
    if (metadata) {
      const value = json.fromBytes(metadata).toObject();

      if (value) {
        const name = value.get("name");
        const description = value.get("description");
        const image = value.get("image");
        const attributes = value.get("attributes");

        if (name && image && description) {
          token.id = nftId;
          token.tokenID = tokenId;
          token.name = name.toString();
          token.image = image.toString();
          token.description = description.toString();
        }

        if (attributes && attributes.data) {
          const attributesArray = attributes.toArray();
          const categories = [];
          const features = [];
          const scarcity = "";

          for (let i = 0; i < attributesArray.length; i++) {
            log.debug("NFT attributes", [attributesArray[i].data.toString()]);
          }
        }
      }
    } else {
      log.debug("TokenId {} from contract {} reverted for URI call", [
        tokenId.toString(),
        nftContract.toString(),
      ]);
    }
  }

  let item = new ListedItem(event.params.itemId.toString());

  item.itemId = event.params.itemId;
  item.tokenId = event.params.tokenId;
  item.amount = event.params.amount;
  item.price = event.params.price;
  item.owner = event.params.owner;
  item.nftContract = event.params.nftContract;
  item.isSellable = true;
  item.createdAt = event.block.timestamp;
  item.updatedAt = event.block.timestamp;
  item.nft = token.id;

  // token.listed = item.id;

  item.save();
  token.save();
}

export function handleNewBoughtItem(event: NewBoughtItemEvent): void {
  let entity = ListedItem.load(event.params.itemId.toString());
  if (!entity) {
    return;
  }
  entity.itemId = event.params.itemId;
  entity.amount = event.params.listedAmount;
  entity.updatedAt = event.block.timestamp;

  entity.save();
}

export function handleDeleteItem(event: DeleteItemEvent): void {
  let item = ListedItem.load(event.params.itemId.toString());
  if (!item) {
    return;
  }
  item.tokenId = BigInt.fromU32(0);
  item.amount = BigInt.fromU32(0);
  item.price = BigInt.fromU32(0);
  item.owner = Bytes.fromHexString("0x00");
  item.isSellable = false;
  item.nftContract = Bytes.fromHexString("0x00");
  item.updatedAt = event.block.timestamp;

  item.save();
}

export function handleUpdateItemAmount(event: UpdateItemAmountEvent): void {
  let entity = ListedItem.load(event.params.itemId.toString());
  if (!entity) {
    return;
  }
  entity.amount = event.params.newListedAmount;
  entity.updatedAt = event.block.timestamp;

  entity.save();
}

export function handleUpdateItemPrice(event: UpdateItemPriceEvent): void {
  let entity = ListedItem.load(event.params.itemId.toString());
  if (!entity) {
    return;
  }
  entity.itemId = event.params.itemId;
  entity.price = event.params.newPrice;
  entity.updatedAt = event.block.timestamp;

  entity.save();
}
