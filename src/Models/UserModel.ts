import { BaseModel } from "./BaseModel";

export class User implements BaseModel{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    username: string;
    password: string;
    active: boolean;

    constructor(id: number, firstName: string, lastName: string, email: string, isAdmin: boolean, username: string, password: string, active: boolean){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.isAdmin = isAdmin;
        this.username = username;
        this.password = password;
        this.active = active;
    }
}