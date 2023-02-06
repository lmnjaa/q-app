import { ServiceResponse } from "../../Utils/ServiceResponse";

export interface IAuthService {
    login(username: string, password: string): Promise<ServiceResponse>;
}