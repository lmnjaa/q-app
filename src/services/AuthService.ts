import { inject, injectable } from "inversify";
import DependencyTypes from "../Common/DependencyTypes";
import userQueries from "../Constants/UserQueries";
import { User } from "../Models/UserModel";
import { IAuthService } from "./Interface/IAuthService";
import { IMysqlService } from "./Interface/IMysqlService";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as ResponseMessage from '../Constants/Constants';
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
        const { JWT_SECRET_KEY } = process.env;
        const rows: any = await this._mysqlservice.execute<User>(userQueries.findByUsername, [username]);

        if (await bcrypt.compare(password, rows[0].password)) {
            const token = jwt.sign({ id: rows[0].id?.toString(), username: rows[0].username, role: rows[0].isAdmin }, JWT_SECRET_KEY, {
                expiresIn: '2h',
            });

            return new ServiceResponse(RES_TYPE.SUCCESS, ResponseMessage.Successfull, token, 200);
        }

        return new ServiceResponse(RES_TYPE.ERROR, ResponseMessage.InvalidPassword, [], 401);
    }
}