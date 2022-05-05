import app from '../src/app.js';
import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

// const app = startServer();
describe('Post Route', () => {
  describe('GET /v1/post/get-post-by-post-id', async () => {
    it('it should return post with correct _id and status code equal to 200', async () => {
      const result = await chai.request(app).get('/v1/post/get-post-by-post-id').send({
        postId: '626a8e052ea5b5db2c3b2a8b',
      });
      const data = result.body.data;
      assert.equal(data._id, '626a8e052ea5b5db2c3b2a8b');
      assert.equal(result.status, 200);
    });
  });
  describe('GET /v1/post/get-news-post', async () => {
    it('it should return news post only and status code equal to 200', async () => {
      const result = await chai.request(app).get('/v1/post/get-news-post');

      const data = result.body.data;
      for (let i = 0; i < data.length; i++) {
        assert.equal(data[i].postType, 'news');
      }
      // assert.equal(data._id, '626a8e052ea5b5db2c3b2a8b');
    });
  });
});
