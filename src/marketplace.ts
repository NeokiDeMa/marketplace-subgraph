import {
  DeleteItem as DeleteItemEvent,
  NewBoughtItem as NewBoughtItemEvent,
  NewListing as NewListingEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  UpdateItemAddAmount as UpdateItemAddAmountEvent,
  UpdateItemPrice as UpdateItemPriceEvent,
  UpdateItemRemoveAmount as UpdateItemRemoveAmountEvent,
  UpdateMarketplaceFee as UpdateMarketplaceFeeEvent
} from "../generated/Marketplace/Marketplace"
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
} from "../generated/schema"

export function handleDeleteItem(event: DeleteItemEvent): void {
  let entity = new DeleteItem(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewBoughtItem(event: NewBoughtItemEvent): void {
  let entity = new NewBoughtItem(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.itemId = event.params.itemId
  entity.tokenId = event.params.tokenId
  entity.price = event.params.price
  entity.amount = event.params.amount
  entity.seller = event.params.seller
  entity.nftContract = event.params.nftContract
  entity.buyer = event.params.buyer
  entity.buyingAmount = event.params.buyingAmount
  entity.payed = event.params.payed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewListing(event: NewListingEvent): void {
  let entity = new NewListing(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.itemId = event.params.itemId
  entity.tokenId = event.params.tokenId
  entity.amount = event.params.amount
  entity.price = event.params.price
  entity.owner = event.params.owner
  entity.nftContract = event.params.nftContract

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpdateItemAddAmount(
  event: UpdateItemAddAmountEvent
): void {
  let entity = new UpdateItemAddAmount(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.itemId = event.params.itemId
  entity.addingAmount = event.params.addingAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpdateItemPrice(event: UpdateItemPriceEvent): void {
  let entity = new UpdateItemPrice(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.itemId = event.params.itemId
  entity.newPrice = event.params.newPrice

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpdateItemRemoveAmount(
  event: UpdateItemRemoveAmountEvent
): void {
  let entity = new UpdateItemRemoveAmount(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.itemId = event.params.itemId
  entity.addingAmount = event.params.addingAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpdateMarketplaceFee(
  event: UpdateMarketplaceFeeEvent
): void {
  let entity = new UpdateMarketplaceFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
