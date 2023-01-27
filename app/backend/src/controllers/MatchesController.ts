import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(public matchesService = new MatchesService()) {}

  public getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    console.log('Eu sou inProgress: ', inProgress);

    const matches = await this.matchesService.getMatches(inProgress as string | undefined);
    return res.status(200).json(matches);
  };

  public createMatche = async (req: Request, res: Response) => {
    const newMatche = await this.matchesService.createMatche(req.body);
    return res.status(201).json(newMatche);
  };

  public finish = async (req: Request, res: Response) => {
    await this.matchesService.finish(Number(req.params.id));
    return res.status(200).json({ message: 'Finished' });
  };
}
