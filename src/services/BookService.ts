import { inject, injectable } from 'inversify';
import { IMysqlService } from './interface/IMysqlService';
import DependencyTypes from '../Common/DependencyTypes';
import { IBookService } from './interface/IBookService';
import { Book } from '../Models/BookModel';
import BookQueries from '../Constants/BookQueries';

@injectable()
export class BookService implements IBookService {

    private readonly _mysqlservice: IMysqlService;

    constructor(
        @inject(DependencyTypes.IMysqlService) mysqlService: IMysqlService,
    ) {
        this._mysqlservice = mysqlService;
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

    async create(title: string, publisher: string, User_id: number): Promise<Book> {
        const rows: any = await this._mysqlservice
            .execute<Book>(BookQueries.create, [title, publisher, User_id]);

        if (rows.length <= 0) return;

        return rows;
    }

    async update(id: string, title: string, publisher: string, User_id: number): Promise<Book> {
        const rows: any = await this._mysqlservice
            .execute<Book>(BookQueries.update, [title, publisher, User_id, id]);

        if (rows.length <= 0) return;

        return rows;
    }

    async delete(id: number): Promise<any> {
        if (!id) return;

        const rows: any = await this._mysqlservice.execute<any>(BookQueries.delete, [id]);

        if (rows.length <= 0) return;
        return rows;
    }
}