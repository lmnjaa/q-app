import { inject, injectable } from 'inversify';
import { IMysqlService } from './Interface/IMysqlService';
import DependencyTypes from '../Common/DependencyTypes';
import { IBookService } from './Interface/IBookService';
import { Book } from '../Models/BookModel';
import BookQueries from '../Constants/BookQueries';
import { JwtDecodeClass } from '../Utils/JwtDecodeClass';
import { IUserService } from './Interface/IUserService';
import { RES_TYPE, ServiceResponse } from '../Utils/ServiceResponse';
import { JwtChecker } from '../Utils/RequestValidation';

@injectable()
export class BookService implements IBookService {

    private readonly _mysqlservice: IMysqlService;
    private readonly _userService: IUserService;

    constructor(
        @inject(DependencyTypes.IMysqlService) mysqlService: IMysqlService,
        @inject(DependencyTypes.IUserService) userService: IUserService
    ) {
        this._mysqlservice = mysqlService;
        this._userService = userService;
    }

    async getAll(): Promise<Book[]> {
        const rows: any = await this._mysqlservice.execute<Book[]>(BookQueries.findAll, []);

        if (rows.length <= 0) return [];

        return rows;
    }

    async getById(id: number): Promise<Book> {
        if (!id) return;

        const rows: any = await this._mysqlservice.execute<Book>(BookQueries.findById, [id]);
        if (rows.length <= 0) return undefined;
        return rows;
    }

    async create(token: JwtDecodeClass, title: string, publisher: string, User_id: number): Promise<ServiceResponse> {
        if (JwtChecker(token, User_id)) return new ServiceResponse(RES_TYPE.ERROR, "You can not add to another author book", [], 401);

        const user: any = await this._userService.getById(User_id);
        if (user == undefined) return new ServiceResponse(RES_TYPE.ERROR, `There is no user by that id.`, [], 404);

        const rows: any = await this._mysqlservice
            .execute<Book>(BookQueries.create, [title, publisher, User_id]);

        if (rows.length <= 0) return new ServiceResponse(RES_TYPE.ERROR, "Something went wront with db. Please try again later", [],  500);

        return new ServiceResponse(RES_TYPE.SUCCESS, "Successfully created book", rows, 200);
    }

    async update(token: JwtDecodeClass, id: string, title: string, publisher: string, User_id: number): Promise<ServiceResponse> {
        if (JwtChecker(token, User_id)) return new ServiceResponse(RES_TYPE.ERROR, "Unauthorized.", [], 401);

        const rows: any = await this._mysqlservice
            .execute<Book>(BookQueries.update, [title, publisher, User_id, id]);

        if (rows.length <= 0) return new ServiceResponse(RES_TYPE.ERROR, "Something went wront with db. Please try again later", [], 500);

        return new ServiceResponse(RES_TYPE.SUCCESS, "Successfully created book", rows, 200);
    }

    async delete(token: JwtDecodeClass, id: number, User_id: number): Promise<ServiceResponse> {
        if (!id) return;
        if (JwtChecker(token, User_id)) return new ServiceResponse(RES_TYPE.ERROR, "Unauthorized", [], 401);

        const rows: any = await this._mysqlservice.execute<any>(BookQueries.delete, [id]);

        if (rows.length <= 0) return new ServiceResponse(RES_TYPE.ERROR, "Something went wront with db. Please try again later", [], 500);
        return new ServiceResponse(RES_TYPE.SUCCESS, "Successfully created book", rows, 200);
    }
}