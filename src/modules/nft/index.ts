import { Token } from "../../../generated/templates/Token/Token";
import { log } from "matchstick-as";
import { Address, BigInt } from "@graphprotocol/graph-ts";

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
