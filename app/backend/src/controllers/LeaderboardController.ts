import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(public leaderboardService = new LeaderboardService()) {}

  public getAllMatchesHome = async (req: Request, res: Response) => {
    const { local } = req.params;
    const leaderHome = await this.leaderboardService.getLeaderBoardLocal(local as 'home' | 'away');
    return res.status(200).json(leaderHome);
  };

  public getAllMatchesAway = async (req: Request, res: Response) => {
    const { local } = req.params;
    const leaderAway = await this.leaderboardService.getLeaderBoardLocal(local as 'home' | 'away');
    return res.status(200).json(leaderAway);
  };

  public getLeaderboard = async (_req: Request, res: Response) => {
    const leaderBoard = await this.leaderboardService.getLeaderboard();
    return res.status(200).json(leaderBoard);
  };
}
