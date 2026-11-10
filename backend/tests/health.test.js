const request = require('supertest');
const app = require('../app');

describe('GET /api/health', () => {
  it('retourne l’état opérationnel de l’API', async () => {
    const response = await request(app).get('/api/health');

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      status: 'degraded',
      message: 'Fadj-Ma API is running',
      database: 'disconnected',
    });
  });
});
