import * as jwt from 'jsonwebtoken';
import ILogin from '../interfaces/ILogin';

export default class JWT {
  private _secret: string;
  private _jwtConfig: object;

  constructor() {
    this._secret = process.env.JWT_SECRET || 'jwt_secret';
    this._jwtConfig = {
      algorithm: 'HS256',
      expiresIn: '7d',
    };
  }

  public createToken(payload: ILogin) {
    const token = jwt.sign({ data: payload }, this._secret, this._jwtConfig);
    return token;
  }

  public verifyToken(authorization: string) {
    try {
      const payload = jwt.verify(authorization, this._secret);
      return payload;
    } catch (e) {
      return { isError: true, e };
    }
  }
}
