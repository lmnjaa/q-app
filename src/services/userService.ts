import { inject, injectable } from 'inversify';
import { IUserService } from './Interface/IUserService';
import { IMysqlService } from './Interface/IMysqlService';
import DependencyTypes from '../Common/DependencyTypes';
import userQueries from '../Constants/UserQueries';
import { User } from '../Models/UserModel';
import * as bcrypt from 'bcrypt';
import { RES_TYPE, ServiceResponse } from '../Utils/ServiceResponse';
import { JwtChecker } from '../Utils/RequestValidation';
import { JwtDecodeClass } from '../Utils/JwtDecodeClass';

@injectable()
export class UserService implements IUserService {

    private readonly _mysqlservice: IMysqlService;

    constructor(
        @inject(DependencyTypes.IMysqlService) mysqlService: IMysqlService,
    ) {
        this._mysqlservice = mysqlService;
    }

    async getAll(): Promise<User[]> {
        const rows: any = await this._mysqlservice.execute<User[]>(userQueries.findAll, []);

        if (rows.length <= 0) return [];

        return rows;
    }

    async getById(id: number): Promise<User> {
        if (!id) return;

        const rows: any = await this._mysqlservice.execute<User>(userQueries.findById, [id]);
        if (rows.length <= 0) return undefined;
        return rows;
    }

    async create(firstName: string, lastName: string, email: string, isAdmin: boolean, username: string, password: string): Promise<ServiceResponse> {
        const user: any = await this._mysqlservice.execute<any>(userQueries.findByUsername, [username]);
        if (user) return new ServiceResponse(RES_TYPE.ERROR, "There is user by that username", [], 409);

        const hashPassword = await bcrypt.hash(password, 10);
        const rows: any = await this._mysqlservice
            .execute<User>(userQueries.create, [firstName, lastName, email, isAdmin, username, hashPassword]);

        if (rows.length <= 0) return new ServiceResponse(RES_TYPE.ERROR, "There is something wrong inserting new user into db", [], 500);

        return new ServiceResponse(RES_TYPE.SUCCESS, "Successfully created new user", rows, 200);
    }

    async update(id: string, firstName: string, lastName: string, email: string, isAdmin: boolean, username: string): Promise<ServiceResponse> {
        const rows: any = await this._mysqlservice
            .execute<User>(userQueries.update, [firstName, lastName, email, isAdmin, username, id]);

        if (rows.length <= 0) return new ServiceResponse(RES_TYPE.ERROR, "There is something wrong updating db", [], 500);

        return new ServiceResponse(RES_TYPE.SUCCESS, "Successfully updated user", rows, 200);
    }

    async delete(id: number): Promise<ServiceResponse> {
        const user = await this.getById(id);
        if (user.isAdmin && user.active) return new ServiceResponse(RES_TYPE.ERROR, "You can not delete active admin", [], 500);

        const rows: any = await this._mysqlservice.execute<any>(userQueries.delete, [id]);

        if (rows.length <= 0) return new ServiceResponse(RES_TYPE.ERROR, "There is something wrong deleting from db", [], 500);
        return new ServiceResponse(RES_TYPE.SUCCESS, "Successfully deleted user", rows, 200);
    }

    async deactive(token: JwtDecodeClass, id: number, User_id: number): Promise<ServiceResponse> {
        if (JwtChecker(token, User_id)) return new ServiceResponse(RES_TYPE.ERROR, "Unauthorized", [], 401);
        const rows: any = await this._mysqlservice.execute<any>(userQueries.deactivateUser, [id]);

        if (rows.length <= 0) return new ServiceResponse(RES_TYPE.ERROR, "There is something wrong deleting from db", [], 500);
        return new ServiceResponse(RES_TYPE.SUCCESS, "Successfully deleted user", rows, 200);
    }

}