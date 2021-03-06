const { expect } = require('chai');
const server = require('../server/server');
const request = require('supertest')(server);
const qs = require('qs');
const { sequelize, Article } = require('../server/controllers/dbController');
const articleFixture = require('./fixtures/articleFixture');
if (process.env.SECRET_TOKEN === undefined) require('dotenv').config();
const validation = `bearer ${process.env.SECRET_TOKEN}`;

describe('OAuth bearer token', function() {
  it('should give a 401 with no token', function(done) {
    request.get('/api/v1')
    .expect(401)
    .end(done);
  });

  it ('should give a 401 with incorrect token', function(done) {
    request.get('/api/v1')
    .set('Authorization', 'abc123')
    .expect(401)
    .end(done);
  });

  it('should grant access with correct token', function(done) {
    request.get('/api/v1')
    .set('Authorization', validation)
    .expect(200)
    .end(done);
  })
})

describe('Article GET requests', function() {
  before(done => {
    sequelize.sync().then(() => done()).catch(err => console.error(err))
  });
  
  it('should get all articles if no ID is specified', function(done) {
    request.get('/api/v1/articles')
    .set('Authorization', validation)
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(res => {
      try {
        expect(JSON.parse(res.text).length).to.eql(10);
      } catch (e) {
        throw new Error(e)
      }
    })
    .end(done);
  });

  it ('should get back an article based on ID parameter', function(done) {
    request.get('/api/v1/articles/1')
    .set('Authorization', validation)
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(res => {
      const result = JSON.parse(res.text)
      expect(result.length).to.eql(1);
      expect(result[0].author.name).to.eql('Amy Kovacek');
    })
    .end(done);
  });

  it ('should handle an ID not in the database', function(done) {
    request.get('/api/v1/articles/100')
    .set('Authorization', validation)
    .expect(400)
    .end(done);
  });

  it('should handle getting articles by query', function(done) {
    const queryObj = {
      author_name: 'Amy Kovacek',
    };
    request.get(`/api/v1/articles?${qs.stringify(queryObj)}`)
    .set('Authorization', validation)
    .expect(200)
    .expect(res => {
      const result = JSON.parse(res.text);
      expect(result.length).to.eql(1);
      expect(result[0].author.name).to.eql('Amy Kovacek');
    })
    .end(done);
  });
});


describe('Article PUT requests', function() {
  before(done => {
    sequelize.sync().then(() => done()).catch(err => console.error(err))
  });

  beforeEach((done) => {
    Article.create(articleFixture)
    .then(() => done());
  });

  afterEach((done) => {
    Article.destroy({ where: { id: 15 } })
    .then(() => done());
  });

  it('should edit the correct file', function(done) {
    const edit = {
      title: 'This is a changed title',
      likes_count: 100,
      summary: 'Cats are good for your health.',
    };

    request.put('/api/v1/articles/15')
    .set('Authorization', validation)
    .send(edit)
    .expect(200)
    .expect(res => {
      const { title, likes_count, summary } = JSON.parse(res.text)[0];
      expect(title).to.eql(edit.title);
      expect(likes_count).to.eql(edit.likes_count)
      expect(summary).to.eql(edit.summary);
    })
    .end(done);
  });

  it('should only edit the changed properties', function(done) {
    const edit = {
      title: 'This is a changed title',
      likes_count: 100,
      summary: 'Cats are good for your health.',
    };

    request.put('/api/v1/articles/15')
    .set('Authorization', validation)
    .send(edit)
    .expect(200)
    .expect(res => {
      const { author: { name }, media_url } = JSON.parse(res.text)[0];
      expect(name).to.eql(articleFixture.author_name);
      expect(media_url).to.eql(articleFixture.media_url)
    })
    .end(done);
  });

  it('should disregard unrelated properties', function(done) {
    const edit = {
      title: 'This is a changed title',
      likes_count: 100,
      summary: 'Cats are good for your health.',
      uhoh: 'This should not be here.',
    };

    request.put('/api/v1/articles/15')
    .set('Authorization', validation)
    .send(edit)
    .expect(200)
    .expect(res => {
      const { title, uhoh } = JSON.parse(res.text)[0];
      expect(title).to.eql(edit.title);
      expect(uhoh).to.be.undefined;
    })
    .end(done);
  })

  it('should handle trying to edit a nonexsiting article', function(done) {
    const edit = {
      summary: 'What am I updating...?',
    };
    request.put('/api/v1/articles/105')
    .set('Authorization', validation)
    .send(edit)
    .expect(400)
    .end(done);
  });


});

describe('Article DELETE requests', function() {
  before(done => {
    sequelize.sync().then(() => done()).catch(err => console.error(err))
  });

  beforeEach((done) => {
    Article.create(articleFixture)
    .then(() => done());
  });

  afterEach((done) => {
    Article.destroy({ where: { id: 15 } })
    .then(() => done());
  });

  it('should delete the proper article', function(done) {
    request.delete('/api/v1/articles/15')
    .set('Authorization', validation)
    .expect(200)
    .end(done);
  });

  it ('should handle a wrong ID', function(done) {
    request.delete('/api/v1/articles/105')
    .set('Authorization', validation)
    .expect(400)
    .end(done);
  });
});
