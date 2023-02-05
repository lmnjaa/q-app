import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { AuthService } from "../Services/AuthService";
import { IAuthService } from "../Services/interface/IAuthService";
import { validateUserEntity } from "../Utils/RequestValidation";
import { ResponseEntity } from "../Utils/ResponseEntity";
import { RES_TYPE } from "../Utils/ServiceResponse";
import DependencyTypes from "../Common/DependencyTypes";
import * as Constants from '../Constants/Constats';
import * as jwt from 'jsonwebtoken';

@injectable()
export class AuthController {

    private readonly _authService: IAuthService;

    constructor(
        @inject(DependencyTypes.IAuthService) authService: AuthService
    ) {
        this._authService = authService;
    }

    public login = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        if (!validateUserEntity(username, password)) return;

        try {
            const data = await this._authService.login(username, password);

            if (data.responseType === RES_TYPE.SUCCESS) {
                res.cookie(Constants.JwtCookie, data.responseData);
                return res.send(new ResponseEntity([], Constants.SuccessfullLogin, 200));
            }

            return res.send(new ResponseEntity(data.responseData, data.responseMessage, 403));
        } catch (error) {
            return res.send(new ResponseEntity([], error.message, 500));
        }
    };

    public logout = async (req: Request, res: Response) => {
        return res.clearCookie(Constants.JwtCookie).send(new ResponseEntity([], Constants.SuccessfulLogout, 200));
    }

    public isAuth = async (req: Request, res: Response, next: NextFunction) => {
        const { JWT_SECRET_KEY } = process.env;
        const token = req.cookies.access_token;

        if (!token) return res.send(new ResponseEntity([], Constants.NotAuthorized, 403));

        try {
            const data = jwt.verify(token, JWT_SECRET_KEY);

            req.body.userId = data['id'];
            req.body.userRole = data['role'];

            return next();
        } catch {
            return res.send(new ResponseEntity([], Constants.ServerError, 500));
        }
    }
}