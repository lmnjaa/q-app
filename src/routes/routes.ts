import container from '../InversionOfControl/DiContainer';
import DependencyTypes from '../Common/DependencyTypes';
import { UserController } from '../Controllers/UserController';

export default(app) => {
    // Controllers
    const userController: UserController = container.get(DependencyTypes.UserController);

    // Endpoints
    app.get('/api/users', userController.getUsers);
    app.get('/api/user/:id', userController.getUser);
    app.post('/api/user/update', userController.updateUser);
    app.post('/api/user/create', userController.createUser);
    app.post('/api/user/delete/:id', userController.deleteUser);
}