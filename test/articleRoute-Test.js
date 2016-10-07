const { expect } = require('chai');
const server = require('../server/server');
const request = require('supertest')(server);
const qs = require('qs');
const { sequelize, Article } = require('../server/controllers/dbController');
const articleFixture = require('./fixtures/articleFixture');

describe('Article GET requests', function() {
  before((done) => {
    sequelize.sync().then(() => done());
  });
  
  it('should get all articles if no ID is specified', function(done) {
    request.get('/v1/articles')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(res => {
      try {
        expect(JSON.parse(res.text).length).to.eql(10);
      } catch (e) {
        throw new Error(e)
      }
    })
    .end(done)
  });

  it ('should get back an article based on ID parameter', function(done) {
    request.get('/v1/articles/1')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(res => {
      const result = JSON.parse(res.text)
      expect(result.length).to.eql(1);
      expect(result[0].author.name).to.eql('Amy Kovacek');
    })
    .end(done)
  })

  it ('should handle an ID not in the database', function(done) {
    request.get('/v1/articles/100')
    .expect(400)
    .end(done);
  })

});


describe('Article PUT requests', function() {
  before((done) => {
    sequelize.sync().then(() => done());
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

    request.put('/v1/articles/15')
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

    request.put('/v1/articles/15')
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

    request.put('/v1/articles/15')
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
    request.put('/v1/articles/105')
    .send(edit)
    .expect(400)
    .end(done);
  });


});

describe('Article DELETE requests', function() {
  before((done) => {
    sequelize.sync().then(() => done());
  });
});
