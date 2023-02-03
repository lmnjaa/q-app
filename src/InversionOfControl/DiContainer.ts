import { Container } from 'inversify';
import DependencyTypes from '../Common/DependencyTypes';
import { UserController } from '../Controllers/UserController';
import { IUserService } from '../Services/interface/IUserService';
import { UserService } from '../Services/UserService';

const container = new Container();

// Controllers
container.bind<UserController>(DependencyTypes.UserController).to(UserController);

// Services
container.bind<IUserService>(DependencyTypes.IUserService).to(UserService);

export default container;