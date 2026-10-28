import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

describe('GET /api/v1/health', () => {
  it('should return health status successfully', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBeOneOf([200, 503]);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('status');
    expect(res.body.data).toHaveProperty('database');
    expect(res.body.data.database).toHaveProperty('replicaSet');
  });

  it('should return 404 for unknown routes in consistent JSON schema', async () => {
    const res = await request(app).get('/api/v1/non-existent-route-404');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toHaveProperty('code', 'NOT_FOUND');
  });
});
