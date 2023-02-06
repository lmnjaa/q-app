import { User } from "../../Models/UserModel";
import { JwtDecodeClass } from "../../Utils/JwtDecodeClass";
import { ServiceResponse } from "../../Utils/ServiceResponse";

export interface IUserService {
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User | undefined>;
    create(firstName: string, lastName: string, email: string, isAdmin: boolean, username: string, password: string): Promise<ServiceResponse>;
    update(id: string, firstName: string, lastName: string, email: string, isAdmin: boolean, username: string, password: string): Promise<ServiceResponse>;
    delete(id: number): Promise<ServiceResponse>;
    deactive(token: JwtDecodeClass, id: number, User_id: number): Promise<ServiceResponse>;
}