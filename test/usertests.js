import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();


describe('users', () => {
  describe('POST /', () => {
    it('should post a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'abiola', lastName: 'ojo', email: 'ojo@gmail.com', password: 'oladimeji1',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('firstName');
          res.body.data.should.have.property('lastName');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('password');
          done();
        });
    });
    it('should not create a user without a firstName ', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: '', lastName: 'ojo', email: 'ojo@gmail.com', password: '123', address: 'no 2,lagos',
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
    it('should not create a user without a lastName ', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'abiola', lastName: '', email: 'ojo@gmail.com', password: '123', address: 'no 2,lagos',
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('message');

          done();
        });
    });
    it('should not create a user without an email ', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'abiola', lastName: 'ojo', email: '', password: '123', address: 'no 2,lagos',
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });

    it('should not create a user without a password ', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'abiola', lastName: '', email: 'ojo@gmail.com', password: '', address: 'no 2,lagos',
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
    let token1;
  it('should login a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'ojoabiola@gmail.com', password: 'oladimeji1',
      })
      .end((err, res) => {
        token1 = res.body.data.token;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
    let token;
    it('should signin a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'doyin@gmail.com', password: 'adedoyin1',
        })
        .end((err, res) => {
          token = res.body.data.token
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          done();
        });
    });
    it('should not signin a user with incorrect email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'd@gmail.com', password: 'adedoyin1',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should not signin a user without email ', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: '', password: 'adedoyin1',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should not signin a user without password ', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'doyin@gmail.com', password: '',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should create account ', (done) => {
      chai.request(app)
        .post('/api/v1/accounts')
        .set({
          'x-access-token': token,
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          done();
        });
    });
    it('should not create account without token ', (done) => {
      chai.request(app)
        .post('/api/v1/accounts')
        .set({})
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should not create account with wrong token ', (done) => {
      chai.request(app)
        .post('/api/v1/accounts')
        .set({
          'x-access-token': 'gffc123'
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should activate or deactivate account ', (done) => {
      chai.request(app)
        .patch('/api/v1/account/1202')
        .send({
          status: 'active'
        })
        .set({
          'x-access-token': token1
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          done();
        });
    });
    it('should not activate or deactivate account with incorect account number ', (done) => {
      chai.request(app)
        .patch('/api/v1/account/0202')
        .send({
          status: 'active'
        })
        .set({
          'x-access-token': token1
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should not activate or deactivate account with incorect status ', (done) => {
      chai.request(app)
        .patch('/api/v1/account/1202')
        .send({
          status: 'actived'
        })
        .set({
          'x-access-token': token1
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should not activate or deactivate account with active/dormant status ', (done) => {
      chai.request(app)
        .patch('/api/v1/account/1201')
        .send({
          status: 'active'
        })
        .set({
          'x-access-token': token1
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
  });
});