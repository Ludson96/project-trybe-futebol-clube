import MatchesModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamsModel';
import IMatche from '../interfaces/IMatche';

export default class MatchesService {
  constructor(public matchesModel = MatchesModel) { }

  public async getMatches(inProgress: string | undefined): Promise<object[]> {
    let where;
    if (inProgress) {
      if (inProgress === 'true') {
        where = { inProgress: true };
      } else {
        where = { inProgress: false };
      }
    }

    console.log('Eu sou where: ', where);

    const matches = await this.matchesModel.findAll({
      where,
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ] });

    return matches;
  }

  public async createMatche(matche: IMatche) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = matche;
    const newMatch = await
    this.matchesModel.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return newMatch;
  }
}
