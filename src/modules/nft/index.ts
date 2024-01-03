import { Token } from "../../../generated/templates/Token/Token";
import { log } from "matchstick-as";
import { Address, BigInt } from "@graphprotocol/graph-ts";

 
export function getTokenURI(tokenId: BigInt, tokenAddress: Address): string {
  let token = Token.bind(tokenAddress);
  let tokenURICallResult = token.try_tokenURI(tokenId);

  let tokenURI = "";

  if (tokenURICallResult.reverted) {
    let uriCallResult = token.try_uri(tokenId);
    if (uriCallResult.reverted) {
      log.error("Could not get URI for tokenID: {} contract: {}", [
        tokenId.toString(),
        tokenAddress.toHexString(),
      ]);
    } else {
      let tokenURIvalue = uriCallResult.value;
      if (tokenURIvalue) {
        tokenURI = tokenURIvalue;
        log.debug("Loaded tokenURI - {}, from tokenID: {} contract: {}", [
          tokenURI,
          tokenId.toString(),
          tokenAddress.toHexString(),
        ]);
      } else {
        log.error("Could not get URI for tokenID: {} contract: {}", [
          tokenId.toString(),
          tokenAddress.toHexString(),
        ]);
      }
    }
  } else {
    let tokenURIvalue = tokenURICallResult.value;
    if (tokenURIvalue) {
      tokenURI = tokenURIvalue;
      log.debug("Loaded tokenURI - {}, from tokenID: {} contract: {}", [
        tokenURI,
        tokenId.toString(),
        tokenAddress.toHexString(),
      ]);
    } else {
      log.error("Could not get token URI of tokenID: {} contract: {}", [
        tokenId.toString(),
        tokenAddress.toHexString(),
      ]);
    }
  }

  return tokenURI;
}
