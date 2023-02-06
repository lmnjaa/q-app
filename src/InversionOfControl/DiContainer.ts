import DependencyTypes from '../Common/DependencyTypes';
import MysqlService from '../Services/MysqlService';
import { Container } from 'inversify';
import { AuthController } from '../Controllers/AuthController';
import { BookController } from '../Controllers/BookController';
import { UserController } from '../Controllers/UserController';
import { AuthService } from '../Services/AuthService';
import { BookService } from '../Services/BookService';
import { IAuthService } from '../Services/Interface/IAuthService';
import { IBookService } from '../Services/Interface/IBookService';
import { IMysqlService } from '../Services/Interface/IMysqlService';
import { IUserService } from '../Services/Interface/IUserService';
import { UserService } from '../Services/UserService';

const container = new Container();

// Controllers
container.bind<UserController>(DependencyTypes.UserController).to(UserController);
container.bind<AuthController>(DependencyTypes.AuthController).to(AuthController);
container.bind<BookController>(DependencyTypes.BookController).to(BookController);

// Services
container.bind<IAuthService>(DependencyTypes.IAuthService).to(AuthService);
container.bind<IMysqlService>(DependencyTypes.IMysqlService).to(MysqlService);
container.bind<IUserService>(DependencyTypes.IUserService).to(UserService);
container.bind<IBookService>(DependencyTypes.IBookService).to(BookService);

export default container;