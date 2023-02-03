
import { inject, injectable } from 'inversify';
import { IUserService } from './interface/IUserService';
import { IMysqlService } from './interface/IMysqlService';
import DependencyTypes from '../Common/DependencyTypes';
import userQueries from '../Constants/userQueries';
import { User } from '../Models/UserModel';

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

        if(rows.length <= 0) return [];

        return rows;
    }

    async getById(id: number): Promise<User> {
        if(!id) return;

        const rows: any = await this._mysqlservice.execute<User>(userQueries.findById, [id]);
        if(rows.length <= 0) return undefined;
        return rows;
    }

    async create(entity: User): Promise<User> {
        if(!entity) return;

        const rows: any = await this._mysqlservice.execute<User>(userQueries.create, [entity.firstName, entity.lastName, entity.email, entity.role]);

        if(rows.length <= 0) return;

        return rows;
    }

    async update(entity: User): Promise<User> {
        throw new Error('Method not implemented.');
    }

    async delete(id: number): Promise<any> {
        if(!id) return;

        const rows: any = await this._mysqlservice.execute<any>(userQueries.delete, [id]);

        if(rows.length <= 0) return;
        return rows;
    }
   
}