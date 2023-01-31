import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
// import MatcheModel from '../database/models/MatchesModel';
// import TeamsModel from '../database/models/TeamsModel';
import { allTeams, allHome, allLeaderBoard, allAway } from './mocks/leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;
describe('Testando endpoint /leaderboard:', function() {
  describe('seja possível filtrar as classificações dos times da casa /home', function() {
    let chaiHttpResponse: Response;

    afterEach(sinon.restore)

    it('com sucesso', async () => {
      // sinon
      // .stub(TeamsModel, 'findAll')
      // .resolves(allTeams as TeamsModel[]);

      chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(allHome);
    });
  });

  describe('seja possível filtrar as classificações dos times da fora /away', function() {
    let chaiHttpResponse: Response;

    afterEach(sinon.restore)

    it('com sucesso', async () => {
      // sinon
      // .stub(TeamsModel, 'findAll')
      // .resolves(allTeams as TeamsModel[]);

      chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/away');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(allAway);
    });
  });

  describe('seja possível filtrar as classificações dos times geral /leaderboard', function() {
    let chaiHttpResponse: Response;

    afterEach(sinon.restore);

    it('com sucesso', async () => {
    // sinon
      // .stub(TeamsModel, 'findAll')
      // .resolves(allTeams as TeamsModel[]);

      chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(allLeaderBoard);
    });

  });
});
