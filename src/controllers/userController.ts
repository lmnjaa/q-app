import { UserService } from "../Services/UserService";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import DependencyTypes from "../Common/DependencyTypes";
import { IUserService } from "../Services/interface/IUserService";
import { ResponseEntity } from "../Utils/ResponseEntity";
import * as ResponseMessage from '../Constants/constats';

@injectable()
export class UserController {
    private readonly _userService: IUserService;
    constructor(
        @inject(DependencyTypes.IUserService) userService: IUserService
    ) {
        this._userService = userService;
    }

    public getUsers = async (req: Request, res: Response) => {
        try {
            const data = await this._userService.getAll();

            if(data) return res.send(new ResponseEntity(data, ResponseMessage.Successful, 200));
            
            return res.send(new ResponseEntity(data, ResponseMessage.EmptyData, 404));
        } catch (error) {
            return res.send(new ResponseEntity([], error.message, 500));
        }
    };

    public getUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const data = await this._userService.getById(parseInt(id));
            if(data) return res.send(new ResponseEntity(data, ResponseMessage.Successful, 200));
            
            return res.send(new ResponseEntity(data, ResponseMessage.EmptyData, 404));
        } catch (error) {
            return res.send(new ResponseEntity([], error.message, 500));
        }
    };

    public createUser = async (req: Request, res: Response) => {
        try {
            const data = await this._userService.create(req.body);
            if(data) return res.send(new ResponseEntity(data, ResponseMessage.Successful, 200));
            
            return res.send(new ResponseEntity(data, ResponseMessage.EmptyData, 404));
        } catch (error) {
            return res.send(new ResponseEntity([], error.message, 500));
        }
    };

    public updateUser = async (req: Request, res: Response) => {
        try {
            const data = await this._userService.update(req.body);
            if(data) return res.send(new ResponseEntity(data, ResponseMessage.Successful, 200));
            
            return res.send(new ResponseEntity(data, ResponseMessage.EmptyData, 404));
        } catch (error) {
            return res.send(new ResponseEntity([], error.message, 500));
        }
    };

    public deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const data = await this._userService.delete(parseInt(id));
            if(data > 1) return res.send(new ResponseEntity(data, ResponseMessage.Successful, 200));
            
            return res.send(new ResponseEntity(data, ResponseMessage.NoDataByThatId, 404));
            
        } catch (error) {
            return res.send(new ResponseEntity([], error.message, 500));
        }
    };
}