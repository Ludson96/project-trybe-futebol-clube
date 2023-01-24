import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private _userService = new UserService()) { }

  public login = async (req: Request, res: Response) => {
    try {
      const dateUser = req.body;
      const token = await this._userService.login(dateUser);
      if (!token) {
        return res.status(401)
          .json({ message: 'Incorrect email or password' });
      }
      return res.status(200).json({ token });
    } catch (e) {
      return res.status(500).json((e as Error).message);
    }
  };
}
