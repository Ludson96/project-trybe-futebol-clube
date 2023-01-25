import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private _userService = new UserService()) { }

  public login = async (req: Request, res: Response): Promise<object> => {
    try {
      const dateUser = req.body;
      const token = await this._userService.login(dateUser);
      if (!token) {
        return res.status(401)
          .json({ message: 'Incorrect email or password' });
      }
      return res.status(200).json({ token });
    } catch (e) {
      return res.status(500).json({
        message: 'Não foi possível logar',
        erro: (e as Error).message,
      });
    }
  };

  public getRole = async (req: Request, res: Response) => {
    try {
      const { email } = req.body.user.data;
      console.log('Eu sou email: ', email);
      const { type } = await this._userService.getRole(email);
      return res.status(200).json({ role: type });
    } catch (e) {
      return res.status(500).json((e as Error).message);
    }
  };
}
