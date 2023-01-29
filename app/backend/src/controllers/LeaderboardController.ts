import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(public leaderboardService = new LeaderboardService()) {}

  public getAllMatchesHome = async (_req: Request, res: Response) => {
    const leaderHome = await this.leaderboardService.getLeaderBoardLocal('home');
    return res.status(200).json(leaderHome);
  };

  public getAllMatchesAway = async (_req: Request, res: Response) => {
    const leaderAway = await this.leaderboardService.getLeaderBoardLocal('away');
    return res.status(200).json(leaderAway);
  };

  public getLeaderboard = async (_req: Request, res: Response) => {
    const leaderBoard = await this.leaderboardService.getLeaderboard();
    return res.status(200).json(leaderBoard);
  };
}
