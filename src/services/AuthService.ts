import { inject, injectable } from "inversify";
import DependencyTypes from "../Common/DependencyTypes";
import userQueries from "../Constants/userQueries";
import { User } from "../Models/UserModel";
import { validateUserEntity } from "../Utils/RequestValidation";
import { IAuthService } from "./interface/IAuthService";
import { IMysqlService } from "./interface/IMysqlService";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as ResponseMessage from '../Constants/Constats';
import { RES_TYPE, ServiceResponse } from "../Utils/ServiceResponse";

@injectable()
export class AuthService implements IAuthService {
    private readonly _mysqlservice: IMysqlService;

    constructor(
        @inject(DependencyTypes.IMysqlService) mysqlService: IMysqlService,
    ) {
        this._mysqlservice = mysqlService;
    }
    async login(username: string, password: string): Promise<ServiceResponse> {
        if (!validateUserEntity(username, password)) return;

        const { JWT_SECRET_KEY } = process.env;
        const rows: any = await this._mysqlservice.execute<User>(userQueries.findByUsername, [username]);

        if (await bcrypt.compare(password, rows.password)) {
            const token = jwt.sign({ _id: rows.id?.toString(), name: rows.name, role: rows.role }, JWT_SECRET_KEY, {
                expiresIn: '2h',
            });

            return new ServiceResponse(RES_TYPE.SUCCESS, ResponseMessage.Successfull, token);
        }

        return new ServiceResponse(RES_TYPE.ERROR, ResponseMessage.InvalidPassword, '');
    }
}