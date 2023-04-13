import { Token } from "../../../generated/templates/Token/Token";
import { log } from "matchstick-as";
import { Address, BigInt, ipfs, json } from "@graphprotocol/graph-ts";

export function getNFTId(contractAddress: Address, tokenId: BigInt): string {
  return contractAddress.toHexString() + "-" + tokenId.toString();
}

export function getTokenURI(tokenId: BigInt, tokenAddress: Address): string {
  let token = Token.bind(tokenAddress);
  let tokenURICallResult = token.try_tokenURI(tokenId);

  let tokenURI = "";

  if (tokenURICallResult.reverted) {
    let uriCallResult = token.try_uri(tokenId);
    if (uriCallResult.reverted) {
      log.warning("tokenURI reverted for tokenID: {} contract: {}", [
        tokenId.toString(),
        tokenAddress.toHexString(),
      ]);
    } else {
      tokenURI = uriCallResult.value;
    }
  } else {
    tokenURI = tokenURICallResult.value;
  }
  log.debug("tokenURI - {} tokenID: {} contract: {}", [
    tokenURI,
    tokenId.toString(),
    tokenAddress.toHexString(),
  ]);

  return tokenURI;
}

export function getTokenImage(tokenURI: string): string {
  let image = "";
  if (tokenURI) {
    const metadata = ipfs.cat(tokenURI);
    if (metadata) {
      const value = json.fromBytes(metadata).toObject();

      if (value) {
        const imageData = value.get("image");
        if (imageData) {
          image = imageData.toString();
        }
      }
      log.debug("Something happened to value bytes from tokenURI metadata", [
        tokenURI,
      ]);
    }
    log.debug("tokenURI {} with no metadata", [tokenURI]);
  } else {
    log.debug("NFT with no tokenURI", []);
  }
  return image;
}

export function getTokenName(tokenURI: string): string {
  let name = "";
  if (tokenURI) {
    const metadata = ipfs.cat(tokenURI);
    if (metadata) {
      const value = json.fromBytes(metadata).toObject();

      if (value) {
        const nameData = value.get("name");
        if (nameData) {
          name = nameData.toString();
        }
      }
      log.debug("Something happened to value bytes from tokenURI metadata", [
        tokenURI,
      ]);
    }
    log.debug("tokenURI {} with no metadata", [tokenURI]);
  } else {
    log.debug("NFT with no tokenURI", []);
  }
  return name;
}

export function getTokenDescription(tokenURI: string): string {
  let description = "";
  if (tokenURI) {
    const metadata = ipfs.cat(tokenURI);
    if (metadata) {
      const value = json.fromBytes(metadata).toObject();

      if (value) {
        const descriptionData = value.get("description");
        if (descriptionData) {
          description = descriptionData.toString();
        }
      }
      log.debug("Something happened to value bytes from tokenURI metadata", [
        tokenURI,
      ]);
    }
    log.debug("tokenURI {} with no metadata", [tokenURI]);
  } else {
    log.debug("NFT with no tokenURI", []);
  }
  return description;
}
