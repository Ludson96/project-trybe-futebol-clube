import MatcheModel from '../database/models/MatchesModel';
// import TeamsService from './TeamsService';
import TeamsModel from '../database/models/TeamsModel';
import { IPontos, IPartida, ITeam, ILeader } from '../interfaces/IMatche';

export default class LeaderboardService {
  constructor(
    public teamsModel = TeamsModel,
    public matcheModel = MatcheModel,
  ) { }

  public async getLeaderBoardLocal(local: 'home' | 'away') {
    const allTeams = await this.teamsModel.findAll();

    const allMatche = allTeams.map(async (team) => this.getTeamMatches(team, local));

    const board = Promise.all(allMatche);

    const result = LeaderboardService.rank(await board);

    const rank = Promise.all(result);

    return rank;
  }

  public async getLeaderboard() {
    const allTeams = await this.teamsModel.findAll();

    const matchesHome = allTeams.map(async (t) => this.getTeamMatches(t, 'home'));
    const matchesAway = allTeams.map(async (t) => this.getTeamMatches(t, 'away'));

    const allMatchesHome = Promise.all(matchesHome);
    const allMatchesAway = Promise.all(matchesAway);

    const points = LeaderboardService.orgaPontos(await allMatchesHome, await allMatchesAway);

    const rank = Promise.all(LeaderboardService.rank(points));

    return rank;
  }

  private static orgaPontos(matcheHome: ILeader[], matcheAway: ILeader[]) {
    return matcheHome.map((h) => {
      const away = matcheAway.filter(({ name }) => name === h.name);
      // if (!away) return home;

      const efficiency = LeaderboardService
        .eficiencia((h.totalPoints + away[0].totalPoints), (h.totalGames + away[0].totalGames));

      return LeaderboardService.sumPoints(h, away, efficiency);
    });
  }

  private static sumPoints(h: ILeader, away: ILeader[], efficiency: string) {
    return {
      name: h.name,
      totalPoints: h.totalPoints + away[0].totalPoints,
      totalGames: h.totalGames + away[0].totalGames,
      totalVictories: h.totalVictories + away[0].totalVictories,
      totalDraws: h.totalDraws + away[0].totalDraws,
      totalLosses: h.totalLosses + away[0].totalLosses,
      goalsFavor: h.goalsFavor + away[0].goalsFavor,
      goalsOwn: h.goalsOwn + away[0].goalsOwn,
      goalsBalance: h.goalsBalance + away[0].goalsBalance,
      efficiency,
    };
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

  private static calculatePoints({ homeTeamGoals, awayTeamGoals }: IPartida) {
    if (homeTeamGoals > awayTeamGoals) return { homeTeam: 3, awayTeam: 0, win: 'home' };
    if (homeTeamGoals < awayTeamGoals) return { homeTeam: 0, awayTeam: 3, win: 'away' };
    return { homeTeam: 1, awayTeam: 1, win: 'draw' };
  }

  private static pontosTotais(pontos: IPontos[], local: 'home' | 'away') {
    return pontos.reduce((a, b) => a + b[`${local}Team`], 0);
  }

  private static resultadoPartidas(pontos: IPontos[], local: 'home' | 'away') {
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

  private static statsGoals(matches: IPartida[], local: 'home' | 'away') {
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

  private static eficiencia(pontosTotais: number, totalGames: number) {
    return ((pontosTotais / (totalGames * 3)) * 100).toFixed(2);
  }

  private static rank(times: ILeader[]) {
    return times.sort((a, b) =>
      b.totalVictories - a.totalVictories
    || b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn);
  }
}
