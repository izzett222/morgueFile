import chai from 'chai';
import chaiHttp from 'chai-http';
import { config } from 'dotenv';
import { createToken } from '../utils/handleJWT';
import app from '../server';

config();
chai.use(chaiHttp);
const { expect } = chai;

let token;
const wrongToken = createToken(20000);
describe('TEST VERIFY', () => {
  before(async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/user/signup')
      .send({
        firstName: 'user1',
        lastName: 'firstone',
        email: 'user4@example.com',
        password: 'Aime12fee',
      });
    token = res.body.data.token;
  });
  it('should not allow a user who hasn\'t given a token to verify their account', (done) => {
    chai
      .request(app)
      .patch('/api/v1/user/verify')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('No token provided');
        done();
      });
  });
  it('should not allow a user who has given an invalid token to verify their account', (done) => {
    chai
      .request(app)
      .patch('/api/v1/user/verify')
      .set('token', 'this is a token')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('token must be provided and valid');
        done();
      });
  });
  it('should not allow a user who has given an valid token but hasn\'t signup to verify their account ', (done) => {
    chai
      .request(app)
      .patch('/api/v1/user/verify')
      .set('token', wrongToken)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('you are not authorised for this operation');
        done();
      });
  });
  it('should allow a user to verify account', (done) => {
    chai
      .request(app)
      .patch('/api/v1/user/verify')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Account verified successfully');
        done();
      });
  });
});
