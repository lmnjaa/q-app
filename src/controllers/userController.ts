import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userService";
import { ResponseEntity } from "../utils/responseEntity";
import * as ResponseMessages from '../constants/constats';

export class UserController {
    static async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await UserService.getAllUsers();
            if(data) return new ResponseEntity(data, ResponseMessages.Successful, 200);

            return new ResponseEntity(data, ResponseMessages.EmptyData, 404);
        } catch (error) {
            return new ResponseEntity(error, ResponseMessages.ServerError, 500);
        }
    }

    static async getUser(req: Request, res: Response, next: NextFunction) {
        let id: any = req.params.id;

        try {
            const data = await UserService.getUser(id);
            if(data) return new ResponseEntity(data, ResponseMessages.Successful, 200);

            return new ResponseEntity(data, ResponseMessages.EmptyData, 404);
        } catch (error) {
            return new ResponseEntity(error, ResponseMessages.ServerError, 500);
        }
    }
}