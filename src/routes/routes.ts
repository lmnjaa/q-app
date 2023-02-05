import container from '../InversionOfControl/DiContainer';
import DependencyTypes from '../Common/DependencyTypes';
import { UserController } from '../Controllers/UserController';
import { AuthController } from '../Controllers/AuthController';

export default(app) => {
    // Controllers
    const userController: UserController = container.get(DependencyTypes.UserController);
    const authController: AuthController = container.get(DependencyTypes.AuthController);

    // Endpoints
    // Users
    app.get('/api/users', userController.getUsers);
    app.get('/api/user/:id', userController.getUser);
    app.post('/api/user/update', userController.updateUser);
    app.post('/api/user/create', userController.createUser);
    app.post('/api/user/delete/:id', userController.deleteUser);
    app.post('/api/user/deactivate/:id', userController.deactivateUser);

    // Books

    // Authorization
    app.post('/api/login', authController.login);
    app.post('/api/logout', authController.logout);
}