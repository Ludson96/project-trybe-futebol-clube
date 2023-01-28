import MatcheModel from '../database/models/MatchesModel';
import TeamsService from './TeamsService';
import { IPoints, IMatch, ITeam, ILeaderboard } from '../interfaces/IMatche';

export default class LeaderboardService {
  constructor(
    public teamsService = new TeamsService(),
    public matcheModel = MatcheModel,
  ) { }

  public async getLeader(local: 'home' | 'away') {
    const allTeams = await this.teamsService.getAllTeams();

    const allMatche = allTeams.map(async (team) => this.getTeamMatches(team, local));

    const board = Promise.all(allMatche);

    const result = LeaderboardService.rank(await board);

    const rank = Promise.all(result);

    return rank;
  }

  private async getTeamMatches(team: ITeam, local: 'home' | 'away') {
    const matches = await this.matcheModel.findAll({
      where: { [`${local}TeamId`]: team.id, inProgress: false },
    });

    const pontos = matches.map(LeaderboardService.calculatePoints);
    const pontosTotais = LeaderboardService.pontosTotais(pontos, local);
    const totalGames = matches.length;
    const resultadoPartidas = LeaderboardService.resultadoPartidas(pontos, local);
    const goals = LeaderboardService.statsGoals(matches, local);
    const eficiencia = LeaderboardService.eficiencia(pontosTotais, totalGames);

    return {
      name: team.teamName,
      totalPoints: pontosTotais,
      totalGames,
      ...resultadoPartidas,
      ...goals,
      efficiency: eficiencia,
    };
  }

  private static calculatePoints({ homeTeamGoals, awayTeamGoals }: IMatch) {
    if (homeTeamGoals > awayTeamGoals) return { homeTeam: 3, awayTeam: 0, win: 'home' };
    if (homeTeamGoals < awayTeamGoals) return { homeTeam: 0, awayTeam: 3, win: 'away' };
    return { homeTeam: 1, awayTeam: 1, win: 'draw' };
  }

  private static pontosTotais(pontos: IPoints[], local: 'home' | 'away'): number {
    return pontos.reduce((a, b) => a + b[`${local}Team`], 0);
  }

  private static resultadoPartidas(pontos: IPoints[], local: 'home' | 'away') {
    const oponente = local === 'home' ? 'away' : 'home';
    const totalVictories = pontos.filter(({ win }) => win === local);
    const totalDraws = pontos.filter(({ win }) => win === 'draw');
    const totalLosses = pontos.filter(({ win }) => win === oponente);

    return {
      totalVictories: totalVictories.length,
      totalDraws: totalDraws.length,
      totalLosses: totalLosses.length,
    };
  }

  private static statsGoals(matches: IMatch[], local: 'home' | 'away') {
    const oponente = local === 'home' ? 'away' : 'home';

    const goalsFavor = matches
      .map((match) => match[`${local}TeamGoals`])
      .reduce((a, b) => a + b);

    const goalsOwn = matches
      .map((match) => match[`${oponente}TeamGoals`])
      .reduce((a, b) => a + b);

    const goalsBalance = goalsFavor - goalsOwn;

    return { goalsFavor, goalsOwn, goalsBalance };
  }

  private static eficiencia(pontosTotais: number, totalGames: number): string {
    return ((pontosTotais / (totalGames * 3)) * 100).toFixed(2);
  }

  private static rank(times: ILeaderboard[]) {
    return times.sort((a, b) =>
      b.totalVictories - a.totalVictories
    || b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn);
  }
}
