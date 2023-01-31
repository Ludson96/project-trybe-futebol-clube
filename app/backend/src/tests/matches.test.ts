import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
import MatcheModel from '../database/models/MatchesModel';
import { allMatches, matcheInProgress, matcheNotInProgress, insertMatche, newMatche, token, insertTeamNonexistent, insertTeamRepetido } from './mocks/matche.mock';

chai.use(chaiHttp);

const { expect } = chai;
describe('Teste Matche', function() {
  describe('Retorna todos as partidas', function() {
    let chaiHttpResponse: Response;

    afterEach(sinon.restore)

    it('com sucesso', async () => {
      sinon
      .stub(MatcheModel, 'findAll')
      .resolves(allMatches as unknown as MatcheModel[]);

      chaiHttpResponse = await chai
      .request(app)
      .get('/matches');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(allMatches);
    });

    // https://www.chaijs.com/plugins/chai-http/
    it('Retorna todas as partidas em progresso', async () => {
      sinon
      .stub(MatcheModel, 'findAll')
      .resolves(matcheInProgress as unknown as MatcheModel[]);

      chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .query({inProgress: 'true'}) // '/matches?inProgress=true;'

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(matcheInProgress);
    });

    it('Retorna todas as partidas que não estão em progresso', async () => {
      sinon
      .stub(MatcheModel, 'findAll')
      .resolves(matcheNotInProgress as unknown as MatcheModel[]);

      chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .query({inProgress: 'false'}) // '/matches?inProgress=true;'

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(matcheNotInProgress);
    });
  });

  describe('Criar uma partida', function() {
    let chaiHttpResponse: Response;

    afterEach(sinon.restore);

    it('com sucesso', async () => {
      sinon
      .stub(MatcheModel, "create")
      .resolves(newMatche as MatcheModel);

      chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send(insertMatche)
      .set({Authorization: token});

      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.deep.equal(newMatche)
    });

    it('não é possível criar uma partida com um time inexistente', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send(insertTeamNonexistent)
      .set({Authorization: token});

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'There is no team with such id!' });
    });

    it('não é possível criar uma partida com um time repetido', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send(insertTeamRepetido)
      .set({Authorization: token});

      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
    });
  });

  describe('Altera a partida em progresso para concluída', function() {
    let chaiHttpResponse: Response;

    afterEach(sinon.restore);

    it('com sucesso', async () => {
      sinon
      .stub(MatcheModel, "update")
      .resolves();

      chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1/finish');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({ message: "Finished" });
    });
  });

  describe('Atualizar partida em andamento', function() {
    let chaiHttpResponse: Response;

    afterEach(sinon.restore);

    it('com sucesso', async () => {
      sinon
      .stub(MatcheModel, "update")
      .resolves();

      chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Partida atualizada com sucesso!!' });
    });
  });
});
