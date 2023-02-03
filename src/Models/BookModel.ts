import { BaseModel } from "./BaseModel";

export class Book implements BaseModel {
    id: number;
    title: string;
    publisher: string;
    userId: number;

    constructor(id: number, title:string, publisher: string, userId: number){
        this.id = id;
        this.title = title;
        this.publisher = publisher;
        this.userId = userId;
    }
}