import { BigInt, Bytes, JSONValue, ipfs, json } from "@graphprotocol/graph-ts";
import { ListedItem, Token } from "../generated/schema";
import { getTokenURI } from "./modules/nft";
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

  const nftId = nftContract.toHexString() + "-" + tokenId.toString();

  let token = Token.load(nftId);

  if (!token) {
    token = new Token(nftId);
    let ipfsHash = getTokenURI(tokenId, nftContract);
    log.debug("Creating new entity - {}, ipfs hash - {}", [nftId, ipfsHash]);

    if (ipfsHash) {
      token.tokenURI = ipfsHash;

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
            log.debug(
              "Token metadata: name {}, description {}, image {}, tokenId {}",
              [
                name.toString(),
                description.toString(),
                image.toString(),
                tokenId.toString(),
              ]
            );

            token.id = nftId;
            token.tokenID = tokenId.toString();
            token.name = name.toString();
            token.image = image.toString();
            token.description = description.toString();
          }

          if (attributes && attributes.data) {
            const attributesArray = attributes.toArray();
            let categories: string[] = [];
            let features: string[] = [];
            let scarcity = "";
            let twinNFT = "";

            for (let i = 0; i < attributesArray.length; i++) {
              const objectData = attributesArray[i].toObject();

              if (objectData) {
                const trait_typeData = objectData.get("trait_type");
                const valueData = objectData.get("value");

                if (trait_typeData && valueData) {
                  const trait_type = trait_typeData.toString();
                  const value = valueData.toString();

                  if (trait_type && value) {
                    if (trait_type == "Category") {
                      categories.push(value);
                    }

                    if (trait_type == "Features") {
                      features.push(value);
                    }

                    if (trait_type == "Scarcity") {
                      scarcity = value;
                    }

                    if (trait_type == "Twin NFT") {
                      twinNFT = value;
                    }
                  }
                } else {
                  log.error(
                    "Did not catch the trait_type and value of attributes array",
                    []
                  );
                }
              } else {
                log.warning(
                  "Did not catch the array object of attributes array",
                  []
                );
              }
            }

            token.categories = categories;
            token.features = features;
            token.scarcity = scarcity;
            token.twin = twinNFT;
          } else {
            log.info("Did not catch the attributes array", []);
          }
        }
      } else {
        log.debug(
          "TokenId {} from contract {} reverted, could not find the tokenURI metadata",
          [tokenId.toString(), nftContract.toString()]
        );
      }
    } else {
      log.error("Could not find token URI", [nftId]);
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

  token.save();
  item.save();
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
