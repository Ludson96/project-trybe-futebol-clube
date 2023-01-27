import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(public matchesService = new MatchesService()) {}

  public getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const matches = await this.matchesService.getMatches(inProgress as string | undefined);
    return res.status(200).json(matches);
  };

  public createMatche = async (req: Request, res: Response) => {
    const { status, message } = await this.matchesService.createMatche(req.body);
    if (status !== 201) {
      return res.status(status).json({ message });
    }
    return res.status(status).json(message);
  };

  public finish = async (req: Request, res: Response) => {
    await this.matchesService.finish(Number(req.params.id));
    return res.status(200).json({ message: 'Finished' });
  };

  public updateMatche = async (req: Request, res: Response) => {
    const { id } = req.params;
    const dataUpdated = req.body;
    await this.matchesService.updateMatche(dataUpdated, Number(id));
    return res.status(200).json({ message: 'Partida atualizada com sucesso!!' });
  };
}
