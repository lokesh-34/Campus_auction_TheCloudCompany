# CampusBid API Specification

All API endpoints are prefixed with `/api/v1`. All monetary values sent and received are in integer paise.

## Authentication
Protected endpoints require an `Authorization: Bearer <firebase_id_token>` header. For local dev/test when `FIREBASE_AUTH_MOCK=true`, mock tokens formatted as `mock:<firebaseUid>:<email>` are accepted.

## Standard Response Format
```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "meta": { "timestamp": "2026-10-28T10:00:00Z" }
}
```

## Endpoints Summary

### System & Health
- `GET /api/v1/health` - System health, MongoDB status, replica set transaction status.

### Authentication & Users
- `POST /api/v1/users/sync` - Syncs authenticated user profile from Firebase to MongoDB.
- `GET /api/v1/users/me` - Retrieves current authenticated user's private profile and preferences.
- `PUT /api/v1/users/me` - Updates display name, notification preferences.
- `GET /api/v1/users/:id/public` - Public seller profile with rating, completed sales, and active listings.

### Listings
- `GET /api/v1/listings` - Search, filter by category/condition/price, sort by closing soon/price/newest, paginate.
- `GET /api/v1/listings/:id` - Full auction details with bid history and public status.
- `POST /api/v1/listings` - Create listing (seller only).
- `PATCH /api/v1/listings/:id` - Edit listing (eligible fields only, restricted after bidding starts).
- `POST /api/v1/listings/:id/cancel` - Cancel listing under allowed cancellation policy.

### Bidding & Proxy Bidding
- `POST /api/v1/listings/:id/bids` - Place a manual bid (transaction-safe).
- `POST /api/v1/listings/:id/autobid` - Configure or update private maximum auto-bid.
- `GET /api/v1/listings/:id/autobid` - Retrieve caller's private auto-bid configuration for this listing.
- `DELETE /api/v1/listings/:id/autobid` - Disable auto-bid configuration.

### Post-Auction Sales & Handovers
- `GET /api/v1/sales/:id` - Retrieve sale lifecycle state.
- `POST /api/v1/sales/:id/approve` - Seller approves winning bid.
- `POST /api/v1/sales/:id/reject` - Seller rejects winning bid.
- `POST /api/v1/sales/:id/confirm-handover` - Confirm handover (seller or buyer).
- `POST /api/v1/sales/:id/cancel` - Cancel reservation or report failed pickup.

### Q&A, Watchlists, Saved Searches & Notifications
- `GET /api/v1/listings/:id/questions` - Questions on a listing.
- `POST /api/v1/listings/:id/questions` - Ask a question.
- `POST /api/v1/questions/:id/answer` - Seller answers question.
- `GET /api/v1/watchlist` - Current user's saved listings.
- `POST /api/v1/watchlist/:listingId` - Add listing to watchlist.
- `DELETE /api/v1/watchlist/:listingId` - Remove listing from watchlist.
- `GET /api/v1/notifications` - Paginated user notifications.
- `PATCH /api/v1/notifications/:id/read` - Mark notification as read.
- `POST /api/v1/notifications/read-all` - Mark all notifications as read.
- `POST /api/v1/saved-searches` - Create a saved search query.

### Uploads & AI Assistant
- `POST /api/v1/uploads/sign` - Generate signed upload parameters or direct upload for images.
- `POST /api/v1/ai/query` - Natural language search and factual comparison.
- `POST /api/v1/ai/propose-action` - Generate structured bid proposal for explicit user confirmation.
