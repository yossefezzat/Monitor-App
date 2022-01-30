const app = require('../src/index')
const userModel = require('../src/models/user')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.should();
chai.use(chaiHttp);


describe('Authentication', () => {
  const DUMMY_ENTRY = {
    name: 'youssef ezzat',
    email: 'ye.fci2020@gmail',
    password: '12345678',
  };

  // Clearing all users from the testing DB
  before((done) => {
    userModel.deleteMany(() => {
      done();
    });
  });

  describe('/POST user', () => {
    it('The request should be refused because the email is not valid', (done) => {
      chai.request(app)
        .post('/signUp')
        .send(DUMMY_ENTRY)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('msg').eql('Credentials are not valid');
          done();
        });
    });
    it(`A new user with name ${DUMMY_ENTRY.name} should be add to the DB`, (done) => {
      DUMMY_ENTRY.email = 'ye.fci2020@gmail.com';
      chai.request(app)
        .post('/signUp')
        .send(DUMMY_ENTRY)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('msg').eql('Check your email to verify your account...');
          done();
        });
    });
    it(`The request should be refused because the email is used before`, (done) => {
      DUMMY_ENTRY.email = 'ye.fci2020@gmail.com';
      chai.request(app)
        .post('/signUp')
        .send(DUMMY_ENTRY)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('msg').eql('Email is already existed');
          done();
        });
    });
    it(`The request should be refused because the email not verified`, (done) => {
      const loginData = {
        email: DUMMY_ENTRY.email,
        password: DUMMY_ENTRY.password
      }
      chai.request(app)
        .post('/login')
        .send(loginData)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('msg').eql('you are not verified to login, please check your email to verify your account');
          done();
        });
    });

    it(`The request should be refused because the email not valid`, (done) => {
      const loginData = {
        email: 'ye.fci@gmail',
        password: DUMMY_ENTRY.password
      }
      chai.request(app)
        .post('/login')
        .send(loginData)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('msg').eql('Credentials are not valid');
          done();
        });
    });
    it(`The request not be verified`, (done) => {
      chai.request(app)
        .get('/verify-email')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('msg').eql('user not Found');
          done();
        });
    });
  });
});
