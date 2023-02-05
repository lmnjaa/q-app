import { User } from "../../Models/UserModel";

export interface IUserService {
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User | undefined>;
    create(firstName: string, lastName: string, email: string, isAdmin: boolean, username: string, password: string): Promise<User>;
    update(id: string, firstName: string, lastName: string, email: string, isAdmin: boolean, username: string, password: string): Promise<User>;
    delete(id: number): Promise<any>;
    deactive(id: number): Promise<any>;
}