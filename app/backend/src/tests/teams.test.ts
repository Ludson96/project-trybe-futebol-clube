import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
import { allTeams } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;
describe('Teste Teams', function() {
  describe('Retorna todos os times', function() {
    let chaiHttpResponse: Response;

    afterEach(sinon.restore)

    it('com sucesso', async () => {
      sinon
      .stub(TeamsModel, 'findAll')
      .resolves(allTeams as TeamsModel[]);

      chaiHttpResponse = await chai
      .request(app)
      .get('/teams');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(allTeams);
    }); 

    it('internal Error', async () => {
      sinon
        .stub(TeamsModel, 'findAll')
        .throws(Error('db query failed'))
  

      chaiHttpResponse = await chai
        .request(app)
        .get('/teams');

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body).to.deep.equal('db query failed');
    });

  //   it('Não é possível realizar login sem senha', async () => {
  //     sinon
  //     .stub(UserModel, "findOne")
  //     .resolves(validUser as UserModel);

  //     chaiHttpResponse = await chai
  //     .request(app)
  //     .post('/login')
  //     .send(withoutPwd);

  //     expect(chaiHttpResponse.status).to.be.equal(400);
  //     expect(chaiHttpResponse.body).to.deep.equal({ "message": "All fields must be filled" })
  //   });

  //   it('Não é possível realizar login com um email incorreto', async () => {
  //     sinon
  //     .stub(UserModel, "findOne")
  //     .resolves();

  //     chaiHttpResponse = await chai
  //     .request(app)
  //     .post('/login')
  //     .send(invalidEmail);

  //     expect(chaiHttpResponse.status).to.be.equal(401);
  //     expect(chaiHttpResponse.body).to.deep.equal({ "message": "Incorrect email or password" })
  //   }); 

  //   it('Não é possível realizar login com a senha incorreto', async () => {
  //     sinon
  //     .stub(UserModel, "findOne")
  //     .resolves(invalidPwd as UserModel);

  //     chaiHttpResponse = await chai
  //     .request(app)
  //     .post('/login')
  //     .send(invalidPwd);

  //     expect(chaiHttpResponse.status).to.be.equal(401);
  //     expect(chaiHttpResponse.body).to.deep.equal({ "message": "Incorrect email or password" })
  //   });
  // });

  // describe('Teste para o getRole', function() {
  //   let chaiHttpResponse: Response;

  //   afterEach(sinon.restore);

  //   it('Retorna a role corretamente', async () => {
  //     sinon
  //     .stub(UserModel, "findOne")
  //     .resolves(validUser as UserModel);

  //     chaiHttpResponse = await chai
  //     .request(app)
  //     .get('/login/validate')
  //     .set({Authorization: token});

  //     expect(chaiHttpResponse.status).to.be.equal(200);
  //     expect(chaiHttpResponse.body).to.deep.equal({ "role": "user" })
  //   });
    
  //   it('Email incorreto', async () => {
  //     sinon
  //     .stub(UserModel, "findOne")
  //     .resolves();

  //     chaiHttpResponse = await chai
  //     .request(app)
  //     .get('/login/validate')
  //     .set({Authorization: token});

  //     expect(chaiHttpResponse.status).to.be.equal(401);
  //     expect(chaiHttpResponse.body).to.deep.equal({ message: 'email incorreto' })
  //   });

  //   it('Token invalido', async () => {
  //     sinon
  //     .stub(UserModel, "findOne")
  //     .resolves();

  //     chaiHttpResponse = await chai
  //     .request(app)
  //     .get('/login/validate')
  //     .set({Authorization: 'token'});

  //     expect(chaiHttpResponse.status).to.be.equal(401);
  //     expect(chaiHttpResponse.body).to.deep.equal({ message: 'Invalid token' })
  //   });

  //   it('Token inexistente', async () => {
  //     sinon
  //     .stub(UserModel, "findOne")
  //     .resolves();

  //     chaiHttpResponse = await chai
  //     .request(app)
  //     .get('/login/validate')

  //     expect(chaiHttpResponse.status).to.be.equal(401);
  //     expect(chaiHttpResponse.body).to.deep.equal({ message: 'token not found' })
  //   });
  });
});
