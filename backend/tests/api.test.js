const request = require('supertest');
const jwt = require('jsonwebtoken');

jest.mock('../src/models/User', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
}));
jest.mock('../src/models/Medicine', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  aggregate: jest.fn(),
}));

process.env.JWT_SECRET = 'test-secret';
const app = require('../app');
const User = require('../src/models/User');
const Medicine = require('../src/models/Medicine');

const user = { _id: '507f1f77bcf86cd799439011', firstName: 'Awa', lastName: 'Ndiaye', gender: 'female', birthDate: new Date('1995-01-01'), email: 'awa@example.com', createdAt: new Date() };
const medicine = { _id: '507f1f77bcf86cd799439012', name: 'Paracétamol', price: 1000, quantity: 5 };
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
const authenticated = () => ({ Authorization: `Bearer ${token}` });

beforeEach(() => {
  jest.clearAllMocks();
  User.findById.mockResolvedValue(user);
});

describe('authentification', () => {
  it('inscrit un utilisateur sans exposer son mot de passe', async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue(user);
    const response = await request(app).post('/api/v1/auth/register').send({ ...user, password: 'motdepasse8' });
    expect(response.status).toBe(201);
    expect(response.body.user.password).toBeUndefined();
  });

  it('refuse un e-mail déjà utilisé', async () => {
    User.findOne.mockResolvedValue(user);
    const response = await request(app).post('/api/v1/auth/register').send({ firstName: 'Awa', lastName: 'Ndiaye', gender: 'female', birthDate: '1995-01-01', email: user.email, password: 'motdepasse8' });
    expect(response.status).toBe(409);
  });

  it('connecte un utilisateur valide', async () => {
    User.findOne.mockReturnValue({ select: jest.fn().mockResolvedValue({ ...user, password: 'hash', comparePassword: jest.fn().mockResolvedValue(true) }) });
    const response = await request(app).post('/api/v1/auth/login').send({ email: user.email, password: 'motdepasse8' });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('refuse un mot de passe incorrect', async () => {
    User.findOne.mockReturnValue({ select: jest.fn().mockResolvedValue({ ...user, password: 'hash', comparePassword: jest.fn().mockResolvedValue(false) }) });
    const response = await request(app).post('/api/v1/auth/login').send({ email: user.email, password: 'incorrect' });
    expect(response.status).toBe(401);
  });
});

describe('médicaments', () => {
  it('crée et récupère des médicaments', async () => {
    Medicine.create.mockResolvedValue(medicine);
    Medicine.find.mockReturnValue({ sort: jest.fn().mockResolvedValue([medicine]) });
    const createResponse = await request(app).post('/api/v1/medicines').set(authenticated()).send(medicine);
    const listResponse = await request(app).get('/api/v1/medicines').set(authenticated());
    expect(createResponse.status).toBe(201);
    expect(listResponse.body.count).toBe(1);
  });

  it('lit, modifie et supprime un médicament', async () => {
    Medicine.findById.mockResolvedValue(medicine);
    Medicine.findByIdAndUpdate.mockResolvedValue({ ...medicine, quantity: 8 });
    Medicine.findByIdAndDelete.mockResolvedValue(medicine);
    expect((await request(app).get(`/api/v1/medicines/${medicine._id}`).set(authenticated())).status).toBe(200);
    expect((await request(app).put(`/api/v1/medicines/${medicine._id}`).set(authenticated()).send({ quantity: 8 })).status).toBe(200);
    expect((await request(app).delete(`/api/v1/medicines/${medicine._id}`).set(authenticated())).status).toBe(200);
  });

  it('rejette un identifiant invalide', async () => {
    expect((await request(app).get('/api/v1/medicines/invalide').set(authenticated())).status).toBe(400);
  });
});

it('retourne les statistiques du tableau de bord', async () => {
  Medicine.aggregate.mockResolvedValue([{ totalMedicines: 3, totalUnitsAvailable: 15, outOfStock: 1, lowStock: 1 }]);
  const response = await request(app).get('/api/v1/dashboard/stats').set(authenticated());
  expect(response.status).toBe(200);
  expect(response.body.data).toMatchObject({ totalMedicines: 3, outOfStock: 1, lowStockThreshold: 10 });
});
