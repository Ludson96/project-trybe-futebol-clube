import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(public matchesService = new MatchesService()) {}

  public getMatches = async (_req: Request, res: Response) => {
    const matches = await this.matchesService.getMatches();
    return res.status(200).json(matches);
  };
}
