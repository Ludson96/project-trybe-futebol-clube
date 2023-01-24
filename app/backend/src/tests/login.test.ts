import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
import UserModel from '../database/models/UserModel';
import { token } from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', function() {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves({
        token
      } as UserModel);
  });

  after(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('...', async () => {
    chaiHttpResponse = await chai
       .request(app)
       ...

    expect(...)
  });

  it('Seu sub-teste', function() {
    expect(false).to.be.eq(true);
  });
});
