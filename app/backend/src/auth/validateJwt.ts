import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export default class validateJwt {
  public static validateToken(req: Request, res: Response, next: NextFunction) {
    const secret = 'jwt_secret';
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: 'Token inexistente' });

    try {
      const user = jwt.verify(token, secret);

      req.body.user = user;
      return next();
    } catch (e) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
