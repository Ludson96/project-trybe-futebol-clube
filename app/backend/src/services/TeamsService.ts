import TeamsModel from '../database/models/TeamsModel';

export default class TeamsService {
  constructor(public teamsModel = TeamsModel) { }

  public getAllTeams = async () => this.teamsModel.findAll();

  public getTeamById = async (id: number) => this.teamsModel.findByPk(id);
}
