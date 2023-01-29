export default interface IMatche {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IMatcheUpdated {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IAllMatchesHome{
  id: number,
  homeTeamId: number
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam: {
    teamName: string
  },
  awayTeam: {
    teamName: string
  }
}

export interface ITeam {
  id?: number;
  teamName: string;
}

export interface IPontos {
  homeTeam: number;
  awayTeam: number;
  win: string;
}

export interface IPartida {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress?: boolean;
}

export interface ILeader {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}
