# CampusBid Database Schema Documentation

CampusBid uses MongoDB with Mongoose ODM. All currency values are stored as **integer paise** (e.g. ₹250.00 is stored as `25000`).

## 1. Collections and Models

### 1.1 `users`
Represents user profiles synchronized from Firebase Authentication.

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `_id` | ObjectId | MongoDB Identifier | Primary |
| `firebaseUid` | String | Unique Firebase Auth UID | Unique |
| `displayName` | String | User's public display name | Yes |
| `email` | String | User's email (private) | No |
| `profileImage` | Object | `{ publicId: String, secureUrl: String }` | No |
| `accountStatus` | String | `'ACTIVE'` \| `'SUSPENDED'` | Yes |
| `notificationPreferences` | Object | Outbid, closing soon, sale updates flags | No |
| `stats` | Object | `{ completedSales: Number, ratingCount: Number, averageRating: Number }` | No |
| `createdAt` | Date | Timestamp | No |
| `updatedAt` | Date | Timestamp | No |

### 1.2 `listings`
Represents an auction item.

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `_id` | ObjectId | MongoDB Identifier | Primary |
| `sellerId` | ObjectId | Ref to `User` | Yes |
| `title` | String | Item title | Text |
| `category` | String | `'ELECTRONICS'`, `'BOOKS'`, `'CYCLES'`, etc. | Compound with status |
| `description` | String | Detailed description | Text |
| `condition` | String | `'NEW'`, `'LIKE_NEW'`, `'GOOD'`, `'FAIR'` | Compound with status |
| `images` | Array | `[{ publicId: String, secureUrl: String, order: Number }]` | No |
| `startingPricePaise` | Number | Starting price in integer paise | No |
| `minBidIncrementPaise` | Number | Increment in integer paise (e.g. ₹50 -> 5000) | No |
| `currentPricePaise` | Number | Denormalized current winning price | Yes |
| `leadingBidderId` | ObjectId | Ref to `User` (current leader) | No |
| `bidCount` | Number | Total accepted bids count | No |
| `status` | String | `'ACTIVE'`, `'EXTENDED'`, `'CLOSED'`, `'CANCELLED'` | Compound |
| `cancellationReason` | String | Reason if cancelled by seller | No |
| `createdAt` | Date | Timestamp | Yes |
| `closingAt` | Date | Target auction closing time | Compound with status |
| `version` | Number | Optimistic concurrency version lock | No |

### 1.3 `bids`
Immutable append-only ledger of accepted bids.

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `_id` | ObjectId | MongoDB Identifier | Primary |
| `listingId` | ObjectId | Ref to `Listing` | Compound with createdAt |
| `bidderId` | ObjectId | Ref to `User` | Compound with createdAt |
| `amountPaise` | Number | Exact bid amount in integer paise | Yes |
| `source` | String | `'MANUAL'` \| `'AUTO'` | No |
| `isWinning` | Boolean | True if bid held the lead at creation | No |
| `createdAt` | Date | Authoritative server timestamp | Compound |

### 1.4 `autobids`
Proxy bidding configurations (private maximum amounts).

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `_id` | ObjectId | MongoDB Identifier | Primary |
| `listingId` | ObjectId | Ref to `Listing` | Unique with bidderId |
| `bidderId` | ObjectId | Ref to `User` | Unique with listingId |
| `maxAmountPaise` | Number | Private maximum amount in integer paise | **NEVER EXPOSED** |
| `enabled` | Boolean | Whether proxy bidding is active | Yes |
| `createdAt` | Date | Creation timestamp | No |
| `updatedAt` | Date | Update timestamp | No |

### 1.5 `sales`
Represents the post-auction sale and handover lifecycle.

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `_id` | ObjectId | MongoDB Identifier | Primary |
| `listingId` | ObjectId | Ref to `Listing` | Unique |
| `sellerId` | ObjectId | Ref to `User` | Yes |
| `winnerId` | ObjectId | Ref to `User` | Yes |
| `finalPricePaise` | Number | Final winning bid amount in integer paise | No |
| `outcome` | String | `'UNSOLD'`, `'PENDING_SELLER_APPROVAL'`, `'REJECTED'`, `'RESERVED'`, `'SOLD'`, `'SELLER_CANCELLED'`, `'FAILED_PICKUP'` | Yes |
| `sellerDecisionAt` | Date | When seller approved/rejected | No |
| `reservationExpiresAt` | Date | Deadline for handover arrangement | No |
| `handoverConfirmedSellerAt`| Date | Seller handover confirmation | No |
| `handoverConfirmedBuyerAt` | Date | Buyer handover confirmation | No |
| `cancellationReason` | String | Reason if failed/cancelled | No |
| `createdAt` | Date | Timestamp | No |

### 1.6 `questions`
Listing-specific Q&A between buyers and sellers.

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `_id` | ObjectId | MongoDB Identifier | Primary |
| `listingId` | ObjectId | Ref to `Listing` | Yes |
| `authorId` | ObjectId | Ref to `User` asking question | Yes |
| `questionText` | String | Question content | No |
| `answerText` | String | Seller's response | No |
| `answeredAt` | Date | Timestamp of answer | No |
| `status` | String | `'OPEN'`, `'ANSWERED'`, `'REMOVED'` | Yes |
| `createdAt` | Date | Timestamp | Yes |

### 1.7 `notifications`
In-app persistent notifications with deduplication.

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `_id` | ObjectId | MongoDB Identifier | Primary |
| `recipientId` | ObjectId | Ref to `User` | Yes |
| `type` | String | `'OUTBID'`, `'CLOSING_SOON'`, `'AUCTION_WON'`, `'SALE_APPROVAL'`, `'HANDOVER_CONFIRMED'`, etc. | Yes |
| `listingId` | ObjectId | Optional Ref to `Listing` | Yes |
| `eventKey` | String | Deduplication key (e.g. `outbid_listing123_bid456`) | Unique with recipientId |
| `message` | String | Safe formatted message | No |
| `data` | Object | Metadata (prices, timestamps) | No |
| `isRead` | Boolean | Read state | Compound with recipientId |
| `createdAt` | Date | Timestamp | Yes |

### 1.8 `savedsearches`
Saved search criteria for notifying buyers when matching items are listed.

| Field | Type | Description | Index |
|-------|------|-------------|-------|
| `_id` | ObjectId | MongoDB Identifier | Primary |
| `userId` | ObjectId | Ref to `User` | Yes |
| `keyword` | String | Search query keyword | No |
| `category` | String | Optional category filter | Yes |
| `maxPricePaise` | Number | Optional price cap | No |
| `condition` | String | Optional condition filter | No |
| `notifyEnabled` | Boolean | Notification preference | Yes |
| `createdAt` | Date | Timestamp | No |
