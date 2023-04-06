import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  DeleteItem,
  NewBoughtItem,
  NewListing,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  UpdateItemAddAmount,
  UpdateItemPrice,
  UpdateItemRemoveAmount,
  UpdateMarketplaceFee
} from "../generated/Marketplace/Marketplace"

export function createDeleteItemEvent(tokenId: BigInt): DeleteItem {
  let deleteItemEvent = changetype<DeleteItem>(newMockEvent())

  deleteItemEvent.parameters = new Array()

  deleteItemEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return deleteItemEvent
}

export function createNewBoughtItemEvent(
  itemId: BigInt,
  tokenId: BigInt,
  price: BigInt,
  amount: BigInt,
  seller: Address,
  nftContract: Address,
  buyer: Address,
  buyingAmount: BigInt,
  payed: BigInt
): NewBoughtItem {
  let newBoughtItemEvent = changetype<NewBoughtItem>(newMockEvent())

  newBoughtItemEvent.parameters = new Array()

  newBoughtItemEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromUnsignedBigInt(itemId))
  )
  newBoughtItemEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  newBoughtItemEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  newBoughtItemEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  newBoughtItemEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  newBoughtItemEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  newBoughtItemEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  newBoughtItemEvent.parameters.push(
    new ethereum.EventParam(
      "buyingAmount",
      ethereum.Value.fromUnsignedBigInt(buyingAmount)
    )
  )
  newBoughtItemEvent.parameters.push(
    new ethereum.EventParam("payed", ethereum.Value.fromUnsignedBigInt(payed))
  )

  return newBoughtItemEvent
}

export function createNewListingEvent(
  itemId: BigInt,
  tokenId: BigInt,
  amount: BigInt,
  price: BigInt,
  owner: Address,
  nftContract: Address
): NewListing {
  let newListingEvent = changetype<NewListing>(newMockEvent())

  newListingEvent.parameters = new Array()

  newListingEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromUnsignedBigInt(itemId))
  )
  newListingEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  newListingEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  newListingEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  newListingEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  newListingEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )

  return newListingEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createUpdateItemAddAmountEvent(
  itemId: BigInt,
  addingAmount: BigInt
): UpdateItemAddAmount {
  let updateItemAddAmountEvent = changetype<UpdateItemAddAmount>(newMockEvent())

  updateItemAddAmountEvent.parameters = new Array()

  updateItemAddAmountEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromUnsignedBigInt(itemId))
  )
  updateItemAddAmountEvent.parameters.push(
    new ethereum.EventParam(
      "addingAmount",
      ethereum.Value.fromUnsignedBigInt(addingAmount)
    )
  )

  return updateItemAddAmountEvent
}

export function createUpdateItemPriceEvent(
  itemId: BigInt,
  newPrice: BigInt
): UpdateItemPrice {
  let updateItemPriceEvent = changetype<UpdateItemPrice>(newMockEvent())

  updateItemPriceEvent.parameters = new Array()

  updateItemPriceEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromUnsignedBigInt(itemId))
  )
  updateItemPriceEvent.parameters.push(
    new ethereum.EventParam(
      "newPrice",
      ethereum.Value.fromUnsignedBigInt(newPrice)
    )
  )

  return updateItemPriceEvent
}

export function createUpdateItemRemoveAmountEvent(
  itemId: BigInt,
  addingAmount: BigInt
): UpdateItemRemoveAmount {
  let updateItemRemoveAmountEvent = changetype<UpdateItemRemoveAmount>(
    newMockEvent()
  )

  updateItemRemoveAmountEvent.parameters = new Array()

  updateItemRemoveAmountEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromUnsignedBigInt(itemId))
  )
  updateItemRemoveAmountEvent.parameters.push(
    new ethereum.EventParam(
      "addingAmount",
      ethereum.Value.fromUnsignedBigInt(addingAmount)
    )
  )

  return updateItemRemoveAmountEvent
}

export function createUpdateMarketplaceFeeEvent(
  sender: Address,
  amount: i32
): UpdateMarketplaceFee {
  let updateMarketplaceFeeEvent = changetype<UpdateMarketplaceFee>(
    newMockEvent()
  )

  updateMarketplaceFeeEvent.parameters = new Array()

  updateMarketplaceFeeEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  updateMarketplaceFeeEvent.parameters.push(
    new ethereum.EventParam(
      "amount",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(amount))
    )
  )

  return updateMarketplaceFeeEvent
}
