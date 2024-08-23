const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const { suite } = require('mocha');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite('POST request to /api/issues/{project}', function() {
    test('Create an issue with every field: POST request to /api/issues/{project}', (done) => {
      chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'Text',
          created_by: 'Functional Test',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.result, 'successfully created');
          done();
        });
    });

    test('Create an issue with only required fields: POST request to /api/issues/{project}', (done) => {
      chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'Text',
          created_by: 'Functional Test'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.result, 'successfully created');
          done();
        });
    });

    test('Create an issue with missing required fields: POST request to /api/issues/{project}', (done) => {
      chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'Text'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'required field(s) missing');
          done();
        });
    });
  });

  suite('GET request to /api/issues/{project}', function() {
    test('View issues on a project: GET request to /api/issues/{project}', (done) => {
      chai.request(server)
        .get('/api/issues/test')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          done();
        });
    });

    test('View issues on a project with one filter: GET request to /api/issues/{project}', (done) => {
      chai.request(server)
        .get('/api/issues/test?open=true')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          done();
        });
    });

    test('View issues on a project with multiple filters: GET request to /api/issues/{project}', (done) => {
      chai.request(server)
        .get('/api/issues/test?open=true&created_by=Functional Test')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          done();
        });
    });
  });

  suite('PUT request to /api/issues/{project}', function() {
    test('Update one field on an issue: PUT request to /api/issues/{project}', (done) => {
      chai.request(server)
        .get('/api/issues/test')
        .end((err, res) => {
          const issue = res.body[0];
          chai.request(server)
            .put('/api/issues/test')
            .send({
              _id: issue._id,
              issue_title: 'Updated Title'
            })
            .end((err, res) => {
              assert.equal(res.status, 200);
              const outPut = res.body;
              const expected = { result: 'successfully updated', _id: issue._id };
              assert.deepEqual(outPut, expected);
              done();
            });
        });
    });

    test('Update multiple fields on an issue: PUT request to /api/issues/{project}', (done) => {
      chai.request(server)
        .get('/api/issues/test')
        .end((err, res) => {
          const issue = res.body[0];
          chai.request(server)
            .put('/api/issues/test')
            .send({
              _id: issue._id,
              issue_title: 'Updated Title',
              issue_text: 'Updated Text',
              created_by: 'Updated Functional Test'
            })
            .end((err, res) => {
              assert.equal(res.status, 200);
              const outPut = res.body;
              const expected = { result: 'successfully updated', _id: issue._id };
              assert.deepEqual(outPut, expected);
              done();
            });
        });
    });

    test('Update an issue with missing _id: PUT request to /api/issues/{project}', (done) => {
      chai.request(server)
        .put('/api/issues/test')
        .send({
          issue_title: 'Updated Title',
          issue_text: 'Updated Text',
          created_by: 'Updated Functional Test'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'missing _id' });
          done();
        });
    });

    test('Update an issue with no fields to update: PUT request to /api/issues/{project}', (done) => {
      chai.request(server)
        .get('/api/issues/test')
        .end((err, res) => {
          const issue = res.body[0];
          chai.request(server)
            .put('/api/issues/test')
            .send({
              _id: issue._id,
            })
            .end((err, res) => {
              assert.equal(res.status, 200);
              const outPut = res.body;
              const expected = { error: 'no update field(s) sent', _id: issue._id };
              assert.deepEqual(outPut, expected);
              done();
            });
        });
    });

    test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', (done) => {
      chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: '1723953689699',
          issue_title: 'Updated Title',
          issue_text: 'Updated Text',
          created_by: 'Updated Functional Test'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          const outPut = res.body;
          const expected = { error: 'could not update', _id: '1723953689699' };
          assert.deepEqual(outPut, expected);
          done();
        });
    });
  });

  suite('DELETE request to /api/issues/{project}', function() {
    test('Delete an issue: DELETE request to /api/issues/{project}', (done) => {
      chai.request(server)
        .get('/api/issues/test')
        .end((err, res) => {
          const issue = res.body[0];
          chai.request(server)
            .delete('/api/issues/test')
            .send({
              _id: issue._id
            })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body.result, 'successfully deleted');
              done();
            });
        });
    });

    test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', (done) => {
      chai.request(server)
        .delete('/api/issues/test')
        .send({
          _id: 'invalid_id'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'could not delete');
          done();
        });
    });

    test('Delete an issue with missing _id: DELETE request to /api/issues/{project}', (done) => {
      chai.request(server)
        .delete('/api/issues/test')
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'missing _id');
          done();
        });
    });
  });
});