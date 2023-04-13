import { Token } from '../../../generated/templates/Token/Token';
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

  return tokenURI;
}

export function getTokenImage(tokenURI: string): string {
  let image = "";

  if (tokenURI) {
    let data = ipfs.cat(tokenURI);

    if (data) {
      let objectCallResult = json.try_fromBytes(data);

      if (objectCallResult.isOk) {
        let metadata = objectCallResult.value.toObject();

        let imageCallResult = metadata.get("image");

        if (imageCallResult) {
          image = imageCallResult.data.toString();
        }
      }
    }
    log.warning("No data from tokenURI", []);
  } else {
    log.warning("TokenURI does not exist", []);
  }
  return image;
}

export function getTokenName(tokenURI: string): string {
  let name = "";

  if (tokenURI) {
    let data = ipfs.cat(tokenURI);

    if (data) {
      let objectCallResult = json.try_fromBytes(data);

      if (objectCallResult.isOk) {
        let metadata = objectCallResult.value.toObject();

        let nameCallResult = metadata.get("name");

        if (nameCallResult) {
          name = nameCallResult.data.toString();
        }
      }
    }
    log.warning("No data from tokenURI", []);
  } else {
    log.warning("TokenURI does not exist", []);
  }
  return name;
}

export function getTokenDescription(tokenURI: string): string {
  let description = "";

  if (tokenURI) {
    let data = ipfs.cat(tokenURI);

    if (data) {
      let objectCallResult = json.try_fromBytes(data);

      if (objectCallResult.isOk) {
        let metadata = objectCallResult.value.toObject();

        let descriptionCallResult = metadata.get("description");

        if (descriptionCallResult) {
          description = descriptionCallResult.data.toString();
        }
      }
    }
    log.warning("No data from tokenURI", []);
  } else {
    log.warning("TokenURI does not exist", []);
  }
  return description;
}
