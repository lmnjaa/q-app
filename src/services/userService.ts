
import { inject, injectable } from 'inversify';
import { IUserService } from './interface/IUserService';
import { IMysqlService } from './interface/IMysqlService';
import DependencyTypes from '../Common/DependencyTypes';
import userQueries from '../Constants/userQueries';
import { User } from '../Models/UserModel';
import * as bcrypt from 'bcrypt';

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

    async create(firstName: string, lastName: string, email: string, isAdmin: boolean, username: string, password: string): Promise<User> {
        const hashPassword = await bcrypt.hash(password, 10);
        const rows: any = await this._mysqlservice
            .execute<User>(userQueries.create, [firstName, lastName, email, isAdmin, username, hashPassword]);

        if (rows.length <= 0) return;

        return rows;
    }

    async update(id: string, firstName: string, lastName: string, email: string, isAdmin: boolean, username: string): Promise<User> {
        const rows: any = await this._mysqlservice
            .execute<User>(userQueries.update, [firstName, lastName, email, isAdmin, username, id]);

        if (rows.length <= 0) return;

        return rows;
    }

    async delete(id: number): Promise<any> {
        if (!id) return;

        const rows: any = await this._mysqlservice.execute<any>(userQueries.delete, [id]);

        if (rows.length <= 0) return;
        return rows;
    }

    async deactive(id: number): Promise<any> {
        if (!id) return;

        const rows: any = await this._mysqlservice.execute<any>(userQueries.deactivateUser, [id]);

        if (rows.length <= 0) return;
        return rows;
    }

}