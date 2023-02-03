import { Container } from 'inversify';
import DependencyTypes from '../Common/DependencyTypes';
import { UserController } from '../Controllers/UserController';
import { IMysqlService } from '../Services/interface/IMysqlService';
import { IUserService } from '../Services/interface/IUserService';
import MysqlService from '../Services/MysqlService';
import { UserService } from '../Services/UserService';

const container = new Container();

// Controllers
container.bind<UserController>(DependencyTypes.UserController).to(UserController);

// Services
container.bind<IMysqlService>(DependencyTypes.IMysqlService).to(MysqlService);
container.bind<IUserService>(DependencyTypes.IUserService).to(UserService);

export default container;