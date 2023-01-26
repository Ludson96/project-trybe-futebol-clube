import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(private _teamsService = new TeamsService()) {}

  public getAllTeams = async (_req: Request, res: Response) => {
    try {
      const allTeams = await this._teamsService.getAllTeams();
      return res.status(200).json(allTeams);
    } catch (e) {
      return res.status(500).json((e as Error).message);
    }
  };
}
