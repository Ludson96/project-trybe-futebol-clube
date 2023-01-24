import { Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private _userService = new UserService()) { }

  public login = async (req: Request, res: Response) => {
    try {
      const dateUser = req.body;
      const token = await this._userService.login(dateUser);
      if (!token) {
        return res.status(401)
          .json({ message: 'email ou password invalido' });
      }
      return res.status(200).json({ token });
    } catch (e) {
      const erro = (e as Error).message;
      return res.status(500).json({
        message: 'Erro ao realizar login',
        erro,
      });
    }
  };
}
