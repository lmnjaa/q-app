import { Book } from "../../Models/BookModel";

export interface IBookService {
    getAll(): Promise<Book[]>;
    getById(id: number): Promise<Book | undefined>;
    create(title: string, publisher: string, User_id: number): Promise<Book>;
    update(id: string, title: string, publisher: string, User_id: number): Promise<Book>;
    delete(id: number): Promise<any>;
}