import { BaseModel } from "./BaseModel";
import { Book } from "./BookModel";

export class User implements BaseModel{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    books: Book[];

    constructor(id: number, firstName: string, lastName: string, email: string, role: string, books: Book[]){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.books = books;
    }
}