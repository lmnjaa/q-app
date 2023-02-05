import { BaseModel } from "./BaseModel";

export class User implements BaseModel{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: boolean;
    username: string;
    password: string;

    constructor(id: number, firstName: string, lastName: string, email: string, role: boolean, username: string, password: string){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.username = username;
        this.password = password;
    }
}