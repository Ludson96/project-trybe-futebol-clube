import MatchesModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamsModel';
import IMatche, { IMatcheUpdated } from '../interfaces/IMatche';

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

    const matches = await this.matchesModel.findAll({
      where,
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ] });

    return matches;
  }

  public async verifyTeam(homeTeamId: number, awayTeamId: number) {
    const homeTeam = await this.matchesModel.findByPk(homeTeamId);
    const awayTeam = await this.matchesModel.findByPk(awayTeamId);
    if (homeTeam && awayTeam) return false;
    return true;
  }

  public async createMatche(matche: IMatche) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = matche;
    if (homeTeamId === awayTeamId) {
      return { status: 422, message: 'It is not possible to create a match with two equal teams' };
    }
    const verify = await this.verifyTeam(homeTeamId, awayTeamId);
    if (verify) return { status: 404, message: 'There is no team with such id!' };
    const newMatch = await
    this.matchesModel.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return { status: 201, message: newMatch };
  }

  public async finish(id: number) {
    await this.matchesModel.update({ inProgress: false }, { where: { id } });
  }

  public updateMatche = async ({ homeTeamGoals, awayTeamGoals }: IMatcheUpdated, id: number) =>
    this.matchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
}
