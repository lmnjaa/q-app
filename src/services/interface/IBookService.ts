import { Book } from "../../Models/BookModel";
import { JwtDecodeClass } from "../../Utils/JwtDecodeClass";
import { ServiceResponse } from "../../Utils/ServiceResponse";

export interface IBookService {
    getAll(): Promise<Book[]>;
    getById(id: number): Promise<Book | undefined>;
    create(token: JwtDecodeClass, title: string, publisher: string, User_id: number): Promise<ServiceResponse>;
    update(token: JwtDecodeClass, id: string, title: string, publisher: string, User_id: number): Promise<ServiceResponse>;
    delete(token: JwtDecodeClass, id: number, User_id: number): Promise<ServiceResponse>;
}