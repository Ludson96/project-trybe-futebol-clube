import * as bcrypt from 'bcryptjs';
// import { StatusCodes } from 'http-status-codes';
import ILogin from '../interfaces/ILogin';
import UsersModel from '../database/models/UserModel';
import HttpError from '../utils/statusCodes';
import JWT from '../auth/jwtFunctions';

const jwt = new JWT();

export default class UsersService {
  constructor(public usersModel = UsersModel) {}

  public async login(user: ILogin) {
    const { email, password } = user;

    const newLogin = await this.usersModel.findOne({ where: { email } });

    if (!newLogin) {
      throw new HttpError(401, 'Email ou senha incorretas');
    }
    const passwordValid = await bcrypt.compare(password, newLogin.password);

    if (!passwordValid) {
      throw new HttpError(401, 'Email ou senha incorretas');
    }

    const token = jwt.createToken(user);

    return token;
  }
}
