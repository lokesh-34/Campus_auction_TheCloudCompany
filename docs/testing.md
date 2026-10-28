# CampusBid Testing Strategy & Setup

## 1. Testing Layers

1. **Unit & Logic Tests**:
   - Monetary conversion (rupees <-> integer paise).
   - Input validation via Zod schemas.
   - Proxy bidding calculations and tie-breaking algorithms.
   - Anti-sniping window calculations.
2. **Integration API Tests (Supertest + Vitest)**:
   - Endpoint status codes, response schemas, and error responses.
   - Firebase Auth token verification middleware.
   - CRUD listing operations and ownership checks.
   - Q&A, Watchlists, Notifications deduplication.
3. **Concurrency & Transaction Tests**:
   - Tested using `mongodb-memory-server` in replica set mode (`MongoMemoryReplSet`).
   - Verifies that parallel simultaneous bids do not create write conflicts, duplicate leaders, or corrupt prices.
   - Verifies that rollback occurs cleanly if an error is thrown.

## 2. Replica Set Requirements for Local Development and Tests

MongoDB multi-document transactions strictly require a replica set topology.

### Local MongoDB Single-Node Replica Set:
```bash
# 1. Start mongod with replica set name rs0
mongod --dbpath ./data/db --replSet rs0 --port 27017

# 2. In mongosh, initialize the replica set once:
rs.initiate()
```

### Automated In-Memory Replica Set for Vitest:
Vitest test suites instantiate `MongoMemoryReplSet` from `mongodb-memory-server` so that transaction tests execute in CI and local machines without requiring an external MongoDB server installation.

### Safe Failure Guarantee:
If MongoDB is connected as a standalone instance without replica set support, `db.ts` detects this on startup and transaction handlers cleanly throw a `503 Service Unavailable` error explaining that replica-set support is required, preventing non-atomic data corruption.
