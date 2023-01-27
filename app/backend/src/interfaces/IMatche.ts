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
