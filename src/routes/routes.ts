import container from '../InversionOfControl/DiContainer';
import DependencyTypes from '../Common/DependencyTypes';
import { UserController } from '../Controllers/UserController';
import { AuthController } from '../Controllers/AuthController';
import { isAdmin } from '../Middlewares/IsAuth';
import { BookController } from '../Controllers/BookController';

export default (app) => {
    // Controllers
    const userController: UserController = container.get(DependencyTypes.UserController);
    const authController: AuthController = container.get(DependencyTypes.AuthController);
    const bookController: BookController = container.get(DependencyTypes.BookController);
    // Endpoints
    // Users
    app.get('/api/users', userController.getUsers);
    app.get('/api/user/:id', userController.getUser);
    app.post('/api/user/update', isAdmin, userController.updateUser);
    app.post('/api/user/create', isAdmin, userController.createUser);
    app.post('/api/user/delete/:id', isAdmin, userController.deleteUser);
    app.post('/api/user/deactivate/:id', userController.deactivateUser);

    // Books
    app.get('/api/books', bookController.getBooks);
    app.get('/api/book/:id', bookController.getBook);
    app.post('/api/book/create', bookController.createBook);
    app.post('/api/book/update', bookController.updateBook);
    app.post('/api/book/delete/:id', bookController.deleteBook);

    // Authorization
    app.post('/api/login', authController.login);
    app.post('/api/logout', authController.logout);
}