import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(public leaderboardService = new LeaderboardService()) {}

  public getAllMatchesHome = async (_req: Request, res: Response) => {
    const leader = await this.leaderboardService.getLeader('home');
    return res.status(200).json(leader);
  };
}
