const server = require('./api/server.js');
const request = require('supertest');

describe('SERVER', () => {
  it('should run tests', () => {
    expect(true).toBeTruthy();
  });

  describe.skip('GET /games', () => {
    it('should return statusCode = 404 when games list is empty', async () => {
      const response = await request(server).get('/games');

      expect(response.status).toBe(404);
    });

    it('should return the games array even if it is empty', async () => {
      const response = await request(server).get('/games');

      expect(response.body).toEqual([]);
    });

    it('should return JSON', async () => {
      const response = await request(server).get('/games');

      expect(response.type).toBe('application/json');
    });

    it('should return statusCode = 200 when games list is not empty', async () => {
      const response = await request(server).get('/games');

      expect(response.status).toBe(200);
    });
  });

  describe.skip('POST /games', () => {
    it('should return JSON', async () => {
      const response = await request(server).post('/games');

      expect(response.type).toBe('application/json');
    });

    it('should return a statusCode = 500 and an error message when an internal server error occurs or a duplicate is made', async () => {
      const response = await request(server).post('/games');
      

      expect(response.status).toBe(500);
      expect(response.body).toEqual({error: `There was an error adding the game to the database, please try again, and give a title and genre`});
    });

    it('should return a statusCode = 201 when creation is successful', async () => {
      const title = 'Dota 2';
      const genre = 'MOBA';

      const response = await request(server)
        .post('/games')
        .send({ title, genre });

      expect(response.status).toEqual(201);
    });

    it('should return a statusCode = 422 when the type of data is not a string', async () => {
      const title = 10101001101010;
      const genre = 'Unknown';

      const response = await request(server)
        .post('/games')
        .send({ title, genre });

        expect(response.status).toEqual(422);
    });

    it('should return a statusCode = 422 when the genre and title are empty', async () => {
      const title = '';
      const genre = '';

      const response = await request(server)
        .post('/games')
        .send({ title, genre });

      expect(response.status).toEqual(422);
    });

  });

  describe.skip('DELETE /games/:id', () => {
    it('should respond with statusCode = 404 when game cannot be found to delete', async () => {
      const id = 15;
      const response = await request(server).delete(`/games/${id}`);

      expect(response.status).toEqual(404);
    });

    it('should return statusCode = 200 when game is deleted sucessfully', async () => {
      const id = 14;
      const response = await request(server).delete(`/delete/${id}`);

      expect(response.status).toEqual(200);
    });
  });

  describe('GET /games/:id', () => {
    it('should return statusCode = 200 when valid game is passed in', async () => {
      const id = 1;
      const response = await request(server).get(`/games/${id}`);

      expect(response.status).toEqual(200);
    });

    it('should return statusCode = 404 when invalid game is passed in', async () => {
      const id = 9999;
      const response = await request(server).get(`/games/${id}`);

      expect(response.status).toEqual(404);
    });
  });
});