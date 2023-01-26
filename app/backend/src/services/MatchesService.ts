import MatchesModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamsModel';

export default class MatchesService {
  constructor(public matchesModel = MatchesModel) { }

  public async getMatches() {
    const matches = await this.matchesModel.findAll({
      include: [
        { model: TeamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: TeamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ] });

    return matches;
  }
}
