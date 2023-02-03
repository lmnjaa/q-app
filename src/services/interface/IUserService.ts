import { User } from "../../Models/UserModel";


export interface IUserService {
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User | undefined>;
    create(entity: User): Promise<User>;
    update(entity: User): Promise<User>;
    delete(id: number): Promise<any>;
}