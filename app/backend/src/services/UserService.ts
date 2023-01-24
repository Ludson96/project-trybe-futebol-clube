import * as bcrypt from 'bcryptjs';
import ILogin from '../interfaces/ILogin';
import UsersModel from '../database/models/UserModel';
import JWT from '../auth/jwtFunctions';

const jwt = new JWT();

export default class UsersService {
  constructor(public usersModel = UsersModel) {}

  public async login(user: ILogin) {
    const { email, password } = user;

    const newLogin = await this.usersModel.findOne({ where: { email } });

    if (!newLogin) {
      return undefined;
    }
    const passwordValid = await bcrypt.compare(password, newLogin.password);

    if (!passwordValid) {
      return undefined;
    }

    const token = jwt.createToken(user);

    return token;
  }
}
