import { NextFunction, Request, Response } from 'express';

export default class validEmailPwd {
  public static emailPwd(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    return next();
  }
}
