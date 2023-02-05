import { Container } from 'inversify';
import DependencyTypes from '../Common/DependencyTypes';
import { AuthController } from '../Controllers/AuthController';
import { UserController } from '../Controllers/UserController';
import { AuthService } from '../Services/AuthService';
import { IAuthService } from '../Services/interface/IAuthService';
import { IMysqlService } from '../Services/interface/IMysqlService';
import { IUserService } from '../Services/interface/IUserService';
import MysqlService from '../Services/MysqlService';
import { UserService } from '../Services/UserService';

const container = new Container();

// Controllers
container.bind<UserController>(DependencyTypes.UserController).to(UserController);
container.bind<AuthController>(DependencyTypes.AuthController).to(AuthController);

// Services
container.bind<IAuthService>(DependencyTypes.IAuthService).to(AuthService);
container.bind<IMysqlService>(DependencyTypes.IMysqlService).to(MysqlService);
container.bind<IUserService>(DependencyTypes.IUserService).to(UserService);

export default container;