import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
import { allTeams, teamId } from './mocks/teams.mock';

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

    // https://www.coreycleary.me/faking-errors-to-test-error-scenarios-in-express-apis/
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
  });

  describe('Retorna um time especifico pelo id', function() {
    let chaiHttpResponse: Response;

    afterEach(sinon.restore);

    it('com sucesso', async () => {
      sinon
      .stub(TeamsModel, "findOne")
      .resolves(teamId as TeamsModel);

      chaiHttpResponse = await chai
      .request(app)
      .get('/teams/:id');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(teamId)
    });
    
    it('internal Error', async () => {
      sinon
        .stub(TeamsModel, "findByPk")
        .throws(Error('db query failed'))
  

      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/:id');

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body).to.deep.equal('db query failed');
    });


  });
});
