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
      try {
        const result = JSON.parse(res.text)
        expect(result.length).to.eql(1);
        expect(result[0].author.name).to.eql('Amy Kovacek');
      } catch (e) {
        throw new Error(e);
      }
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

  it('should edit the correct file', function() {

  });

  it('should only edit the changed queries', function() {

  });

  it('should disregard unrelated queries', function() {

  })

  it('should handle trying to edit a nonexsiting article', function() {

  });


});

describe('Article DELETE requests', function() {
  before((done) => {
    sequelize.sync().then(() => done());
  });
});
