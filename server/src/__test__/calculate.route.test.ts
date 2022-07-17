import request from 'supertest';
import app from '../app';

describe('Test CalculateController', () => {
  it('Request /calculate without data should return Invalid request!', async () => {
    const result = await request(app).post('/calculate').send();

    expect(result.status).toBe(400);

    expect(result.text).toBe('Invalid request');
  });

  it('Request return Invalid request!', async () => {
    const result = await request(app).post('/calculate').send([]);

    expect(result.status).toBe(400);

    expect(result.text).toBe('Invalid request');
  });

  it('should return correct result for somme data', async () => {
    const result = await request(app)
      .post('/calculate')
      .send([
        { type: '*', value: 3 },
        { type: '+', value: 4 },
        { type: '+', value: 5 },
        { type: '/', value: 2 },
        { type: '+', value: 3 },
        { type: '+', value: 4 },
        { type: '-', value: 5 }
      ]);

    expect(result.status).toBe(400);

    expect(result.text).toBe('Invalid request');
  });

  it('should return correct result for somme data 11.5', async () => {
    const { body, status } = await request(app)
      .post('/calculate')
      .send([
        { type: '+', value: 3 },
        { type: '+', value: 4 },
        { type: '+', value: 5 },
        { type: '/', value: 2 },
        { type: '+', value: 3 },
        { type: '+', value: 4 },
        { type: '-', value: 5 }
      ]);

    expect(status).toBe(200);

    expect(body.result).toBe(11.5);
  });

  it('should return correct result for somme data 13.8', async () => {
    const { body, status } = await request(app)
      .post('/calculate')
      .send([
        { type: '+', value: 1 },
        { type: '/', value: 2 },
        { type: '*', value: 3 },
        { type: '+', value: 4 },
        { type: '+', value: 5 },
        { type: '/', value: 2 },
        { type: '*', value: 3 },
        { type: '+', value: 4 },
        { type: '/', value: 5 }
      ]);

    expect(status).toBe(200);

    expect(body.result).toBe(13.8);
  });

  it('should return correct result for somme data 0.8', async () => {
    const { body, status } = await request(app)
      .post('/calculate')
      .send([
        { type: '+', value: 1 },
        { type: '-', value: 0.2 }
      ]);

    expect(status).toBe(200);

    expect(body.result).toBe(0.8);
  });
});
